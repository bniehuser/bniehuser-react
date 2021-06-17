/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Recipe } from '../models/Recipe';
import type { RecipeIngredientSearchResult } from '../models/RecipeIngredientSearchResult';
import { request as __request } from '../core/request';

export class RecipesService {

    /**
     * Get Random Recipe
     * @returns Recipe Successful Response
     * @throws ApiError
     */
    public static async getRandomRecipeRecipesRandomGet(): Promise<Recipe> {
        const result = await __request({
            method: 'GET',
            path: `/recipes/random`,
        });
        return result.body;
    }

    /**
     * Get Recipe
     * @returns Recipe Successful Response
     * @throws ApiError
     */
    public static async getRecipeRecipesRecipeIdGet({
        id,
    }: {
        id: string,
    }): Promise<Recipe> {
        const result = await __request({
            method: 'GET',
            path: `/recipes/recipe/${id}`,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

    /**
     * Search
     * @returns RecipeIngredientSearchResult Successful Response
     * @throws ApiError
     */
    public static async searchRecipesSearchIngredientsGet({
        ingredients,
    }: {
        ingredients: string,
    }): Promise<Array<RecipeIngredientSearchResult>> {
        const result = await __request({
            method: 'GET',
            path: `/recipes/search/${ingredients}`,
            errors: {
                422: `Validation Error`,
            },
        });
        return result.body;
    }

}