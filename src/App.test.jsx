import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the main heading', () => {
    render(<App />)
    expect(screen.getByText('Interactive Binary Toggle Switches')).toBeInTheDocument()
  })

  it('renders all four toggle switches with correct labels', () => {
    const { container } = render(<App />)
    const toggleLabels = container.querySelectorAll('.toggle-label')
    const labelTexts = Array.from(toggleLabels).map(label => label.textContent)

    expect(labelTexts).toContain('8')
    expect(labelTexts).toContain('4')
    expect(labelTexts).toContain('2')
    expect(labelTexts).toContain('1')
    expect(toggleLabels).toHaveLength(4)
  })

  it('initializes with all switches OFF and hex value 0', () => {
    render(<App />)
    expect(screen.getByText('Hex: 0')).toBeInTheDocument()
  })

  it('displays binary value 0000 initially', () => {
    const { container } = render(<App />)
    const bits = container.querySelectorAll('.binary-value span')

    expect(bits).toHaveLength(4)
    bits.forEach(bit => {
      expect(bit.textContent).toBe('0')
      expect(bit).toHaveClass('bit-off')
    })
  })

  it('updates hex value when switch 1 is toggled', () => {
    const { container } = render(<App />)

    // Find the switch with value 1 and toggle it ON
    const switches = screen.getAllByRole('switch')
    const switch1 = switches.find(sw => sw.getAttribute('aria-label').includes('value 1'))

    // Get clickable areas for this switch
    const clickableAreas = switch1.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[1]) // Click right side to turn ON

    // Check hex value updated to 1
    expect(screen.getByText('Hex: 1')).toBeInTheDocument()
  })

  it('updates hex value when switch 2 is toggled', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')
    const switch2 = switches.find(sw => sw.getAttribute('aria-label').includes('value 2'))

    const clickableAreas = switch2.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[1])

    expect(screen.getByText('Hex: 2')).toBeInTheDocument()
  })

  it('updates hex value when switch 4 is toggled', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')
    const switch4 = switches.find(sw => sw.getAttribute('aria-label').includes('value 4'))

    const clickableAreas = switch4.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[1])

    expect(screen.getByText('Hex: 4')).toBeInTheDocument()
  })

  it('updates hex value when switch 8 is toggled', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')
    const switch8 = switches.find(sw => sw.getAttribute('aria-label').includes('value 8'))

    const clickableAreas = switch8.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[1])

    expect(screen.getByText('Hex: 8')).toBeInTheDocument()
  })

  it('correctly calculates combined hex value (example: 5 = 4+1)', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')

    // Toggle switch 4
    const switch4 = switches.find(sw => sw.getAttribute('aria-label').includes('value 4'))
    const clickableAreas4 = switch4.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas4[1])

    // Toggle switch 1
    const switch1 = switches.find(sw => sw.getAttribute('aria-label').includes('value 1'))
    const clickableAreas1 = switch1.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas1[1])

    // Should display hex 5 (4+1)
    expect(screen.getByText('Hex: 5')).toBeInTheDocument()
  })

  it('correctly calculates hex value F (all switches ON)', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')

    // Toggle all switches ON
    switches.forEach(switchEl => {
      const clickableAreas = switchEl.querySelectorAll('.toggle-clickable-area')
      fireEvent.click(clickableAreas[1]) // Click right side
    })

    // Should display hex F (8+4+2+1 = 15 = F)
    expect(screen.getByText('Hex: F')).toBeInTheDocument()
  })

  it('displays correct binary representation', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')

    // Toggle switches to create binary 1010 (hex A, decimal 10)
    const switch8 = switches.find(sw => sw.getAttribute('aria-label').includes('value 8'))
    const switch2 = switches.find(sw => sw.getAttribute('aria-label').includes('value 2'))

    fireEvent.click(switch8.querySelectorAll('.toggle-clickable-area')[1])
    fireEvent.click(switch2.querySelectorAll('.toggle-clickable-area')[1])

    // Check binary display shows 1010
    const bits = container.querySelectorAll('.binary-value span')
    expect(bits[0].textContent).toBe('1') // 8
    expect(bits[1].textContent).toBe('0') // 4
    expect(bits[2].textContent).toBe('1') // 2
    expect(bits[3].textContent).toBe('0') // 1

    // Verify hex value is A (10)
    expect(screen.getByText('Hex: A')).toBeInTheDocument()
  })

  it('displays correct decimal value', () => {
    const { container } = render(<App />)

    const switches = screen.getAllByRole('switch')

    // Toggle switch 8 and 4 to get decimal 12
    const switch8 = switches.find(sw => sw.getAttribute('aria-label').includes('value 8'))
    const switch4 = switches.find(sw => sw.getAttribute('aria-label').includes('value 4'))

    fireEvent.click(switch8.querySelectorAll('.toggle-clickable-area')[1])
    fireEvent.click(switch4.querySelectorAll('.toggle-clickable-area')[1])

    const decimalValue = container.querySelector('.decimal-value')
    expect(decimalValue.textContent).toBe('12')
  })

  it('renders footer with copyright notice', () => {
    render(<App />)
    expect(screen.getByText(/Copyright.*2025.*Michael A Wright/)).toBeInTheDocument()
    expect(screen.getByText(/MIT License/)).toBeInTheDocument()
  })

  it('renders Nixie tube component', () => {
    const { container } = render(<App />)
    const nixieTube = container.querySelector('.nixie-tube')
    expect(nixieTube).toBeInTheDocument()
  })
})
