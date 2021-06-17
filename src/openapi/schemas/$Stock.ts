/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Stock = {
    properties: {
        symbol: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
        },
        name_short: {
            type: 'string',
            isRequired: true,
        },
        sector: {
            type: 'string',
        },
        industry: {
            type: 'string',
        },
        logo_url: {
            type: 'string',
            isRequired: true,
        },
        history_period: {
            type: 'string',
            isRequired: true,
        },
        history: {
            type: 'array',
            contains: {
                type: 'StockPeriod',
            },
            isRequired: true,
        },
        price: {
            type: 'number',
        },
        change: {
            type: 'number',
            isRequired: true,
        },
    },
};