import React, { FC, useEffect } from 'react';
import BSQUAD from './bombsquad_js';
import './bombsquad.css';

export const Bombsquad: FC = () => {

  useEffect(() => {
    BSQUAD.init('bsquad');
    return () => BSQUAD.destroy();
  }, []);

  return <>
    <h2>Bombsquad</h2>
    <p>wrote this way back in the early days of dynamic html.  still the same game, still fun!</p>
    <div id='bsquad'/>
  </>;
}
