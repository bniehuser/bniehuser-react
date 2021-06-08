import React, { FC, useEffect } from 'react';
// import runIcosahedron, {init, animate} from './three_icosahedron';

export const Icosahedron: FC = () => {

  useEffect(() => {
    // runIcosahedron();
  }, []);

  return <>
    <h2>Icosahedron</h2>
    <p>toying with icosahedron tiling of a sphere</p>

    <div style={{position:'relative'}}>

    <div id="container" style={{zIndex:1}}>
    </div>

    <div style={{position:'absolute',right:'0px',top:'0px',padding:'15px',zIndex:2}}>
      <input type="text" name="numHexes" id="numHexes" value="7" style={{width:'30px'}}/>
      {/*<button onClick={() => { init();animate();}}>resize</button>*/}
    </div>

    </div>
  </>;
}
