import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { About, Apis, Contact, Home, Interface, Links, Toys } from '../../containers';

export const Routes: FC = () => {
  return <>
    <Route exact={true} path={'/'} component={Home}/>
    <Route path={'/about'} component={About}/>
    <Route path={'/apis'} component={Apis}/>
    <Route path={'/contact'} component={Contact}/>
    <Route path={'/interface'} component={Interface}/>
    <Route path={'/links'} component={Links}/>
    <Route path={'/toys'} component={Toys}/>
  </>;
}
