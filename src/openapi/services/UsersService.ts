/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_create_user_open_users_open_post } from '../models/Body_create_user_open_users_open_post';
import type { Body_update_user_me_users_me_put } from '../models/Body_update_user_me_users_me_put';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserUpdate } from '../models/UserUpdate';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Read Users
     * Retrieve users.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async readUsersUsersGet({
        skip,
        limit = 100,
    }: {
        skip: number,
        limit?: number,
    }): Promise<Array<User>> {
        const result = await __request({
            method: 'GET',
            path: `/users/`,
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Create User
     * Create new user.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async createUserUsersPost({
        requestBody,
    }: {
        requestBody: UserCreate,
    }): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/users/`,
            body: requestBody,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Read User Me
     * Get current user.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async readUserMeUsersMeGet(): Promise<User> {
        const result = await __request({
            method: 'GET',
            path: `/users/me`,
        });
        return result.body;
    }

    /**
     * Update User Me
     * Update own user.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async updateUserMeUsersMePut({
        requestBody,
    }: {
        requestBody?: Body_update_user_me_users_me_put,
    }): Promise<User> {
        const result = await __request({
            method: 'PUT',
            path: `/users/me`,
            body: requestBody,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Create User Open
     * Create new user without the need to be logged in.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async createUserOpenUsersOpenPost({
        requestBody,
    }: {
        requestBody: Body_create_user_open_users_open_post,
    }): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/users/open`,
            body: requestBody,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Read User By Id
     * Get a specific user by id.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async readUserByIdUsersUserIdGet({
        userId,
    }: {
        userId: number,
    }): Promise<User> {
        const result = await __request({
            method: 'GET',
            path: `/users/${userId}`,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Update User
     * Update a user.
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async updateUserUsersUserIdPut({
        userId,
        requestBody,
    }: {
        userId: number,
        requestBody: UserUpdate,
    }): Promise<User> {
        const result = await __request({
            method: 'PUT',
            path: `/users/${userId}`,
            body: requestBody,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

}