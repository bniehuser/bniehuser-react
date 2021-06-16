import React, { FC } from 'react';
import { Dashboard as DashboardView } from '../../components/dashboard/Dashboard'
import { DashboardProvider } from '../../context/DashboardContext';

export const Dashboard: FC = () => {
  return <div>
    <h2>A Dashboard Builder (WIP)</h2>
    <p>For any panel, hover over the gear icon to expose panel options.  X to close, or | or -- to split the panel vertically or horizontally.  New panels can be filled with different content.  Drag the edges of the panels to resize.</p>
    <p>Unfortunately, the window resizing is currently broken.  It uses a loose, non-formal grid based on flex layout and in the data model for the panels themselves i do not hold reference to the containing DOM nodes, for storage and serialization purposes.
    So unfortunately it's some tricky calculations to get at which containing element to change percentage based widths on elements which reflow naturally based on content and... it's just not working properly atm.  Fixing it, sorry :(.
    </p>
    <DashboardProvider>
      <DashboardView/>
    </DashboardProvider>
  </div>;
}
