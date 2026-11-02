import "../styles/DiceFace.css";

interface DiceFaceProps {
  /** The rolled value on this die */
  value: number;
  /** The number of sides this die has */
  sides: number;
  /** Optional animation delay so dice appear to land one by one */
  animationDelay?: number;
}

/**
 * Renders a single die face showing its rolled value.
 * The visual appearance adapts for standard (d6) and non-standard dice.
 */
export function DiceFace({ value, sides, animationDelay = 0 }: DiceFaceProps) {
  // For the classic d6 show pip patterns; for others show the number
  const isD6 = sides === 6;

  return (
    <div
      className="dice-face"
      style={{ animationDelay: `${animationDelay}ms` }}
      aria-label={`Die showing ${value}`}
    >
      {isD6 ? (
        <D6Pips value={value} />
      ) : (
        <span className="dice-face__number">
          <span className="dice-face__value">{value}</span>
          <span className="dice-face__sides">d{sides}</span>
        </span>
      )}
    </div>
  );
}

// ---------- helpers ----------

/** Pip layout for a classic six-sided die */
interface D6PipsProps {
  value: number;
}

function D6Pips({ value }: D6PipsProps) {
  // Each entry is an array of [top%, left%] pip positions
  const pipLayouts: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [
      [25, 50],
      [75, 50],
    ],
    3: [
      [20, 75],
      [50, 50],
      [80, 25],
    ],
    4: [
      [25, 25],
      [25, 75],
      [75, 25],
      [75, 75],
    ],
    5: [
      [25, 25],
      [25, 75],
      [50, 50],
      [75, 25],
      [75, 75],
    ],
    6: [
      [25, 25],
      [25, 75],
      [50, 25],
      [50, 75],
      [75, 25],
      [75, 75],
    ],
  };

  const pips = pipLayouts[value] ?? [];

  return (
    <div className="d6-pips" aria-hidden="true">
      {pips.map(([top, left], i) => (
        <span
          key={i}
          className="d6-pip"
          style={{ top: `${top}%`, left: `${left}%` }}
        />
      ))}
    </div>
  );
}
