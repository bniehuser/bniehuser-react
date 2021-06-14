import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Interface: FC = () => {
  return <div>
    <h2>Interface Experiment</h2>
    <p>
      This is an experiment I'm working on for advanced dashboard and windowing interface using React.  It was inspired by a game I play and I wanted to see if I could emulate the UI and add some enhancements of my own.<br/>
      It utilizes some of the API data from the <Link to={'/apis'}>APIs</Link> section of the site for panel contents, and allows you to arrange a persistent dashboard as well as launch one-off subwindows within the interface.<br/>
      Give it a shot!
    </p>
    <Link to={'/interface/dashboard'}>Dashboard Experiment</Link>
  </div>;
}
