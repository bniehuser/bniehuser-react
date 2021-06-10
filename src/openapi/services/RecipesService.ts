/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Recipe } from '../models/Recipe';
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

}