import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './styles/style.scss';
import { toast, ToastContainer } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import { Menu } from './components/nav/Menu';
import { Routes } from './components/nav/Routes';
import 'react-toastify/dist/ReactToastify.css';
import './toastify.css';
import { toHTML } from 'discord-markdown';

import { OpenAPI } from './openapi';
import { makeRandString } from './util/random';

OpenAPI.BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // THIS SHOULD BE AN ENV VAR
const clientId = 'visitor' + makeRandString(5);
const wsBase = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:8000';
const WS_URL = `${wsBase}/ws/${clientId}`;

// belongs elsewhere
type SocketScope = 'public'|'private';
type SocketSource = 'server'|'client'|'bot';
type SocketMessage = {
  scope: SocketScope;
  source: SocketSource;
  type?: string;
  sender?: string;
  recipient?: string;
  message: string;
}


const App: FC = () => {
  const [msg, setMsg] = useState<string>('');
  const { sendMessage } = useWebSocket(WS_URL, {
    onOpen: () => toast('connected!', {type:'dark'}),
    onMessage: e => {
      const msg = JSON.parse(e.data) as SocketMessage;
      const p = toHTML(msg.message);
      toast(<><strong>{msg.sender}:</strong> <span dangerouslySetInnerHTML={{__html: p}}/></>, {type:'dark'});
    }
  });

  const sendMsg = () => {
    if(msg) {
      const msgObj: SocketMessage = {scope: 'public', source: 'client', sender: clientId, message: msg};
      console.log('sending', msgObj);
      sendMessage(JSON.stringify(msgObj));
      setMsg('');
    }
  }

  return (
    <BrowserRouter>
      <div className="main">
        <header>
          <h1><Link to={'/'}>bniehuser.com</Link></h1>
        </header>
        <section id={'body'}>
          <section id={'sidebar'}>
            <Menu/>
            <div>
              <input type={'text'} value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' ? sendMsg() : null}/>
              <button onClick={sendMsg}>send</button>
            </div>
          </section>
          <section id={'content'}>
            <Routes/>
          </section>
        </section>
      </div>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
