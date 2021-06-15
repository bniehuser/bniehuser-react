import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/style.scss';
import { ToastContainer } from 'react-toastify';
import { Menu } from './components/nav/Menu';
import { Routes } from './components/nav/Routes';
import 'react-toastify/dist/ReactToastify.css';
import './toastify.css';
import { SocketProvider, useSocket } from './context/SocketContext';
import { OpenAPI } from './openapi';

OpenAPI.BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000'; // THIS SHOULD BE AN ENV VAR

const App: FC = () => {

  const socket = useSocket();

  return (
    <SocketProvider>
      <div className="main">
        <header>
          <h1><Link to={'/'}>bniehuser.com</Link></h1>
        </header>
        <section id={'body'}>
          <section id={'sidebar'}>
            <Menu/>
          </section>
          <section id={'content'}>
            <Routes/>
          </section>
        </section>
      </div>
      <ToastContainer/>
      </SocketProvider>
  );
}

export default App;
