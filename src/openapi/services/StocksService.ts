/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Stock } from '../models/Stock';
import type { StockPeriod } from '../models/StockPeriod';
import { request as __request } from '../core/request';

export class StocksService {

    /**
     * Get Ticker
     * @returns Stock Successful Response
     * @throws ApiError
     */
    public static async getTickerStocksTickerGet({
        ticker,
    }: {
        ticker: string,
    }): Promise<Stock> {
        const result = await __request({
            method: 'GET',
            path: `/stocks/${ticker}`,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Get Ticker
     * @returns StockPeriod Successful Response
     * @throws ApiError
     */
    public static async getTickerStocksTickerHistoryPeriodIntervalGet({
        ticker,
        period,
        interval,
    }: {
        ticker: string,
        period: string,
        interval: string,
    }): Promise<Array<StockPeriod>> {
        const result = await __request({
            method: 'GET',
            path: `/stocks/${ticker}/history/${period}/${interval}`,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

}