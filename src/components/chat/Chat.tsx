import { toHTML } from 'discord-markdown';
import React, { FC, useState } from 'react';
import { SocketMessage, useSocket } from '../../context/SocketContext';

type Props = {
  msgs: SocketMessage[];
  onSend: (msg: string) => void
}

const ownerId = process.env.REACT_APP_DISCORD_OWNER;
const ownerName = process.env.REACT_APP_DISCORD_DISPLAY_AS;

export const Chat: FC<Props> = ({msgs, onSend}) => {
  const socket = useSocket();
  const [msg, setMsg] = useState<string>('');
  const send = () => { onSend(msg); setMsg(''); };

  return     <div>
    <div className={'chat-container'}>
      {msgs.map((m,i) => <div className={'chat-message'} id={'msg_'+i}>
        <div className={`chat-message-sender ${m.sender===socket.clientId?'author':''} ${m.sender===ownerId?'owner':''}`}>{m.sender==='SERVER'?'⠀':(m.sender===ownerId?ownerName:m.sender)+':'}</div>
        <div className={`chat-message-content ${m.sender==='SERVER'?'ghost':''}`} dangerouslySetInnerHTML={{__html: toHTML(m.message)}}/>
      </div>)}
    </div>
    <div className={'chat-entry'}>
      <input type={'text'} placeholder={'enter text...'} value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' ? send() : null}/>
      <button onClick={send}>send</button>
    </div>
  </div>;
}
