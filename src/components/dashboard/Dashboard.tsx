import React, { FC } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { Panel } from './Panel';

export const Dashboard: FC = () => {
  const [dashboard] = useDashboard();
  return <div className={'dash-container'}>
    <Panel node={dashboard}/>
    </div>;
}
