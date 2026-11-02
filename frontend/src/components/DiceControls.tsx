import "../styles/DiceControls.css";

/** Common die types available as quick-select buttons */
const PRESET_SIDES = [4, 6, 8, 10, 12, 20, 100] as const;

interface DiceControlsProps {
  sides: number;
  count: number;
  isLoading: boolean;
  onSidesChange: (sides: number) => void;
  onCountChange: (count: number) => void;
  onRoll: () => void;
}

/**
 * Controls panel: die-type presets, sides/count inputs, and the Roll button.
 */
export function DiceControls({
  sides,
  count,
  isLoading,
  onSidesChange,
  onCountChange,
  onRoll,
}: DiceControlsProps) {
  function handleSidesInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.min(100, Math.max(2, Number(e.target.value)));
    onSidesChange(val);
  }

  function handleCountInput(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Math.min(50, Math.max(1, Number(e.target.value)));
    onCountChange(val);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !isLoading) onRoll();
  }

  return (
    <section className="dice-controls" aria-label="Dice configuration">
      {/* Preset die type buttons */}
      <div role="group" aria-label="Quick die presets">
        <p className="dice-controls__label dice-controls__label--preset">
          Presets
        </p>
        <div className="dice-controls__presets">
          {PRESET_SIDES.map((s) => (
            <button
              key={s}
              className={`dice-controls__preset-btn${sides === s ? " dice-controls__preset-btn--active" : ""}`}
              onClick={() => onSidesChange(s)}
              aria-pressed={sides === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Manual inputs */}
      <div className="dice-controls__inputs" onKeyDown={handleKeyDown}>
        <label className="dice-controls__label" htmlFor="sides-input">
          Sides
          <input
            id="sides-input"
            className="dice-controls__input"
            type="number"
            min={2}
            max={100}
            value={sides}
            onChange={handleSidesInput}
            aria-describedby="sides-hint"
          />
          <span id="sides-hint" className="dice-controls__hint">
            2 – 100
          </span>
        </label>

        <label className="dice-controls__label" htmlFor="count-input">
          Dice
          <input
            id="count-input"
            className="dice-controls__input"
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={handleCountInput}
            aria-describedby="count-hint"
          />
          <span id="count-hint" className="dice-controls__hint">
            1 – 50
          </span>
        </label>
      </div>

      {/* Roll button */}
      <button
        className="dice-controls__roll-btn"
        onClick={onRoll}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? "Rolling…" : `Roll ${count} dice with ${sides} sides`}
      </button>
    </section>
  );
}
