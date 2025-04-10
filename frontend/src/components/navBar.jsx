import { useState, useContext } from 'react';
import './components.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  // Use context instead of local state for authentication
  const { isLoggedIn, login, logout } = useContext(AuthContext);
  
  return (
    <div className="navbar-container">
      <nav className="navbar">
        {!isLoggedIn ? (
          <>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/create-study" className="nav-link">
              Create study
            </Link>
            <Link to="/results" className="nav-link">
              Results
            </Link>
            <Link 
              to="/"
              className="nav-link"
              onClick={(e) => {
                // Allow navigation but also handle logout
                logout();
              }}
            >
              Log out
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
