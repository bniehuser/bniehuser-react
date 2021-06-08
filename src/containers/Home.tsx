import React, { FC, useState } from 'react';
import Highlight from 'react-highlight';

const fib: (n: number, l?: number[]) => number = (n, l=[0,1]) => l[n] !== undefined ? l[n] : (l[n] = fib(n-1, l) + fib(n-2, l));
// const fibSlow: (n: number) => number = n => n < 2 ? n : fibSlow(n-1) + fibSlow(n-2);

export const Home: FC = () => {
  const [fibVal, setFib] = useState(0);
  return <div>
    <h2>Hey there, welcome to my site.</h2>
    <p>
      So, the other day I was looking at memoized recursion as a performance enhancement; something I had implemented in the past without realizing there was a name for it.
      I wondered how concisely I could add the memoization to an otherwise disastrously bad recursive algorithm in typescript.</p>
    <p>I chose a fibonacci number finder, since its naive implementation is really inefficient (like <code className={'inlineCode'}>O(2<sup>n</sup>)</code> inefficient).  Here's a one-liner to do it the naive way:</p>
    <Highlight className={'typescript'}>
      {`const fibSlow: (n: number) => number = n => n < 2 ? n : fibSlow(n-1) + fibSlow(n-2);
let seqNum = fibSlow(87);
// try it... i dare you :3`}
    </Highlight>
    <p>I won't put a test input on it, because over about 20-30 it'll steal all your RAM and lock your computer.</p>
    <p>I wanted to keep the memoized version as a one-liner using some syntactic tricks of ES6, which I did, but I'd never implement the technique in this form in production because it's too arcane to be instantly legible.<br/>
      Plus at 126 characters, it stretches the definition of 'one-liner' pretty thin.</p>
    <Highlight className={'typescript'}>
      {`const fib: (n:number, l?:number[]) => number = (n, l=[0,1]) => l[n] !== undefined ? l[n] : (l[n] = fib(n-1, l) + fib(n-2, l));
let seqNum = fib(87);
// 679891637638612200`}
    </Highlight>
    <p>It's fast enough to run in realtime as you type, since culling almost every recursive call via cache takes us back down to <code className={'inlineCode'}>O(n)</code>.  I clamped the input values to avoid the possibility of call stack overflow, but otherwise it just runs the function above on whatever you type in the field.<br/>
      Anything over 1476 is so big that it exceeds the bounds of a double-precision floating point number and ECMAScript just considers it 'Infinity'.<br/>
    Try it!</p>
    <input type={'number'} step={1} size={2} min={0} max={1476} onChange={e => setFib(fib(Math.max(0, Math.min(1477, parseInt(e.target.value, 10) || 0))))}/> =&gt; {fibVal}
    <p>
      Really this is intro CS stuff at this point, although it's surprising how many programmers never give a second thought to basic performance pitfalls.<br/>
      There's nothing particularly special about my implementation.
      I've seen some very verbose examples and explanations that make the memoization larger than the function itself, or needlessly concoct external data hashes for memo data storage (valuable in some but not all cases);
      in this case taking a simple default and letting the internal recursion take care of maintenance gives an acceptably performant result.
      Combining assignment and value return skips a separate step for updating the memo stash.
      All in all it makes for a very tiny, self-contained addition to the algorithm.
      It's not pretty, but that wasn't the intent.
    </p>
    <p>
      I spent about 30 seconds writing the function, and about 10 minutes debugging it, mainly because for some
      reason <a href={'https://www.google.com/search?q=87th+number+in+fibonacci+sequence'} target={'_blank'} rel="noreferrer">a google search for the 87th fibonacci sequence number</a> (the number I randomly happened to be testing) inexplicably leads
      to <a href={'https://www.thelearningpoint.net/home/mathematics/fibonacci-numbers/fibonacci-numbers-87th'} target={'_blank'} rel="noreferrer">a page displaying the wrong answer</a>.  Turns out I wrote it right the first time.
    </p>
    <p>Well, c'est la vie, I suppose.</p>
  </div>;
}
