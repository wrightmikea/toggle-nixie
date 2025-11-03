import { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import NixieTube from './NixieTube';
import './FourBitView.css';

/**
 * Four-Bit View Component
 *
 * Displays 4 toggle switches representing binary values (8, 4, 2, 1)
 * and a single Nixie tube showing the hexadecimal result (0-F).
 *
 * @param {Object} props
 * @param {string} props.mode - Current mode ('interactive' or 'autoincrement')
 */
function FourBitView({ mode = 'interactive' }) {
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

  /**
   * Autoincrement effect - counts from 0 to 15, then wraps
   */
  useEffect(() => {
    if (mode !== 'autoincrement') return;

    const interval = setInterval(() => {
      setSwitches(prev => {
        const currentValue =
          (prev[8] ? 8 : 0) +
          (prev[4] ? 4 : 0) +
          (prev[2] ? 2 : 0) +
          (prev[1] ? 1 : 0);

        const nextValue = (currentValue + 1) % 16;

        return {
          8: (nextValue & 8) !== 0,
          4: (nextValue & 4) !== 0,
          2: (nextValue & 2) !== 0,
          1: (nextValue & 1) !== 0
        };
      });
    }, 500); // Increment every 500ms

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="view-content">
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
              onToggle={() => mode === 'interactive' && toggleSwitch(value)}
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
    </div>
  );
}

export default FourBitView;
