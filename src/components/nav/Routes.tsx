import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { About, Apis, Contact, Home, Interface, Links, Toys } from '../../containers';
import { Recipes } from '../../containers/apis/Recipes';
import { Stocks } from '../../containers/apis/Stocks';
import { Bombsquad } from '../../containers/toys/Bombsquad';
import { Boxes } from '../../containers/toys/Boxes';
import { Divide } from '../../containers/toys/Divide';
import { Icosahedron } from '../../containers/toys/Icosahedron';
import { WaveFunctionCollapse } from '../../containers/toys/WaveFunctionCollapse';

export const Routes: FC = () => {
  return <>
    <Route exact={true} path={'/'} component={Home}/>
    <Route path={'/about'} component={About}/>
    <Route exact={true} path={'/apis'} component={Apis}/>
    <Route path={'/apis/stocks'} component={Stocks}/>
    <Route path={'/apis/recipes'} component={Recipes}/>
    <Route path={'/contact'} component={Contact}/>
    <Route path={'/interface'} component={Interface}/>
    <Route path={'/links'} component={Links}/>
    <Route exact={true} path={'/toys'} component={Toys}/>
    <Route path={'/toys/bombsquad'} component={Bombsquad}/>
    <Route path={'/toys/icosahedron'} component={Icosahedron}/>
    <Route path={'/toys/divide'} component={Divide}/>
    <Route path={'/toys/boxes'} component={Boxes}/>
    <Route path={'/toys/wfc'} component={WaveFunctionCollapse}/>
  </>;
}
