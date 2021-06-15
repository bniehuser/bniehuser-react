import React, { FC } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { RandomView } from '../data-views/RandomView';
import { RecipeView } from '../data-views/RecipeView';
import { StockView } from '../data-views/StockView';
import { DashLeaf, DashNode } from './types';

type Props = {
  config: DashLeaf
  parent: DashNode
}

export const Content: FC<Props> = ({config, parent}) => {
  const [dash,setDashNode] = useDashboard();
  const findParent = (n: DashNode|DashLeaf, d: DashNode = dash): DashNode|DashLeaf|undefined => d.nodes?.indexOf(n) > -1 ? d : d.nodes?.reduce((a, s) => a || findParent(n, s as DashNode));
  const split = (direction: 'row'|'column') => {
    if(parent.orientation === direction) {
      const size = (parseFloat(config?.size as string || '0')/2) + '%';
      setDashNode(config, [{...config, size} as DashLeaf, {size, component:'',arguments:{}} as DashLeaf]);
    } else {

      setDashNode(config, [{
        size:config.size,
        orientation: direction,
        nodes: [{...config, size:'50%'}, {size:'50%',component:'',arguments:{}}]
      }]);
    }
  }
  const splitHorizontal = () => split('column');
  const splitVertical = () => split('row');
  const deleteContent = () => {
    let up: DashNode|DashLeaf|undefined = parent;
    let lc: DashNode|DashLeaf = config;
    while(up && (up as DashNode).nodes?.length === 1) {
      lc = up;
      up = findParent(up);
    }
    // should get us back to parent node where needed
    if(up) {
      const size = parseFloat(lc?.size as string || '0');
      const nodes = (up as DashNode).nodes.filter(n => n !== lc).map(n => ({
        ...n,
        size: ((parseFloat(n?.size as string || '0') / (100 - size)) * 100).toFixed(2) + '%'
      }));
      setDashNode(up, [{...up, nodes}])
    } else {
      console.error('could not find multi-child parent', parent, dash);
    }

  }

  const type = config?.component;
  return <div className={'dash-leaf'} style={{flexBasis: config?.size}}><div style={{display:'block'}}>
    <div className={'dash-panel-title'}>
      {type || 'select contents'}
      <div className={'dash-panel-button-tray'}>
        <button className={'dash-panel-button hidden'} onClick={splitHorizontal}>—</button>
        <button className={'dash-panel-button hidden'} onClick={splitVertical}>|</button>
        <button className={'dash-panel-button hidden'} onClick={deleteContent}>✖</button>
        <button className={'dash-panel-button'}>⚙</button>
      </div>
    </div>
    {(() => {
      switch(type) {
        case 'stock':
          return <StockView {...config?.arguments}/>;
        case 'recipe':
          return <RecipeView {...config?.arguments}/>;
        // case 'chat':
        //   return <Stock {...config?.arguments}/>;
        // case 'dm':
        //   return <Stock {...config?.arguments}/>;
        case 'random':
          return <RandomView {...config?.arguments}/>;
        default:
          return <>
            <button onClick={() => setDashNode(config, [{...config, component: 'random'}])}>Random</button>
            <button onClick={() => setDashNode(config, [{...config, component: 'recipe'}])}>Recipe</button>
            <button onClick={() => setDashNode(config, [{...config, component: 'stock', arguments: {ticker:'APPL'}}])}>Stock</button>
          </>;
      }
    })()}
  </div></div>;
}
