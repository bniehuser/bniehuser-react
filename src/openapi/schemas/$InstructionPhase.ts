/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $InstructionPhase = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        steps: {
            type: 'array',
            contains: {
                type: 'InstructionStep',
            },
            isRequired: true,
        },
    },
};