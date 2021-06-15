import React, { FC, useState } from 'react';
import { DashLeaf, DashNode } from '../components/dashboard';


const initTree: DashNode = {
  size: 100,
  orientation:'row',
  nodes:[
    {size: '100%', orientation: 'column', nodes: [
        {size: '50%', orientation: 'row', nodes: [
            {size: '33%', component: 'stock', arguments: {ticker: 'GOOG'}},
            {size: '33%', component: 'random', arguments: {}},
            {size: '33%', component: 'random', arguments: {}},
          ]},
        {size: '50%', orientation: 'row', nodes: [
            {size: '50%', component: 'random', arguments: {}},
            {size: '50%', component: 'stock', arguments: {ticker: 'GME'}},
          ]},
      ]},
  ]
};

type Props = { children: React.ReactNode };
type DashReplace = (o: DashNode|DashLeaf, n: Array<DashNode|DashLeaf>, d?: DashNode) => void;

export const DashboardContentContext = React.createContext<DashNode>(initTree);
export const DashboardUpdateContext = React.createContext<DashReplace>((o, n) => ({}));

export const useDashboard = (): [DashNode, DashReplace] => {
  const dashContent = React.useContext(DashboardContentContext);
  const dashUpdate = React.useContext(DashboardUpdateContext);
  if (dashContent === undefined || dashUpdate === undefined) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return [dashContent, dashUpdate];
}

export const DashboardProvider: FC<Props> = ({children}) => {
  const [dashboard, setDashboard] = useState<DashNode>(initTree);
  const setNode: DashReplace = (o, n, d = dashboard) => {
    // ok the hard part; recursive search dashboard for updated piece
    const i = d.nodes?.indexOf(o);
    if(i !== undefined && i !== -1) {
      d.nodes.splice(i, 1, ...n);
    } else if(d.nodes?.length) {
      d.nodes.forEach(c => setNode(o, n, c as DashNode))
    }
    if(d === dashboard) {
      console.log('setting full dashboard', d);
      setDashboard({...d});
    }
  }
  return <DashboardContentContext.Provider value={initTree}>
    <DashboardUpdateContext.Provider value={setNode}>{children}</DashboardUpdateContext.Provider>
  </DashboardContentContext.Provider>;
}
