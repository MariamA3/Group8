import { useState } from 'react';
import './components.css';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <div className="navbar-container">
      <p className="navbar-status">
        {isLoggedIn ? "Navigation - Logged in" : "Navigation - NOT logged in"}
      </p>
      
      <nav className="navbar">
        {!isLoggedIn ? (
          <>
            <a href="#about" className="nav-link">
              About
            </a>
            <a 
              href="#login" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Login
            </a>
            <a href="#register" className="nav-link">
              Register
            </a>
          </>
        ) : (
          <>
            <a href="#dashboard" className="nav-link">
              Dashboard
            </a>
            <a href="#create-study" className="nav-link">
              Create study
            </a>
            <a href="#results" className="nav-link">
              Results
            </a>
            <a 
              href="#logout" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Log out
            </a>
          </>
        )}
      </nav>
      
      {/* For demo purposes - remove in production */}
      <div className="demo-info">
        <p>This component toggles between logged in and not logged in states.</p>
        <p>Click "Login" to see the logged-in navbar, and "Log out" to return to the not-logged-in state.</p>
      </div>
    </div>
  );
}

export default Navbar;