/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_login_access_token_login_access_token_post = {
    properties: {
        grant_type: {
            type: 'string',
            pattern: 'password',
        },
        username: {
            type: 'string',
            isRequired: true,
        },
        password: {
            type: 'string',
            isRequired: true,
        },
        scope: {
            type: 'string',
            isRequired: true,
        },
        client_id: {
            type: 'string',
        },
        client_secret: {
            type: 'string',
        },
    },
};