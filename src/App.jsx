import { useState } from 'react';
import FourBitView from './components/FourBitView';
import SixteenBitView from './components/SixteenBitView';
import ModeControl from './components/ModeControl';
import './App.css';

// Build information injected at build time
/* global __BUILD_SHA__, __BUILD_TIMESTAMP__, __BUILD_HOST__ */
const BUILD_SHA = typeof __BUILD_SHA__ !== 'undefined' ? __BUILD_SHA__ : 'dev';
const BUILD_TIMESTAMP = typeof __BUILD_TIMESTAMP__ !== 'undefined' ? __BUILD_TIMESTAMP__ : new Date().toISOString();
const BUILD_HOST = typeof __BUILD_HOST__ !== 'undefined' ? __BUILD_HOST__ : 'localhost';

/**
 * Main App Component
 *
 * Provides a tabbed interface to switch between two visualizations:
 * - 4-bit mode: 4 toggle switches controlling 1 Nixie tube (0-F)
 * - 16-bit mode: 16 toggle switches controlling 4 Nixie tubes (0000-FFFF)
 *
 * Supports two modes:
 * - Interactive: Manual toggle control (default)
 * - Autoincrement: Animated counting from 0 to max value
 */
function App() {
  const [activeTab, setActiveTab] = useState('4-bit');
  const [mode, setMode] = useState('interactive');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Binary Toggle Switches</h1>
        <p className="subtitle">
          A React demonstration of graphical interactive controls
        </p>
      </header>

      <nav className="tab-navigation">
        <button
          className={`tab-button ${activeTab === '4-bit' ? 'active' : ''}`}
          onClick={() => setActiveTab('4-bit')}
        >
          4-Bit Mode (Single Digit)
        </button>
        <button
          className={`tab-button ${activeTab === '16-bit' ? 'active' : ''}`}
          onClick={() => setActiveTab('16-bit')}
        >
          16-Bit Mode (Four Digits)
        </button>
      </nav>

      <ModeControl mode={mode} onModeChange={setMode} />

      <main className="app-main">
        {activeTab === '4-bit' ? <FourBitView mode={mode} /> : <SixteenBitView mode={mode} />}
      </main>

      <footer className="app-footer">
        <p>
          Built with React, HTML5, CSS3, and SVG |
          <a
            href="https://github.com/wrightmikea/toggle-nixie"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source
          </a>
        </p>
        <p className="build-info">
          Build: {BUILD_HOST} | {BUILD_SHA} | {new Date(BUILD_TIMESTAMP).toLocaleString()}
        </p>
        <p className="copyright">
          Copyright &copy; 2025 - Michael A Wright | MIT License
        </p>
      </footer>
    </div>
  );
}

export default App;
