/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Recipe = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        image: {
            type: 'string',
            isRequired: true,
        },
        ingredients: {
            type: 'array',
            contains: {
                type: 'Ingredient',
            },
            isRequired: true,
        },
        ready_in_minutes: {
            type: 'number',
            isRequired: true,
        },
        servings: {
            type: 'number',
            isRequired: true,
        },
        summary: {
            type: 'string',
            isRequired: true,
        },
        instructions: {
            type: 'string',
            isRequired: true,
        },
        full_instructions: {
            type: 'array',
            contains: {
                type: 'InstructionPhase',
            },
            isRequired: true,
        },
        source_url: {
            type: 'string',
            isRequired: true,
        },
    },
};