// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {

//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="navbar">

//       <h2 className="logo">
//         Hybrid Speech Emotion Recognition System
//       </h2>

//       {/* HAMBURGER */}
//       <div 
//         className="hamburger"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         ☰
//       </div>

//       {/* LINKS */}
//      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//   <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
//   <Link to="/record" onClick={() => setMenuOpen(false)}>Record</Link>
//   <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
//   <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>
// </div>

//     </nav>
//   );
// }

// export default Navbar;

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// function Navbar() {

//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");

//     if (!confirmLogout) return;

//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">

//       <h2 className="logo">
//         Hybrid Speech Emotion Recognition System
//       </h2>

//       {/* HAMBURGER */}
//       <div 
//         className="hamburger"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         ☰
//       </div>

//       {/* LINKS */}
//       <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
//         <Link to="/record" onClick={() => setMenuOpen(false)}>Record</Link>
//         <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
//         <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>

//         {/* LOGOUT BUTTON */}
//         <button 
//           className="logout-btn"
//           onClick={() => {
//             setMenuOpen(false);
//             handleLogout();
//           }}
//         >
//           Logout
//         </button>
//       </div>

//     </nav>
//   );
// }

// export default Navbar;
 

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import "./Navbar.css";

// function Navbar() {

//   const [menuOpen, setMenuOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     const confirm = window.confirm("Are you sure you want to logout?");
    
//     if (!confirm) {
//       toast("Logout cancelled");
//       return;
//     }

//     localStorage.removeItem("user");

//     toast.success("Logged out successfully");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">

//       <h2 className="logo">
//         Hybrid Speech Emotion Recognition System
//       </h2>

//       <div 
//         className="hamburger"
//         onClick={() => setMenuOpen(!menuOpen)}
//       >
//         ☰
//       </div>

//       <div className={`nav-links ${menuOpen ? "active" : ""}`}>
//         <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
//         <Link to="/record" onClick={() => setMenuOpen(false)}>Record</Link>
//         <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
//         <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>

//         <button 
//           className="logout-btn"
//           onClick={() => {
//             setMenuOpen(false);
//             handleLogout();
//           }}
//         >
//           Logout
//         </button>
//       </div>

//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast((t) => (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <span>Are you sure you want to logout?</span>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              toast.dismiss(t.id);
              toast.success("Logged out successfully");
              navigate("/login");
            }}
            style={{
              background: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            Yes
          </button>

          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: "#ccc",
              border: "none",
              padding: "6px 12px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        Hybrid Speech Emotion Recognition System
      </h2>

      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/record" onClick={() => setMenuOpen(false)}>Record</Link>
        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        <Link to="/history" onClick={() => setMenuOpen(false)}>History</Link>

        <button
          className="logout-btn"
          onClick={() => {
            setMenuOpen(false);
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;