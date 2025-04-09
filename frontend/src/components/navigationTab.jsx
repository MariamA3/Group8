import { useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <p className="text-gray-400 mb-2">
        {isLoggedIn ? "Navigation - Logged in" : "Navigation - NOT logged in"}
      </p>
      
      <nav className="bg-blue-500 py-4 px-6 flex justify-end items-center space-x-8">
        {!isLoggedIn ? (
          <>
            <a href="#about" className="text-white font-medium hover:text-gray-200">
              About
            </a>
            <a 
              href="#login" 
              className="text-white font-medium hover:text-gray-200"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Login
            </a>
            <a href="#register" className="text-white font-medium hover:text-gray-200">
              Register
            </a>
          </>
        ) : (
          <>
            <a href="#dashboard" className="text-white font-medium hover:text-gray-200">
              Dashboard
            </a>
            <a href="#create-study" className="text-white font-medium hover:text-gray-200">
              Create study
            </a>
            <a href="#results" className="text-white font-medium hover:text-gray-200">
              Results
            </a>
            <a 
              href="#logout" 
              className="text-white font-medium hover:text-gray-200"
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
      
      {/* For demo purposes */}
      <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-100">
        <p>This component toggles between logged in and not logged in states.</p>
        <p>Click "Login" to see the logged-in navbar, and "Log out" to return to the not-logged-in state.</p>
      </div>
    </div>
  );
}