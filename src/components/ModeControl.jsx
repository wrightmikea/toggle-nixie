import './ModeControl.css';

/**
 * ModeControl Component
 *
 * Floating control box that allows switching between Interactive and Autoincrement modes.
 *
 * @param {Object} props
 * @param {string} props.mode - Current mode ('interactive' or 'autoincrement')
 * @param {Function} props.onModeChange - Callback when mode changes
 */
function ModeControl({ mode, onModeChange }) {
  return (
    <div className="mode-control">
      <div className="mode-control-title">Mode</div>
      <label className="mode-option">
        <input
          type="radio"
          name="mode"
          value="interactive"
          checked={mode === 'interactive'}
          onChange={(e) => onModeChange(e.target.value)}
        />
        <span>Interactive</span>
      </label>
      <label className="mode-option">
        <input
          type="radio"
          name="mode"
          value="autoincrement"
          checked={mode === 'autoincrement'}
          onChange={(e) => onModeChange(e.target.value)}
        />
        <span>Autoincrement</span>
      </label>
    </div>
  );
}

export default ModeControl;
