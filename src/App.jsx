import { useState } from 'react';
import ToggleSwitch from './components/ToggleSwitch';
import NixieTube from './components/NixieTube';
import './App.css';

/**
 * Main App Component
 *
 * Demonstrates interactive toggle switches that control a binary value
 * displayed as a hexadecimal digit in a Nixie tube display.
 *
 * The four switches represent binary values: 8, 4, 2, 1
 * Their combined state determines the hex value (0-F) shown in the Nixie tube.
 */
function App() {
  // State for each toggle switch (representing binary digits)
  const [switches, setSwitches] = useState({
    8: false,
    4: false,
    2: false,
    1: false
  });

  /**
   * Toggle a specific switch
   * @param {number} value - The binary value of the switch (8, 4, 2, or 1)
   */
  const toggleSwitch = (value) => {
    setSwitches(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
  };

  /**
   * Calculate the hexadecimal value from switch states
   * Derived state: sum of (switch_state × switch_value) for all switches
   * @returns {number} Value from 0 to 15
   */
  const getHexValue = () => {
    return (
      (switches[8] ? 8 : 0) +
      (switches[4] ? 4 : 0) +
      (switches[2] ? 2 : 0) +
      (switches[1] ? 1 : 0)
    );
  };

  const hexValue = getHexValue();

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Binary Toggle Switches</h1>
        <p className="subtitle">
          A React demonstration of graphical interactive controls
        </p>
      </header>

      <main className="app-main">
        <section className="controls-section">
          <h2>Binary Input Controls</h2>
          <p className="instruction">
            Click the opposite side of each toggle to change its state
          </p>

          <div className="toggles-container">
            {[8, 4, 2, 1].map((value) => (
              <ToggleSwitch
                key={value}
                value={value}
                isOn={switches[value]}
                onToggle={() => toggleSwitch(value)}
              />
            ))}
          </div>

          <div className="binary-display">
            <div className="binary-label">Binary:</div>
            <div className="binary-value">
              <span className={switches[8] ? 'bit-on' : 'bit-off'}>
                {switches[8] ? '1' : '0'}
              </span>
              <span className={switches[4] ? 'bit-on' : 'bit-off'}>
                {switches[4] ? '1' : '0'}
              </span>
              <span className={switches[2] ? 'bit-on' : 'bit-off'}>
                {switches[2] ? '1' : '0'}
              </span>
              <span className={switches[1] ? 'bit-on' : 'bit-off'}>
                {switches[1] ? '1' : '0'}
              </span>
            </div>
            <div className="decimal-display">
              Decimal: <span className="decimal-value">{hexValue}</span>
            </div>
          </div>
        </section>

        <section className="display-section">
          <h2>Hexadecimal Display</h2>
          <p className="display-info">
            Vintage Nixie Tube showing hex value (0-F)
          </p>

          <NixieTube value={hexValue} />
        </section>
      </main>

      <footer className="app-footer">
        <p>
          Built with React, HTML5, CSS3, and SVG |
          <a
            href="https://github.com/wrightmikea/react-toggles"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </a>
        </p>
        <p className="copyright">
          Copyright &copy; 2025 - Michael A Wright | MIT License
        </p>
      </footer>
    </div>
  );
}

export default App;
