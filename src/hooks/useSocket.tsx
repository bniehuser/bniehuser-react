import { toHTML } from 'discord-markdown';
import React, { useCallback, useEffect, useState } from 'react';
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

export const useSocket = (onMessage?: (m: SocketMessage) => void) => {
  const [clientId, setClientId] = useState<string>(defaultClientId);
  const [socketUrl, setSocketUrl] = useState<string>(WS_URL);
  const [msgs, setMsgs] = useState<SocketMessage[]>([]);

  useEffect(() => {
    console.log('setting socket id?', clientId);
    setSocketUrl(`${wsBase}/ws/${clientId}`);
  }, [clientId])
  const loc = useLocation();

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
      if(onMessage !== undefined) {
        onMessage(msg);
      }
    },
    share: true,
  });

  const getClientId = () => clientId;

  const sendMsg = useCallback((msg: string) => {
    const client = getClientId();
    console.log('see socket id as: ', client)
    if(msg) {
      const msgObj: SocketMessage = {scope: 'public', source: 'client', sender: client, message: msg};
      console.log('sending', msgObj);
      sendMessage(JSON.stringify(msgObj));
    }
  }, [clientId, sendMessage]);

  return {
    clientId,
    sendMsg,
    setClientId,
    msgs,
  }

}
