# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An interactive React Single Page Application demonstrating graphical toggle switches that control a binary-to-hexadecimal converter with a vintage Nixie tube display. The application showcases SVG-based interactive controls with real-time state synchronization.

## Development Commands

### Development
```bash
npm run dev          # Start development server at http://localhost:5173/
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

### Testing
```bash
npm test                  # Run all unit tests (Vitest)
npm test -- --watch       # Run tests in watch mode
npm run test:ui           # Run tests with Vitest UI
npm run test:coverage     # Generate test coverage report
```

## Architecture

### State Management Pattern
The application uses a centralized state management approach in App.jsx:
- **Single source of truth**: Switch states stored in a single object with binary values as keys (8, 4, 2, 1)
- **Derived state**: Hexadecimal value is calculated from switch states, not stored separately
- **State updates**: Individual switches update via `toggleSwitch(value)` function that spreads previous state

### Component Data Flow
```
App (state owner)
  ├─> ToggleSwitch × 4 (receives: isOn, value, onToggle callback)
  └─> NixieTube (receives: computed hexValue)
```

### Binary-to-Hex Calculation Logic
The hex value (0-15) is computed in App.jsx:47 using binary arithmetic:
```javascript
value = (switches[8] ? 8 : 0) + (switches[4] ? 4 : 0) +
        (switches[2] ? 2 : 0) + (switches[1] ? 1 : 0)
```

### Toggle Switch Interaction Pattern
ToggleSwitch.jsx implements a unique "opposite-side click" interaction:
- Switches only respond to clicks on the **opposite** side of their current state
- When ON (knob on right): only left side is clickable
- When OFF (knob on left): only right side is clickable
- Hover effects only appear on the clickable side
- This logic is in `handleClick` (lines 18-23) and `handleMouseEnter` (lines 25-30)

### SVG-Based Visual Components
All interactive and display elements use inline SVG:
- **ToggleSwitch.jsx**: SVG toggle with clickable areas, labels, and animated knob
- **NixieTube.jsx**: SVG Nixie tube with gradient fills, glow filters, and ghost digits

The NixieTube includes authentic details:
- Glass tube gradient and reflection highlights
- Orange-red glow effect using SVG filters (lines 35-42)
- Ghost digits showing adjacent hex values for depth (lines 106-128)

## Testing Configuration

Tests use Vitest with React Testing Library and jsdom environment. Configuration in vite.config.js:6-11.

Test files follow `.test.jsx` naming convention and are co-located with components:
- src/components/ToggleSwitch.test.jsx
- src/components/NixieTube.test.jsx
- src/App.test.jsx

Test setup in src/setupTests.js imports @testing-library/jest-dom for extended matchers.

## File Structure

```
src/
├── components/
│   ├── ToggleSwitch.jsx      # SVG toggle switch with opposite-side click logic
│   ├── ToggleSwitch.css      # Toggle switch styles and animations
│   ├── NixieTube.jsx         # SVG Nixie tube display with glow effects
│   └── NixieTube.css         # Nixie tube styles including flicker animation
├── App.jsx                   # Main component with state management and layout
├── App.css                   # Application layout and binary display styles
├── main.jsx                  # React root render entry point
├── index.css                 # Global styles and CSS resets
└── setupTests.js             # Test environment configuration
```

## Technology Stack

- **React 18.3** with functional components and hooks (useState)
- **Vite 5.4** for build tooling and dev server
- **Vitest** for unit testing with jsdom
- **SVG** for all visual components (no external graphics libraries)
- **CSS3** for animations, transitions, and gradients
