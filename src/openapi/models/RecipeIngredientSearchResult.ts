/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Ingredient } from './Ingredient';

export type RecipeIngredientSearchResult = {
    id: number;
    title: string;
    image: string;
    used_ingredients: Array<Ingredient>;
    unused_ingredients: Array<Ingredient>;
    missed_ingredients: Array<Ingredient>;
}
