import { FC } from 'react';
import './divide.css';

export const Divide: FC = () => {
  return <div id={'divcont'}>
    <h1>divide</h1>
    <p>
      an experiment using <em>only</em> <strong>html</strong> and <strong>css</strong>.
      hover over the bottom half (or touch if you're on a phone) for a treat.
    </p>
    <div id="divide">
      <div id="divide-inner">
        <div id="body-w"/>
        <div id="body-b"/>
        <div id="head-w"/>
        <div id="head-b"/>
      </div>
    </div>
  </div>
}
