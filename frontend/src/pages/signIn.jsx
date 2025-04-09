import { useState } from 'react';
import './SignInPage.css';
import Navbar from '../components/navBar.jsx';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Attempting to sign in with:', email);
  };

  return (
    <div className="page-container">
      <div className="signin-page">
        <Navbar />
        <div className="top-section">
          <div className="page-title">Sign in Page</div>
        </div>
        
        <nav className="navbar">
          <div className="nav-spacer"></div>
          <a href="#about" className="nav-link">About</a>
          <a href="#login" className="nav-link">Login</a>
          <a href="#register" className="nav-link">Register</a>
        </nav>
        
        <div className="content-container">
          <div className="form-section">
            <h1 className="welcome-heading">Welcome</h1>
            <p className="signin-subheading">Sign in to your account</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Researcher@ntnu.no"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="form-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••••••"
                />
              </div>
              
              <div className="form-actions">
                <button type="submit" className="signin-button">Sign in</button>
                <a href="#forgot-password" className="forgot-password">Forgot password?</a>
              </div>
            </form>
          </div>
          
          <div className="illustration-section">
            <img 
              src="/signin-illustration.svg" 
              alt="Person entering door illustration" 
              className="signin-illustration" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;