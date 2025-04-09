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
    </div>
  );
}

export default Navbar;