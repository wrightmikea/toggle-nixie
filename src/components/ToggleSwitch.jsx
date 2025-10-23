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
    if ((side === 'left' && isOn) || (side === 'right' && !isOn)) {
      onToggle();
    }
  };

  const handleMouseEnter = (side) => {
    // Only show hover effect on the clickable (opposite) side
    if ((side === 'left' && isOn) || (side === 'right' && !isOn)) {
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
        width="120"
        height="60"
        viewBox="0 0 120 60"
        className="toggle-switch"
        aria-label={`Toggle switch for value ${value}, currently ${isOn ? 'on' : 'off'}`}
        role="switch"
        aria-checked={isOn}
      >
        {/* Switch background track */}
        <rect
          x="10"
          y="15"
          width="100"
          height="30"
          rx="15"
          className={`toggle-track ${isOn ? 'on' : 'off'}`}
        />

        {/* Left clickable area (visible when switch is ON) */}
        <rect
          x="10"
          y="15"
          width="50"
          height="30"
          rx="15"
          className={`toggle-clickable-area ${hoverSide === 'left' ? 'hover' : ''}`}
          onClick={() => handleClick('left')}
          onMouseEnter={() => handleMouseEnter('left')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: isOn ? 'pointer' : 'default' }}
        />

        {/* Right clickable area (visible when switch is OFF) */}
        <rect
          x="60"
          y="15"
          width="50"
          height="30"
          rx="15"
          className={`toggle-clickable-area ${hoverSide === 'right' ? 'hover' : ''}`}
          onClick={() => handleClick('right')}
          onMouseEnter={() => handleMouseEnter('right')}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: !isOn ? 'pointer' : 'default' }}
        />

        {/* OFF label */}
        <text
          x="30"
          y="33"
          className="toggle-text"
          fill={isOn ? '#666' : '#fff'}
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
        >
          OFF
        </text>

        {/* ON label */}
        <text
          x="90"
          y="33"
          className="toggle-text"
          fill={isOn ? '#fff' : '#666'}
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
        >
          ON
        </text>

        {/* Toggle knob/handle */}
        <circle
          cx={isOn ? 85 : 35}
          cy="30"
          r="18"
          className="toggle-knob"
        />

        {/* Inner knob highlight for 3D effect */}
        <circle
          cx={isOn ? 85 : 35}
          cy="27"
          r="10"
          className="toggle-knob-highlight"
        />
      </svg>
    </div>
  );
};

export default ToggleSwitch;
