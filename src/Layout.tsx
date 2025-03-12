import * as React from 'react';
 import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Header.css'; // You can use the same styles from HomePage.css or create a new CSS file

const Layout: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <header className="header">
        <div className="logo-title">
          <img src="/logo.webp" alt="Private Eye Logo" className="logo" />
          <h1 className="title">Private Eye</h1>
        </div>
        <div className="menu-container">
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
          {menuOpen && (
            <div className="dropdown-menu">
              <Link to="/" className="dropdown-link" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/applications" className="dropdown-link" onClick={() => setMenuOpen(false)}>Applications</Link>
              <Link to="/calendar" className="dropdown-link" onClick={() => setMenuOpen(false)}>Calendar</Link>
            </div>
          )}
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;