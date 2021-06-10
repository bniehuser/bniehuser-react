/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class Service {

    /**
     * Root
     * @returns any Successful Response
     * @throws ApiError
     */
    public static async rootGet(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/`,
        });
        return result.body;
    }

}