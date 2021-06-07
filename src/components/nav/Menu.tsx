import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const Menu: FC = () => {
  return <nav>
    <h3>Sections</h3>
    <ul>
      <li><NavLink activeClassName={'active'} to={'/about'}>about me</NavLink></li>
      <li><NavLink activeClassName={'active'} to={'/apis'}>apis</NavLink></li>
      <li><NavLink activeClassName={'active'} to={'/interface'}>interface</NavLink></li>
      <li><NavLink activeClassName={'active'} to={'/toys'}>toys</NavLink></li>
      <li><NavLink activeClassName={'active'} to={'/links'}>links</NavLink></li>
      <li><NavLink activeClassName={'active'} to={'/contact'}>contact</NavLink></li>
    </ul>
  </nav>;
}
