import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Apis: FC = () => {
  return <div>
    <h2>API Integrations</h2>
    <p>Here's a collection of a few different public APIs I wired into my backend Flask application to demonstrate some simple API passthrough communication.  Check 'em out!</p>
    <ul>
      <li><Link to={'/apis/postal'}>Basic Postal Code lookups from geolocation data</Link></li>
      <li><Link to={'/apis/stocks'}>Stock market data from public API sources</Link> -- not for day trading!</li>
      <li><Link to={'/apis/recipes'}>Recipe and recipe shopping data combining multiple public APIs</Link></li>
    </ul>
  </div>;
}
