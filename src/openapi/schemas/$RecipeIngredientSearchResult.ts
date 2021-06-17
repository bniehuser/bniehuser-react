/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $RecipeIngredientSearchResult = {
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
        used_ingredients: {
            type: 'array',
            contains: {
                type: 'Ingredient',
            },
            isRequired: true,
        },
        unused_ingredients: {
            type: 'array',
            contains: {
                type: 'Ingredient',
            },
            isRequired: true,
        },
        missed_ingredients: {
            type: 'array',
            contains: {
                type: 'Ingredient',
            },
            isRequired: true,
        },
    },
};