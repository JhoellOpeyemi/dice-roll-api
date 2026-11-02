import { DiceFace } from "./DiceFace";
import type { RollResult } from "../types/dice";
import "../styles/DiceResult.css";

interface DiceResultProps {
  result: RollResult;
}

/**
 * Displays the outcome of a dice roll: individual die faces, the total, and
 * a flavour message from the API.
 */
export function DiceResult({ result }: DiceResultProps) {
  const { rolls, total, message, sides, count } = result;

  // Pick an emoji to go alongside the message
  const emoji = getMessageEmoji(message);

  return (
    <section className="dice-result" aria-label="Roll result" aria-live="polite">
      {/* Die faces */}
      <div className="dice-result__faces">
        {rolls.map((value, index) => (
          <DiceFace
            key={index}
            value={value}
            sides={sides}
            animationDelay={index * 80}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="dice-result__summary">
        {count > 1 && (
          <p className="dice-result__total">
            Total: <strong>{total}</strong>
          </p>
        )}
        <p className="dice-result__message">
          <span className="dice-result__emoji" aria-hidden="true">{emoji}</span>
          {message}
        </p>
      </div>
    </section>
  );
}

// ---------- helpers ----------

function getMessageEmoji(message: string): string {
  if (message.includes("rock")) return "🎉";
  if (message.includes("grandma")) return "💀";
  return "🎲";
}
