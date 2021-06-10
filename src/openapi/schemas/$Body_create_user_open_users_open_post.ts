/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Body_create_user_open_users_open_post = {
    properties: {
        password: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            isRequired: true,
            format: 'email',
        },
        username: {
            type: 'string',
        },
    },
};