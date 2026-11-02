// Shared TypeScript types for the Dice Roll API

/** Successful response from GET /roll */
export interface RollResult {
  sides: number;
  count: number;
  rolls: number[];
  total: number;
  message: string;
}

/** Error response from GET /roll */
export interface RollError {
  error: string;
}

/** Parameters sent to the API */
export interface RollParams {
  sides: number;
  count: number;
}

/** State managed by the useDiceRoll hook */
export interface DiceRollState {
  result: RollResult | null;
  errorMessage: string | null;
  isLoading: boolean;
}
