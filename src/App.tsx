import React, { FC } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './styles/style.scss';
import { Menu } from './components/nav/Menu';
import { Routes } from './components/nav/Routes';



const App: FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
