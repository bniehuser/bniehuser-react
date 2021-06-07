import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Toys: FC = () => {
  return <div>
    <h2>Toys</h2>
    <p>A collection of some javascript toys I've built over several years; from ancient experiments in dynamic HTML from the good old days up to modern procedural texture generation and WebGL experiments.</p>
    <ul>
      <li><Link to={'./life'}>Conway's Game of Life</Link> -- tried and true classic, written in a time long ago</li>
      <li><Link to={'./bombsquad'}>Bombsquad</Link> -- a minesweeper clone written circa 2003</li>
      <li><Link to={'./wfc'}>Wave Function Collapse</Link> -- procedural texture generation using a simple small pixel sample set</li>
      <li><Link to={'./tilemap'}>Tilemap</Link> -- a WebGL shader based tilemap implementation allowing for complex large map sizes with performant visualization</li>
    </ul>
  </div>;
}
