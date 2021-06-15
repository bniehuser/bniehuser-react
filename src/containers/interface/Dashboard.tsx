import React, { FC } from 'react';
import { Dashboard as DashboardView } from '../../components/dashboard/Dashboard'
import { DashboardProvider } from '../../context/DashboardContext';

export const Dashboard: FC = () => {
  return <div>
    <h2>A Dashboard Builder (WIP)</h2>
    <p>For any panel, hover over the gear icon to expose panel options.  X to close, or | or -- to split the panel vertically or horizontally.  New panels can be filled with different content.  Drag the edges of the panels to resize.</p>
    <DashboardProvider>
      <DashboardView/>
    </DashboardProvider>
  </div>;
}
