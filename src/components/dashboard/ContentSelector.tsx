import React, { FC } from 'react';
import { RandomView } from '../data-views/RandomView';
import { RecipeView } from '../data-views/RecipeView';
import { StockView } from '../data-views/StockView';
import { DashLeaf } from './types';

type Props = {
  config?: DashLeaf
}

export const ContentSelector: FC<Props> = ({config}) => {
  const type = config?.component;
  return <div className={'dash-leaf'} style={{flexBasis: config?.size}}><div style={{display:'block'}}>{(() => {
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
        You would select one here.
      </>;
  }
  })()}</div></div>;
}
