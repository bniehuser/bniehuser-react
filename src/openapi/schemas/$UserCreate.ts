/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserCreate = {
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
            isRequired: true,
        },
        is_superuser: {
            type: 'boolean',
            isRequired: true,
        },
    },
};