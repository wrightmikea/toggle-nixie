import { useState } from 'react';
import './ToggleSwitch.css';

/**
 * ToggleSwitch Component
 *
 * An interactive toggle switch that can be clicked on the opposite side
 * to change its state. Provides visual affordance through hover effects.
 *
 * @param {Object} props
 * @param {boolean} props.isOn - Current state of the switch
 * @param {Function} props.onToggle - Callback when switch is toggled
 * @param {number} props.value - The binary value this switch represents (8, 4, 2, or 1)
 */
const ToggleSwitch = ({ isOn, onToggle, value }) => {
  const [hoverSide, setHoverSide] = useState(null);

  const handleClick = (side) => {
    // Only toggle if clicking on the opposite side
    // For vertical: top = on (1), bottom = off (0)
    if ((side === 'bottom' && isOn) || (side === 'top' && !isOn)) {
      onToggle();
    }
  };

  const handleMouseEnter = (side) => {
    // Only show hover effect on the clickable (opposite) side
    if ((side === 'bottom' && isOn) || (side === 'top' && !isOn)) {
      setHoverSide(side);
    }
  };

  const handleMouseLeave = () => {
    setHoverSide(null);
  };

  return (
    <div className="toggle-container">
      <div className="toggle-label">{value}</div>
      <svg
        width="60"
        height="120"
        viewBox="0 0 60 120"
        className="toggle-switch"
        aria-label={`Toggle switch for value ${value}, currently ${isOn ? 'on' : 'off'}`}
        role="switch"
        aria-checked={isOn}
      >
        {/* Switch background track (vertical) */}
        <rect
          x="15"
          y="10"
          width="30"
          height="100"
          rx="15"
          className={`toggle-track ${isOn ? 'on' : 'off'}`}
        />

        {/* Top clickable area (visible when switch is OFF) */}
        <rect
          x="15"
          y="10"
          width="30"
          height="50"
          rx="15"
          className={`toggle-clickable-area ${hoverSide === 'top' ? 'hover' : ''}`}
          onClick={() => handleClick('top')}
          onMouseEnter={() => handleMouseEnter('top')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: !isOn ? 'pointer' : 'default' }}
        />

        {/* Bottom clickable area (visible when switch is ON) */}
        <rect
          x="15"
          y="60"
          width="30"
          height="50"
          rx="15"
          className={`toggle-clickable-area ${hoverSide === 'bottom' ? 'hover' : ''}`}
          onClick={() => handleClick('bottom')}
          onMouseEnter={() => handleMouseEnter('bottom')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isOn ? 'pointer' : 'default' }}
        />

        {/* ON label (top) */}
        <text
          x="30"
          y="33"
          className="toggle-text"
          fill={isOn ? '#fff' : '#666'}
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          1
        </text>

        {/* OFF label (bottom) */}
        <text
          x="30"
          y="93"
          className="toggle-text"
          fill={isOn ? '#666' : '#fff'}
          fontSize="11"
          fontWeight="bold"
          textAnchor="middle"
        >
          0
        </text>

        {/* Toggle knob/handle (moves vertically) */}
        <circle
          cx="30"
          cy={isOn ? 35 : 85}
          r="18"
          className={`toggle-knob ${hoverSide ? 'preview' : ''}`}
          style={{
            '--preview-offset': hoverSide ? (isOn ? '20' : '-20') : '0'
          }}
        />

        {/* Inner knob highlight for 3D effect */}
        <circle
          cx="30"
          cy={isOn ? 32 : 82}
          r="10"
          className={`toggle-knob-highlight ${hoverSide ? 'preview' : ''}`}
          style={{
            '--preview-offset': hoverSide ? (isOn ? '20' : '-20') : '0'
          }}
        />
      </svg>
    </div>
  );
};

export default ToggleSwitch;
