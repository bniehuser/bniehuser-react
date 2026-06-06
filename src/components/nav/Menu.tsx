import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : undefined);

export const Menu: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink end className={navClass} to={'/'}>
            home
          </NavLink>
        </li>
        <li>
          <NavLink className={navClass} to={'/about'}>
            about me
          </NavLink>
        </li>
        <li>
          <NavLink className={navClass} to={'/apis'}>
            apis
          </NavLink>
        </li>
        <li>
          <NavLink className={navClass} to={'/interface'}>
            interface
          </NavLink>
        </li>
        <li>
          <NavLink className={navClass} to={'/toys'}>
            toys
          </NavLink>
        </li>
        <li>
          <NavLink className={navClass} to={'/links'}>
            links
          </NavLink>
        </li>
        <li>
          <NavLink className={navClass} to={'/contact'}>
            contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
