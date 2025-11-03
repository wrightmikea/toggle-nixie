import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import NixieTube from './NixieTube';
import './FourBitView.css';

/**
 * Four-Bit View Component
 *
 * Displays 4 toggle switches representing binary values (8, 4, 2, 1)
 * and a single Nixie tube showing the hexadecimal result (0-F).
 */
function FourBitView() {
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
    </div>
  );
}

export default FourBitView;
