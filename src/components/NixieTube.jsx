import './NixieTube.css';

/**
 * NixieTube Component
 *
 * Displays a hexadecimal digit (0-F) in a retro Nixie tube style
 * with authentic orange-red glow effect.
 *
 * @param {Object} props
 * @param {number} props.value - Numeric value (0-15) to display as hex
 */
const NixieTube = ({ value }) => {
  // Convert numeric value to hex character (0-9, A-F)
  const hexChar = value.toString(16).toUpperCase();

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

          {/* Glow filter for the digit */}
          <filter id="nixieGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
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

        {/* The illuminated digit */}
        <text
          x="100"
          y="165"
          className="nixie-digit"
          fontSize="120"
          fontWeight="bold"
          textAnchor="middle"
          fill="#ff4500"
          filter="url(#nixieGlow)"
        >
          {hexChar}
        </text>

        {/* Secondary ghost digits for depth (common in real Nixie tubes) */}
        <text
          x="100"
          y="165"
          fontSize="120"
          fontWeight="bold"
          textAnchor="middle"
          fill="#ff6a33"
          opacity="0.15"
        >
          {(value + 1) % 16 === 10 ? 'A' : ((value + 1) % 16).toString(16).toUpperCase()}
        </text>
        <text
          x="100"
          y="165"
          fontSize="120"
          fontWeight="bold"
          textAnchor="middle"
          fill="#ff6a33"
          opacity="0.1"
        >
          {(value + 2) % 16 === 10 ? 'A' : ((value + 2) % 16).toString(16).toUpperCase()}
        </text>

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
