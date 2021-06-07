import React, { FC, useState } from 'react';
import Highlight from 'react-highlight';

const fib: (n: number, l?: number[]) => number = (n, l=[0,1]) => l[n] !== undefined ? l[n] : (l[n] = fib(n-1, l) + fib(n-2, l));
// const fibSlow: (n: number) => number = n => n < 2 ? n : fibSlow(n-1) + fibSlow(n-2);

export const Home: FC = () => {
  const [fibVal, setFib] = useState(0);
  return <div>
    <h2>Hey there, welcome to my site.</h2>
    <p>This is the bniehuser.com site.  pretty boring.</p>
    <p>oh, here's a memoized one liner typescript fibonacci sequence number finder.  it only works up to index 1476, after that ecmascript considers it 'Infinity'.  input is clamped to avoid call stack overflow.</p>
    <Highlight className={'typescript'}>
      {`const fib: (n:number, l?:number[]) => number = (n, l=[0,1]) => l[n] !== undefined ? l[n] : (l[n] = fib(n-1, l) + fib(n-2, l));`}
    </Highlight>
    <p>it's fast enough to run in realtime as you type.</p>
    <input type={'number'} step={1} size={2} min={0} max={1476} onChange={e => setFib(fib(Math.min(1477, parseInt(e.target.value, 10) || 0)))}/> =&gt; {fibVal}
    <p>
      I heard somewhere that this is the kind of thing that makes you look like a cool programmer who knows what they're doing.<br/>
      Memoized recursion is one of those performance boosts they teach in CS courses these days.<br/>
      I wanted to make it a one-liner using some syntactic tricks of ES6, which I did, but I'd never implement the technique in this form in production because it's too arcane to be instantly legible.<br/>
      Plus at 126 characters, it stretches the definition of 'one-liner' pretty thin.
    </p>
    <p>
      Of course, I spent about four times as much time figuring out why my code wasn't working as I did actually writing it, mainly because for some
      reason <a href={'https://www.google.com/search?q=87th+number+in+fibonacci+sequence'} target={'_blank'} rel="noreferrer">a google search for the 87th fibonacci sequence number</a> (the number I randomly happened to be testing) inexplicably leads
      to <a href={'https://www.thelearningpoint.net/home/mathematics/fibonacci-numbers/fibonacci-numbers-87th'} target={'_blank'} rel="noreferrer">a page displaying the wrong answer</a>.  Turns out I wrote it right the first time.
    </p>
    <p>Well, c'est la vie, I suppose.</p>
    <p>for comparison, here's the naive version.</p>
    <Highlight className={'typescript'}>
      {`const fibSlow: (n: number) => number = n => n < 2 ? n : fibSlow(n-1) + fibSlow(n-2);`}
    </Highlight>
    <p>I won't put a test input on it, because over about 20-30 it'll steal all your RAM and lock your computer.</p>
  </div>;
}
