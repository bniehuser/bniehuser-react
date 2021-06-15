import React, { FC } from 'react';
import { useSocket } from '../../context/SocketContext';
import { Chat } from './Chat';

export const PublicChat: FC = () => {
  const socket = useSocket()
  return <Chat
    msgs={[...socket.msgs.filter(m => m.recipient !== socket.clientId && !((m.scope as any).__enum__ === 'SocketScope.PRIVATE'))].reverse()}
    onSend={msg => socket.sendMsg(msg)}
  />;
}
