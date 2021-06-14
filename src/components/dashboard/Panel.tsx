import React, { FC } from 'react';
import { ContentSelector } from './ContentSelector';
import { DashLeaf, DashNode } from './types';

type Props = {
  content: DashNode
}

export const Panel: FC<Props> = ({content}) => {
  return <div className={'dash-panel'} style={{flexDirection: content.orientation, flexBasis: content.size}}>
    {content.nodes.map(n => (n as DashNode).nodes?.length ? <Panel content={n as DashNode}/> : <ContentSelector config={n as DashLeaf}/>)}
  </div>;
}
