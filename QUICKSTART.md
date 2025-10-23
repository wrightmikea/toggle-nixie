# Quick Start Guide

Get up and running with React Toggles in under 2 minutes!

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

## How to Use

1. **Click Toggle Switches**: Click on the **opposite side** of any toggle to change its state
   - When switch is OFF (left), click the **right side** to turn ON
   - When switch is ON (right), click the **left side** to turn OFF

2. **Watch the Display**: The Nixie tube automatically updates to show the hex value (0-F)

3. **Binary Calculation**:
   - Each switch represents a binary digit (8, 4, 2, 1)
   - Sum of ON switches = Decimal value = Hex value

## Examples

| Switches (8-4-2-1) | Binary | Decimal | Hex |
|-------------------|--------|---------|-----|
| OFF-OFF-OFF-OFF   | 0000   | 0       | 0   |
| OFF-OFF-OFF-ON    | 0001   | 1       | 1   |
| OFF-ON-OFF-ON     | 0101   | 5       | 5   |
| ON-OFF-ON-OFF     | 1010   | 10      | A   |
| ON-ON-ON-ON       | 1111   | 15      | F   |

## Run Tests

```bash
npm test
```

## Build for Production

```bash
npm run build
npm run preview
```

Enjoy exploring binary-to-hex conversion!
