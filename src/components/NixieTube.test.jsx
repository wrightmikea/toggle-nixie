import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NixieTube from './NixieTube'

describe('NixieTube', () => {
  it('renders with value 0', () => {
    render(<NixieTube value={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Hex: 0')).toBeInTheDocument()
  })

  it('renders single digit hex values (1-9)', () => {
    render(<NixieTube value={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('Hex: 5')).toBeInTheDocument()
  })

  it('renders hex letters A-F correctly', () => {
    const testCases = [
      { value: 10, expected: 'A' },
      { value: 11, expected: 'B' },
      { value: 12, expected: 'C' },
      { value: 13, expected: 'D' },
      { value: 14, expected: 'E' },
      { value: 15, expected: 'F' }
    ]

    testCases.forEach(({ value, expected }) => {
      const { unmount } = render(<NixieTube value={value} />)
      expect(screen.getByText(expected)).toBeInTheDocument()
      expect(screen.getByText(`Hex: ${expected}`)).toBeInTheDocument()
      unmount()
    })
  })

  it('has proper aria label', () => {
    render(<NixieTube value={7} />)
    const nixieElement = screen.getByRole('img')
    expect(nixieElement).toHaveAttribute('aria-label', 'Nixie tube displaying hexadecimal 7')
  })

  it('updates aria label for hex letters', () => {
    render(<NixieTube value={15} />)
    const nixieElement = screen.getByRole('img')
    expect(nixieElement).toHaveAttribute('aria-label', 'Nixie tube displaying hexadecimal F')
  })

  it('renders all required SVG elements', () => {
    const { container } = render(<NixieTube value={8} />)

    // Check for SVG
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass('nixie-tube')

    // Check for main digit
    const digit = container.querySelector('.nixie-digit')
    expect(digit).toBeInTheDocument()
    expect(digit.textContent).toBe('8')
  })

  it('handles boundary values correctly', () => {
    // Test minimum value
    const { rerender } = render(<NixieTube value={0} />)
    expect(screen.getByText('Hex: 0')).toBeInTheDocument()

    // Test maximum value
    rerender(<NixieTube value={15} />)
    expect(screen.getByText('Hex: F')).toBeInTheDocument()
  })
})
