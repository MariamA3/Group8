import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx'
import './styles/components.css';
import logo from '/logo-l.png';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="Evalio logo" className="navbar-logo" />
        </Link>
        <div className="nav-links">
          {!isLoggedIn ? (
            <>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/create-study" className="nav-link">Create study</Link>
              <Link to="/results" className="nav-link">Results</Link>
              <Link to="/" className="nav-link" onClick={logout}>Log out</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
