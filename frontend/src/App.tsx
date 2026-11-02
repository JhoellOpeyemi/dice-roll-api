import { useState } from "react";
import { DiceControls } from "./components/DiceControls";
import { DiceResult } from "./components/DiceResult";
import { useDiceRoll } from "./hooks/useDiceRoll";
import "./styles/App.css";

export default function App() {
  const [sides, setSides] = useState(6);
  const [count, setCount] = useState(1);
  const { result, errorMessage, isLoading, roll } = useDiceRoll();

  function handleRoll() {
    roll({ sides, count });
  }

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__logo" aria-hidden="true">🎲</span>
        <h1 className="app__title">Dice Roller</h1>
        <p className="app__subtitle">Powered by AWS Lambda</p>
      </header>

      <main className="app__main">
        <DiceControls
          sides={sides}
          count={count}
          isLoading={isLoading}
          onSidesChange={setSides}
          onCountChange={setCount}
          onRoll={handleRoll}
        />

        {/* Error state */}
        {errorMessage && (
          <div className="app__error" role="alert">
            <span aria-hidden="true">⚠️</span> {errorMessage}
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div className="app__loading" aria-label="Rolling dice">
            <span className="app__spinner" aria-hidden="true">🎲</span>
            <span>Rolling…</span>
          </div>
        )}

        {/* Result */}
        {!isLoading && result && <DiceResult result={result} />}
      </main>

      <footer className="app__footer">
        <p>
          Built with React + Vite · API on AWS API Gateway + Lambda
        </p>
      </footer>
    </div>
  );
}
