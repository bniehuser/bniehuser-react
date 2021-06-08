import React, { FC, useEffect } from 'react';
import BOXES from './boxes_js';
import './boxes.css';

export const Boxes: FC = () => {
  useEffect(() => {
    BOXES.init('boxes');
    return () => BOXES.clear();
  }, []);

  return <>
    <h2>Boxes</h2>
    <p>
      To be honest, i don't even remember what this was for.<br/>
      I think it was supposed to be a map maker -- it imports an .svg that was supposed to use gradient transitions to move between programmatically generated terrain types.
      The control buttons are placeholders which switch the program mode and the console shows the user input it's intercepting.<br/>
      One day I'll look at it a little closer and see if there's anything worth salvaging, but i keep it here for posterity.
    </p>
    <div style={{display:'flex',position:'relative'}}><div id={'boxes'} style={{flexGrow: 100}}/></div>
  </>;
}
