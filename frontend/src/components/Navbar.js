import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <h2 className="logo">
        Hybrid Speech Emotion Recognition System
      </h2>

      {/* HAMBURGER */}
      <div 
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      {/* LINKS */}
     <div className={`nav-links ${menuOpen ? "active" : ""}`}>
  <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
  <Link to="/record" onClick={() => setMenuOpen(false)}>Record</Link>
  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
  <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
</div>

    </nav>
  );
}

export default Navbar;