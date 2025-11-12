import { useState, useEffect } from 'react';
import ToggleSwitch from './ToggleSwitch';
import NixieTube from './NixieTube';
import './SixteenBitView.css';

/**
 * Sixteen-Bit View Component
 *
 * Displays 16 toggle switches organized in 4 groups of 4,
 * with each group controlling one Nixie tube.
 * Shows hexadecimal values from 0000 to FFFF.
 *
 * @param {Object} props
 * @param {string} props.mode - Current mode ('interactive', 'autoincrement', or 'autodecrement')
 */
function SixteenBitView({ mode = 'interactive' }) {
  // State for 16 switches organized in 4 nibbles (4-bit groups)
  // nibble0 = leftmost (most significant), nibble3 = rightmost (least significant)
  const [switches, setSwitches] = useState({
    nibble0: { 8: false, 4: false, 2: false, 1: false },
    nibble1: { 8: false, 4: false, 2: false, 1: false },
    nibble2: { 8: false, 4: false, 2: false, 1: false },
    nibble3: { 8: false, 4: false, 2: false, 1: false }
  });

  /**
   * Toggle a specific switch in a specific nibble
   * @param {string} nibble - The nibble identifier (nibble0-nibble3)
   * @param {number} value - The binary value of the switch (8, 4, 2, or 1)
   */
  const toggleSwitch = (nibble, value) => {
    setSwitches(prev => ({
      ...prev,
      [nibble]: {
        ...prev[nibble],
        [value]: !prev[nibble][value]
      }
    }));
  };

  /**
   * Calculate the hexadecimal value for a specific nibble
   * @param {string} nibble - The nibble identifier
   * @returns {number} Value from 0 to 15
   */
  const getHexValue = (nibble) => {
    const n = switches[nibble];
    return (
      (n[8] ? 8 : 0) +
      (n[4] ? 4 : 0) +
      (n[2] ? 2 : 0) +
      (n[1] ? 1 : 0)
    );
  };

  /**
   * Get all 16 bits as a binary string
   * @returns {string} 16-character binary string
   */
  const getBinaryString = () => {
    let binary = '';
    ['nibble0', 'nibble1', 'nibble2', 'nibble3'].forEach(nibble => {
      const n = switches[nibble];
      binary += (n[8] ? '1' : '0');
      binary += (n[4] ? '1' : '0');
      binary += (n[2] ? '1' : '0');
      binary += (n[1] ? '1' : '0');
    });
    return binary;
  };

  /**
   * Get the full decimal value (0-65535)
   * @returns {number}
   */
  const getDecimalValue = () => {
    return parseInt(getBinaryString(), 2);
  };

  const hexValues = {
    nibble0: getHexValue('nibble0'),
    nibble1: getHexValue('nibble1'),
    nibble2: getHexValue('nibble2'),
    nibble3: getHexValue('nibble3')
  };

  // Get hex string representation
  const getHexString = () => {
    return ['nibble0', 'nibble1', 'nibble2', 'nibble3']
      .map(nibble => hexValues[nibble].toString(16).toUpperCase())
      .join('');
  };

  /**
   * Autoincrement/Autodecrement effect
   * - Autoincrement: counts from 0 to 65535, then wraps to 0
   * - Autodecrement: counts from 65535 to 0, then wraps to 65535
   */
  useEffect(() => {
    if (mode !== 'autoincrement' && mode !== 'autodecrement') return;

    const interval = setInterval(() => {
      setSwitches(prev => {
        // Calculate current value from prev state
        let binaryStr = '';
        ['nibble0', 'nibble1', 'nibble2', 'nibble3'].forEach(nibble => {
          const n = prev[nibble];
          binaryStr += (n[8] ? '1' : '0');
          binaryStr += (n[4] ? '1' : '0');
          binaryStr += (n[2] ? '1' : '0');
          binaryStr += (n[1] ? '1' : '0');
        });

        const currentValue = parseInt(binaryStr, 2);
        let nextValue;
        if (mode === 'autoincrement') {
          nextValue = (currentValue + 1) % 65536;
        } else { // autodecrement
          nextValue = (currentValue - 1 + 65536) % 65536;
        }

        // Convert nextValue to binary and split into nibbles
        const binary = nextValue.toString(2).padStart(16, '0');

        return {
          nibble0: {
            8: binary[0] === '1',
            4: binary[1] === '1',
            2: binary[2] === '1',
            1: binary[3] === '1'
          },
          nibble1: {
            8: binary[4] === '1',
            4: binary[5] === '1',
            2: binary[6] === '1',
            1: binary[7] === '1'
          },
          nibble2: {
            8: binary[8] === '1',
            4: binary[9] === '1',
            2: binary[10] === '1',
            1: binary[11] === '1'
          },
          nibble3: {
            8: binary[12] === '1',
            4: binary[13] === '1',
            2: binary[14] === '1',
            1: binary[15] === '1'
          }
        };
      });
    }, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="sixteen-bit-view">
      {/* Nixie Tubes Display Section */}
      <section className="nixie-section">
        <div className="nixie-tubes-row">
          {['nibble0', 'nibble1', 'nibble2', 'nibble3'].map((nibble) => (
            <div key={nibble} className="nixie-tube-wrapper">
              <NixieTube value={hexValues[nibble]} showLabel={false} />
            </div>
          ))}
        </div>
        <div className="hex-label">
          0x{getHexString()} = {getDecimalValue()}
          <sub>10</sub>
        </div>
      </section>

      {/* Toggle Switches Section */}
      <section className="switches-section">
        <div className="switches-row">
          {['nibble0', 'nibble1', 'nibble2', 'nibble3'].map((nibble, nibbleIndex) => (
            <div key={nibble} className="nibble-switches">
              {[8, 4, 2, 1].map((value, bitIndex) => {
                const switchNumber = nibbleIndex * 4 + bitIndex;
                return (
                  <div key={`${nibble}-${value}`} className="switch-with-label">
                    <div className="switch-number">{switchNumber}</div>
                    <ToggleSwitch
                      value={value}
                      isOn={switches[nibble][value]}
                      onToggle={() => mode === 'interactive' && toggleSwitch(nibble, value)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SixteenBitView;
