import React, { FC } from 'react';
import { Content } from './Content';
import { DashLeaf, DashNode } from './types';

type Props = {
  node: DashNode
}

export const Panel: FC<Props> = ({node}) => {
  return <div className={'dash-panel'} style={{flexDirection: node.orientation, flexBasis: node.size}}>
    {node.nodes.map(n => (n as DashNode).nodes?.length ? <Panel node={n as DashNode}/> : <Content config={n as DashLeaf} parent={node}/>)}
  </div>;
}
