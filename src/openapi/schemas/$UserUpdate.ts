/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserUpdate = {
    properties: {
        username: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
        },
    },
};