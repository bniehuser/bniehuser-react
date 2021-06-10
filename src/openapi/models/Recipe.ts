/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Ingredient } from './Ingredient';
import type { InstructionPhase } from './InstructionPhase';

export type Recipe = {
    id: number;
    title: string;
    image: string;
    ingredients: Array<Ingredient>;
    ready_in_minutes: number;
    servings: number;
    summary: string;
    instructions: string;
    full_instructions: Array<InstructionPhase>;
    source_url: string;
}
