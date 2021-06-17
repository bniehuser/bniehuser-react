import { atom } from 'recoil';
import { Recipe } from '../openapi';

export type RecipeIndex = {[id: number]: Recipe};

export const recipesState = atom<RecipeIndex>({key: 'recipesState', default: {}});
