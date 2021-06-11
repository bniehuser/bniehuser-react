import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const Apis: FC = () => {
  return <div>
    <h2>API Integrations</h2>
    <p>Here's a couple of different public APIs I wired into my backend FastAPI server to demonstrate some simple API passthrough communication.  Check 'em out!</p>
    <ul>
      <li><Link to={'/apis/stocks'}>Stock market data</Link> -- loaded from yfinance and given a treatment with apexcharts</li>
      <li><Link to={'/apis/recipes'}>Recipe and nutrition data</Link> -- through spoonacular, translate pertinent recipe details for front-end display</li>
    </ul>
  </div>;
}
