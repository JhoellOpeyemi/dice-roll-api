import { useState, useCallback } from "react";
import type {
  RollResult,
  RollError,
  RollParams,
  DiceRollState,
} from "../types/dice";

/**
 * In development Vite proxies "/api" to the real API Gateway endpoint so CORS
 * is never an issue locally. In production the VITE_API_BASE_URL env variable
 * should be set to the full API Gateway base URL.
 */
export function useDiceRoll(): DiceRollState & {
  roll: (params: RollParams) => Promise<void>;
} {
  const [result, setResult] = useState<RollResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roll = useCallback(async ({ sides, count }: RollParams) => {
    setIsLoading(true);
    setErrorMessage(null);

    // Use the Vite proxy path (/api/roll) in dev, or the env-var base URL in production.
    const base = import.meta.env.VITE_API_BASE_URL ?? "";
    const url = `${base}/roll?sides=${sides}&count=${count}`;

    try {
      const response = await fetch(url);
      const data: RollResult | RollError = await response.json();

      if (!response.ok) {
        // API returned a 4xx error with an "error" field
        setErrorMessage(
          (data as RollError).error ?? "An unexpected error occurred.",
        );
        setResult(null);
      } else {
        setResult(data as RollResult);
      }
    } catch {
      setErrorMessage(
        "Could not reach the server. Check your connection and try again.",
      );
      setResult(null);
    } finally {
      setIsLoading(false);
    }

    console.log(url);
  }, []);

  return { result, errorMessage, isLoading, roll };
}
