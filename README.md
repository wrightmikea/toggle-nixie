# Toggle Nixie

An interactive React Single Page Application (SPA) demonstrating graphical toggle switches that control a binary-to-hexadecimal converter with a vintage Nixie tube display.

![Toggle Nixie Demo](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![Tests](https://img.shields.io/badge/Tests-30%20Passing-green)

## Overview

This proof-of-concept application showcases:
- **Interactive SVG Toggle Switches** - Four beautifully designed switches representing binary values (8, 4, 2, 1)
- **Visual Affordances** - Hover effects on the opposite side of each switch indicating clickable areas
- **Real-time State Management** - React state synchronization across all components
- **Vintage Nixie Tube Display** - SVG-based retro display showing hexadecimal values (0-F)
- **Binary-to-Hex Conversion** - Live demonstration of binary arithmetic

## Features

### Toggle Switches
- Four interactive SVG-based toggle switches
- Labeled with binary place values: **8**, **4**, **2**, **1**
- Click the **opposite side** of the switch to toggle its state
- Smooth animations with CSS transitions
- Hover effects provide visual feedback
- Accessibility features with proper ARIA attributes

### Nixie Tube Display
- Authentic vintage Nixie tube aesthetic
- Orange-red glow effect with subtle flickering animation
- Displays hexadecimal values from **0 to F**
- SVG-based rendering with realistic tube elements
- Ghost digits for depth (simulating real Nixie tubes)

### Binary Display
- Real-time binary representation (4 bits)
- Color-coded bits (green for 1, gray for 0)
- Decimal value display
- All values derived from toggle switch states

## Technology Stack

- **React 18.3** - Modern UI component library
- **Vite 5.4** - Fast build tool and dev server
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **SVG** - Scalable vector graphics for all visual components
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Component testing utilities
- **Playwright (MCP)** - Visual and end-to-end testing

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup

```bash
# Clone the repository
git clone https://github.com/wrightmikea/toggle-nixie.git

# Navigate to the project directory
cd toggle-nixie

# Install dependencies
npm install
```

## Usage

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Running Tests

Run all unit tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

Run tests with UI:

```bash
npm run test:ui
```

Generate test coverage report:

```bash
npm run test:coverage
```

## Project Structure

```
toggle-nixie/
├── src/
│   ├── components/
│   │   ├── ToggleSwitch.jsx       # Toggle switch component
│   │   ├── ToggleSwitch.css       # Toggle switch styles
│   │   ├── ToggleSwitch.test.jsx  # Toggle switch tests
│   │   ├── NixieTube.jsx          # Nixie tube display component
│   │   ├── NixieTube.css          # Nixie tube styles
│   │   └── NixieTube.test.jsx     # Nixie tube tests
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Application styles
│   ├── App.test.jsx               # Application tests
│   ├── main.jsx                   # Application entry point
│   ├── index.css                  # Global styles
│   └── setupTests.js              # Test configuration
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── package.json                   # Project dependencies
├── LICENSE                        # MIT License
└── README.md                      # This file
```

## Component Documentation

### ToggleSwitch Component

**Props:**
- `value` (number): The binary value this switch represents (8, 4, 2, or 1)
- `isOn` (boolean): Current state of the switch
- `onToggle` (function): Callback function when switch is toggled

**Features:**
- SVG-based rendering
- Smooth animations
- Hover effects on clickable areas
- Only toggles when clicking the opposite side
- Accessibility support with ARIA attributes

**Usage:**
```jsx
<ToggleSwitch
  value={8}
  isOn={switches[8]}
  onToggle={() => toggleSwitch(8)}
/>
```

### NixieTube Component

**Props:**
- `value` (number): Numeric value (0-15) to display as hexadecimal

**Features:**
- Displays hex digits 0-9 and A-F
- Authentic Nixie tube styling
- Orange-red glow effect
- Subtle flickering animation
- Ghost digits for visual depth

**Usage:**
```jsx
<NixieTube value={hexValue} />
```

## How It Works

1. **State Management**: The App component maintains state for all four toggle switches in a single object
2. **Derived State**: The hexadecimal value is calculated from the switch states using binary arithmetic
3. **Binary Calculation**: `value = (8×switch8) + (4×switch4) + (2×switch2) + (1×switch1)`
4. **Real-time Updates**: When any switch toggles, React re-renders with the new calculated value
5. **Visual Feedback**: CSS transitions and animations provide smooth visual updates

## Testing

The project includes comprehensive test coverage:

### Unit Tests (30 tests)
- **ToggleSwitch**: 9 tests covering rendering, state, interactions, and accessibility
- **NixieTube**: 7 tests covering hex display, rendering, and SVG elements
- **App**: 14 tests covering integration, state management, and calculations

### Visual Tests (Playwright)
- Initial state verification
- Toggle interaction testing
- Hex value display verification
- Full range testing (0-F)
- Opposite-side click behavior

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Accessibility

- Semantic HTML structure
- ARIA labels and roles for screen readers
- Keyboard navigation support
- High contrast color schemes
- Meaningful alt text and descriptions

## Future Enhancements

Potential improvements for future versions:
- [ ] Keyboard controls (arrow keys, space bar)
- [ ] Multiple Nixie tubes for multi-digit hex display
- [ ] Sound effects for toggle switches
- [ ] Preset patterns (quick set to specific values)
- [ ] Animation speed controls
- [ ] Dark/light theme toggle
- [ ] Export/share functionality
- [ ] Touch gesture support for mobile

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - Copyright (c) 2025 - Michael A Wright

See [LICENSE](LICENSE) file for details.

## Author

**Michael A Wright**

## Acknowledgments

- Inspired by vintage Nixie tube displays from the 1950s-70s
- Built with modern React best practices
- Tested with industry-standard testing tools

---

**Built with React, HTML5, CSS3, and SVG**
