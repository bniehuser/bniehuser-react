import React, { FC } from 'react';
import { Panel } from './Panel';
import { DashNode } from './types';

const tree: DashNode = {
  size: 100,
  orientation:'row',
  nodes:[
    {size: '100%', orientation: 'column', nodes: [
        {size: '50%', orientation: 'row', nodes: [
            {size: '33%', component: 'random', arguments: {}},
            {size: '33%', component: 'random', arguments: {}},
            {size: '33%', component: 'random', arguments: {}},
          ]},
        {size: '50%', orientation: 'row', nodes: [
            {size: '50%', component: 'stock', arguments: {ticker: 'GOOG'}},
            {size: '50%', component: 'stock', arguments: {ticker: 'GME'}},
          ]},
    ]},
  ]
};

export const Dashboard: FC = () => {
  return <>
    <p>in the absence of other content, we'll just toss a panel on here sending it the top of the dashboard tree</p>
    <div className={'dash-container'}>
    <Panel content={tree}/>
    </div>
  </>;
}
