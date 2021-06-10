/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $User = {
    properties: {
        username: {
            type: 'string',
            isRequired: true,
        },
        email: {
            type: 'string',
            format: 'email',
        },
        id: {
            type: 'number',
        },
    },
};