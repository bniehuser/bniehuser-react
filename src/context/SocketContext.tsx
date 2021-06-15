import { toHTML } from 'discord-markdown';
import React, { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import { makeRandString } from '../util/random';

const defaultClientId = 'visitor' + makeRandString(5);
const wsBase = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:8000';
const WS_URL = `${wsBase}/ws/${defaultClientId}`;

// belongs elsewhere
export type SocketScope = 'public'|'private';
export type SocketSource = 'server'|'client'|'bot';
export type SocketMessage = {
  scope: SocketScope;
  source: SocketSource;
  type?: string;
  sender?: string;
  recipient?: string;
  message: string;
}

type Props = { children: React.ReactNode };

export type SocketHandler = {
  clientId: string;
  setClientId: (clientId: string) => void;
  sendMsg: (msg: string, priv?: boolean) => void;
  sendMsgObj: (msgObj: SocketMessage) => void;
  addMessageHandler: (handler: (msgObj: SocketMessage) => void) => void;
  removeMessageHandler: (handler: (msgObj: SocketMessage) => void) => void;
  msgs: SocketMessage[];
}

export const SocketContext = React.createContext<SocketHandler>({} as SocketHandler);

export const useSocket = (): SocketHandler => {
  const socket = React.useContext(SocketContext);
  if (socket === undefined) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return socket;
}

export const SocketProvider: FC<Props> = ({children}) => {


  const [clientId, setClientId] = useState<string>(defaultClientId);
  const [socketUrl, setSocketUrl] = useState<string>(WS_URL);
  const [handlers, setHandlers] = useState<Array<(m: SocketMessage)=>void>>([]);
  const [msgs, setMsgs] = useState<SocketMessage[]>([]);
  const loc = useLocation();

  const addMessageHandler = (h: (s: SocketMessage) => void) => setHandlers([...handlers, h]);
  const removeMessageHandler = (h: (s: SocketMessage) => void) => setHandlers(handlers.filter(t => t !== h));

  useEffect(() => setSocketUrl(`${wsBase}/ws/${clientId}`), [clientId])

  const { sendMessage } = useWebSocket(socketUrl, {
    onOpen: () => toast('connected!', {type:'dark'}),
    onMessage: e => {
      const msg = JSON.parse(e.data) as SocketMessage;
      msgs.push(msg);
      setMsgs(msgs);
      if (loc.pathname.indexOf('contact') === -1) {
        const p = toHTML(msg.message);
        toast(<><strong>{msg.sender}:</strong> <span dangerouslySetInnerHTML={{__html: p}}/></>, {type: 'dark'});
      }
      handlers.forEach(h => h(msg));
    },
    share: true,
  });

  const sendMsg = (msg: string, priv: boolean = false) => {
    if(msg) {
      const msgObj: SocketMessage = {scope: priv ? 'private' : 'public', source: 'client', sender: clientId, message: msg};
      sendMsgObj(msgObj);
    }
  };

  const sendMsgObj = (msgObj: SocketMessage) => {
    sendMessage(JSON.stringify(msgObj));
  };

  return <SocketContext.Provider value={{
    clientId,
    setClientId,
    sendMsg,
    sendMsgObj,
    addMessageHandler,
    removeMessageHandler,
    msgs,
  }}>{children}</SocketContext.Provider>;
}
