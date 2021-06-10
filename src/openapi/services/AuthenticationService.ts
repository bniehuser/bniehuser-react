/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_reset_password_reset_password__post } from '../models/Body_reset_password_reset_password__post';
import type { Msg } from '../models/Msg';
import type { Token } from '../models/Token';
import type { User } from '../models/User';
import { request as __request } from '../core/request';

export class AuthenticationService {

    /**
     * Login Access Token
     * OAuth2 compatible token login, get an access token for future requests
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static async loginAccessTokenLoginAccessTokenPost({
        requestBody,
    }: {
        requestBody: any,
    }): Promise<Token> {
        const result = await __request({
            method: 'POST',
            path: `/login/access-token`,
            body: requestBody,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Test Token
     * Test access token
     * @returns User Successful Response
     * @throws ApiError
     */
    public static async testTokenLoginTestTokenPost(): Promise<User> {
        const result = await __request({
            method: 'POST',
            path: `/login/test-token`,
        });
        return result.body;
    }

    /**
     * Recover Password
     * Password Recovery
     * @returns Msg Successful Response
     * @throws ApiError
     */
    public static async recoverPasswordPasswordRecoveryEmailPost({
        email,
    }: {
        email: string,
    }): Promise<Msg> {
        const result = await __request({
            method: 'POST',
            path: `/password-recovery/${email}`,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Reset Password
     * Reset password
     * @returns Msg Successful Response
     * @throws ApiError
     */
    public static async resetPasswordResetPasswordPost({
        requestBody,
    }: {
        requestBody: Body_reset_password_reset_password__post,
    }): Promise<Msg> {
        const result = await __request({
            method: 'POST',
            path: `/reset-password/`,
            body: requestBody,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

}