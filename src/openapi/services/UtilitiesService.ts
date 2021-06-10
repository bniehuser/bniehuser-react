/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { request as __request } from '../core/request';

export class UtilitiesService {

    /**
     * Health
     * @returns any Successful Response
     * @throws ApiError
     */
    public static async healthHealthGet(): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/health`,
        });
        return result.body;
    }

}