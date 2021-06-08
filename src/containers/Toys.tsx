import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Toys: FC = () => {
  return <div>
    <h2>Toys</h2>
    <p>A small collection of some javascript toys I've built over several years; from ancient experiments in dynamic HTML from the good old days up to modern procedural texture generation and WebGL experiments.</p>
    <p>Hmm, I thought I had more of these.  I'll have to do a deep dive through old hard drives and see if I can dig out more fun map builders, procedural generators, WebGL renderers and such.</p>
    <h3>Recent-ish</h3>
    <ul>
      <li><Link to={'/toys/wfc'}>Wave Function Collapse</Link> -- procedural texture generation using a simple small pixel sample set</li>
    </ul>
    <h3>Ancient history</h3>
    <ul>
      <li><Link to={'/toys/bombsquad'}>Bombsquad</Link> -- a minesweeper clone written circa 2003</li>
      <li><Link to={'/toys/boxes'}>Boxes</Link> -- an early javascript exploration of event-driven interface design</li>
      <li><Link to={'/toys/divide'}>Divide</Link> -- toying with CSS transitions back when those were new; no script or images whatsoever!  pure css animation.</li>
    </ul>
  </div>;
}
