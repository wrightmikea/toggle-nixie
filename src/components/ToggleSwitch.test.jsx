import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ToggleSwitch from './ToggleSwitch'

describe('ToggleSwitch', () => {
  it('renders with correct label', () => {
    const onToggle = vi.fn()
    render(<ToggleSwitch value={8} isOn={false} onToggle={onToggle} />)
    expect(screen.getByText('8')).toBeInTheDocument()
  })

  it('displays OFF state correctly', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <ToggleSwitch value={4} isOn={false} onToggle={onToggle} />
    )
    const track = container.querySelector('.toggle-track')
    expect(track).toHaveClass('off')
  })

  it('displays ON state correctly', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <ToggleSwitch value={2} isOn={true} onToggle={onToggle} />
    )
    const track = container.querySelector('.toggle-track')
    expect(track).toHaveClass('on')
  })

  it('calls onToggle when clicking opposite side (OFF to ON)', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <ToggleSwitch value={1} isOn={false} onToggle={onToggle} />
    )

    // When OFF, clicking the right side should toggle
    const clickableAreas = container.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[1]) // Right side

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('calls onToggle when clicking opposite side (ON to OFF)', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <ToggleSwitch value={8} isOn={true} onToggle={onToggle} />
    )

    // When ON, clicking the left side should toggle
    const clickableAreas = container.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[0]) // Left side

    expect(onToggle).toHaveBeenCalledTimes(1)
  })

  it('does not toggle when clicking the current side (OFF)', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <ToggleSwitch value={4} isOn={false} onToggle={onToggle} />
    )

    // When OFF, clicking the left side should NOT toggle
    const clickableAreas = container.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[0]) // Left side

    expect(onToggle).not.toHaveBeenCalled()
  })

  it('does not toggle when clicking the current side (ON)', () => {
    const onToggle = vi.fn()
    const { container } = render(
      <ToggleSwitch value={2} isOn={true} onToggle={onToggle} />
    )

    // When ON, clicking the right side should NOT toggle
    const clickableAreas = container.querySelectorAll('.toggle-clickable-area')
    fireEvent.click(clickableAreas[1]) // Right side

    expect(onToggle).not.toHaveBeenCalled()
  })

  it('has proper aria attributes', () => {
    const onToggle = vi.fn()
    render(<ToggleSwitch value={8} isOn={false} onToggle={onToggle} />)

    const switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')
    expect(switchElement).toHaveAttribute('aria-label', 'Toggle switch for value 8, currently off')
  })

  it('updates aria-checked when state changes', () => {
    const onToggle = vi.fn()
    const { rerender } = render(
      <ToggleSwitch value={4} isOn={false} onToggle={onToggle} />
    )

    let switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'false')

    rerender(<ToggleSwitch value={4} isOn={true} onToggle={onToggle} />)

    switchElement = screen.getByRole('switch')
    expect(switchElement).toHaveAttribute('aria-checked', 'true')
  })
})
