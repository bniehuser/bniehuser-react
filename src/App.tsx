import React, { useState } from 'react';
import { BrowserRouter, Link, NavLink, Route } from 'react-router-dom';
import Highlight from 'react-highlight';
import './styles/style.scss';

const fib: (n: number, l?: number[]) => number = (n, l=[0,1]) => l[n] !== undefined ? l[n] : (l[n] = fib(n-1, l) + fib(n-2, l));


function App() {
  const [fibVal, setFib] = useState(0);
  return (
    <BrowserRouter>
    <div className="main">
      <header>
        <h1><Link to={'/'}>bniehuser.com</Link></h1>
      </header>
      <section id={'body'}>
        <section id={'sidebar'}>
          <nav>
            <h3>Sections</h3>
            <ul>
              <li><NavLink activeClassName={'active'} to={'/about'}>about me</NavLink></li>
              <li><NavLink activeClassName={'active'} to={'/apis'}>apis</NavLink></li>
              <li><NavLink activeClassName={'active'} to={'/interface'}>interface</NavLink></li>
              <li><NavLink activeClassName={'active'} to={'/toys'}>toys</NavLink></li>
              <li><NavLink activeClassName={'active'} to={'/links'}>links</NavLink></li>
              <li><NavLink activeClassName={'active'} to={'/contact'}>contact</NavLink></li>
            </ul>
          </nav>
        </section>
        <section id={'content'}>
          <Route exact={true} path={'/'}>
          <h2>Hey there, welcome to my site.</h2>
          <p>This is the bniehuser.com site.  pretty boring.</p>
          <p>oh, here's a memoized one liner typescript fibonacci sequence number finder.  it only works up to index 1476, after that ecmascript considers it 'Infinity'.  input is clamped to avoid call stack overflow.</p>
          <Highlight className={'typescript'}>
            {`const fib: (n:number, l?:number[]) => number = (n, l=[0,1]) => l[n] !== undefined ? l[n] : (l[n] = fib(n-1, l) + fib(n-2, l));`}
          </Highlight>
          <input type={'number'} step={1} size={2} min={0} max={1476} onChange={e => setFib(fib(Math.min(1477, parseInt(e.target.value, 10) || 0)))}/> =&gt; {fibVal}
          <p>
            I heard somewhere that this is the kind of thing that makes you look like a cool programmer who knows what they're doing.<br/>
            Memoized recursion is one of those performance boosts they teach in CS courses these days.<br/>
            I wanted to make it a one-liner using some syntactic tricks of ES6, which I did, but I'd never implement the technique in this form in production because it's too arcane to be instantly legible.<br/>
            Of course, I spent about four times as much time figuring out why my code wasn't working as I did actually writing it, mainly because for some
            reason <a href={'https://www.google.com/search?q=87th+number+in+fibonacci+sequence'} target={'_blank'}>a google search for the 87th fibonacci sequence number</a> (the number I randomly happened to be testing) inexplicably leads
            to <a href={'https://www.thelearningpoint.net/home/mathematics/fibonacci-numbers/fibonacci-numbers-87th'} target={'_blank'}>a page displaying the wrong answer</a>.
          </p>
          <p>Well, c'est la vie, I suppose.</p>
          </Route>
          <Route path={'/about'}>
            Yeah, i suppose this should be like some bio info or something.  really i'm just faking it for now.<br/>
            That little robot guy I use for all my avatars comes from some obscure old Japanese comic book cover I randomly found doing google image searches for pulp art.  I'm probably infringing on someone's copyright.  If so, please let me know.
          </Route>
        </section>
      </section>
    </div>
    </BrowserRouter>
  );
}

export default App;
