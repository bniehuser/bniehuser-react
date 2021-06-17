/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StockPeriod } from './StockPeriod';

export type Stock = {
    symbol: string;
    name?: string;
    name_short: string;
    sector?: string;
    industry?: string;
    logo_url: string;
    history_period: string;
    history: Array<StockPeriod>;
    price?: number;
    change: number;
}
