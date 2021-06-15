import React, { FC, useState } from 'react';
import { PrivateChat } from '../components/chat/PrivateChat';
import { PublicChat } from '../components/chat/PublicChat';
import { useSocket } from '../context/SocketContext';

export const Contact: FC = () => {
  const socket = useSocket();
  const [localClientId,setLocalClientId] = useState(socket.clientId);

  // no really they should go in reverse order

  return <div>
    <h2>Contact</h2>
    <p>So... I came up with a silly idea to create a bidirectional proxy to a discord server, using a traditional websocket-chat paired with a discord bot.  It mostly works.</p>
    <p>You are currently identified as {socket.clientId} ({localClientId})<br/>
    <input value={localClientId} onChange={e => setLocalClientId(e.target.value)}/><button onClick={() => socket.setClientId(localClientId)}>set</button>
    </p>
    <div style={{display:'flex'}}>
      <div style={{flexGrow:1,padding:'.5em'}}>
        <h3 style={{marginBottom:'.5em'}}>Private Chat</h3>
        <PrivateChat/>
      </div>
      <div style={{flexGrow:3,padding:'.5em'}}>
        <h3 style={{marginBottom:'.5em'}}>Public Chat</h3>
        <PublicChat/>
      </div>
    </div>
  </div>;
}
