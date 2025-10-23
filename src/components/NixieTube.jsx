import './NixieTube.css';

/**
 * NixieTube Component
 *
 * Displays a hexadecimal digit (0-F) in a retro Nixie tube style
 * with authentic orange-red glow effect and wire-like digits.
 *
 * @param {Object} props
 * @param {number} props.value - Numeric value (0-15) to display as hex
 */
const NixieTube = ({ value }) => {
  // Convert numeric value to hex character (0-9, A-F)
  const hexChar = value.toString(16).toUpperCase();

  // All hex digits
  const allDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  // Position offsets for depth effect (some in front, some behind)
  const digitOffsets = [
    { x: -3, y: -2, z: 0 },   // 0
    { x: 2, y: 1, z: 1 },     // 1
    { x: -1, y: 2, z: -1 },   // 2
    { x: 3, y: -1, z: 0 },    // 3
    { x: -2, y: 1, z: 1 },    // 4
    { x: 1, y: -2, z: -1 },   // 5
    { x: 2, y: 2, z: 0 },     // 6
    { x: -2, y: -1, z: 1 },   // 7
    { x: 0, y: 2, z: -1 },    // 8
    { x: 3, y: 0, z: 0 },     // 9
    { x: -3, y: 1, z: 1 },    // A
    { x: 1, y: -1, z: -1 },   // B
    { x: -1, y: 0, z: 0 },    // C
    { x: 2, y: -2, z: 1 },    // D
    { x: -2, y: 2, z: -1 },   // E
    { x: 0, y: -2, z: 0 }     // F
  ];

  return (
    <div className="nixie-container">
      <svg
        width="200"
        height="280"
        viewBox="0 0 200 280"
        className="nixie-tube"
        aria-label={`Nixie tube displaying hexadecimal ${hexChar}`}
        role="img"
      >
        {/* Define gradient for glass tube */}
        <defs>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 0.9 }} />
            <stop offset="50%" style={{ stopColor: '#2d2d2d', stopOpacity: 0.7 }} />
            <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: 0.9 }} />
          </linearGradient>

          {/* Subtle glow filter for active digit */}
          <filter id="nixieGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Reflection gradient */}
          <linearGradient id="reflection" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 0.3 }} />
            <stop offset="50%" style={{ stopColor: '#ffffff', stopOpacity: 0 }} />
          </linearGradient>
        </defs>

        {/* Tube base/socket */}
        <rect
          x="40"
          y="240"
          width="120"
          height="35"
          rx="5"
          fill="#4a4a4a"
          stroke="#2a2a2a"
          strokeWidth="2"
        />

        {/* Base pins */}
        <rect x="60" y="270" width="8" height="10" fill="#8a8a8a" />
        <rect x="90" y="270" width="8" height="10" fill="#8a8a8a" />
        <rect x="120" y="270" width="8" height="10" fill="#8a8a8a" />

        {/* Glass tube body */}
        <rect
          x="50"
          y="20"
          width="100"
          height="220"
          rx="15"
          fill="url(#glassGradient)"
          stroke="#0a0a0a"
          strokeWidth="3"
          opacity="0.95"
        />

        {/* Inner tube glow/ambiance */}
        <rect
          x="60"
          y="30"
          width="80"
          height="200"
          rx="10"
          fill="#1a0a00"
          opacity="0.8"
        />

        {/* Render all digit wires - first pass (behind active) */}
        {allDigits.map((digit, index) => {
          const offset = digitOffsets[index];
          const isActive = digit === hexChar;

          // Skip active digit in this pass (will draw it later)
          if (isActive || offset.z >= 0) return null;

          return (
            <text
              key={`back-${digit}`}
              x={100 + offset.x}
              y={165 + offset.y}
              className="nixie-digit-wire"
              fontSize="120"
              fontWeight="normal"
              textAnchor="middle"
              fill="none"
              stroke="#444444"
              strokeWidth="0.8"
              opacity="0.3"
            >
              {digit}
            </text>
          );
        })}

        {/* The illuminated digit (active wire) */}
        <text
          x={100 + digitOffsets[value].x}
          y={165 + digitOffsets[value].y}
          className="nixie-digit-active"
          fontSize="120"
          fontWeight="normal"
          textAnchor="middle"
          fill="none"
          stroke="#ff5e00"
          strokeWidth="1.5"
          filter="url(#nixieGlow)"
        >
          {hexChar}
        </text>

        {/* Render remaining digit wires - second pass (in front of active) */}
        {allDigits.map((digit, index) => {
          const offset = digitOffsets[index];
          const isActive = digit === hexChar;

          // Skip active digit and digits already drawn
          if (isActive || offset.z < 0) return null;

          return (
            <text
              key={`front-${digit}`}
              x={100 + offset.x}
              y={165 + offset.y}
              className="nixie-digit-wire"
              fontSize="120"
              fontWeight="normal"
              textAnchor="middle"
              fill="none"
              stroke="#555555"
              strokeWidth="0.8"
              opacity="0.35"
            >
              {digit}
            </text>
          );
        })}

        {/* Glass reflection highlight */}
        <ellipse
          cx="75"
          cy="80"
          rx="15"
          ry="40"
          fill="url(#reflection)"
        />

        {/* Tube cap */}
        <ellipse
          cx="100"
          cy="20"
          rx="50"
          ry="15"
          fill="#2a2a2a"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
      </svg>

      {/* Display label */}
      <div className="nixie-value-label">
        Hex: {hexChar}
      </div>
    </div>
  );
};

export default NixieTube;
