/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { InstructionStep } from './InstructionStep';

export type InstructionPhase = {
    name: string;
    steps: Array<InstructionStep>;
}
