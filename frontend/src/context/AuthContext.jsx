import { createContext, useState, useEffect } from 'react';

// Create the auth context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkLoggedIn = () => {
      // Check for saved token in localStorage
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // In a real app, you would validate the token here
        setIsLoggedIn(true);
        // Fetch user data using the token
        // setUser(userData);
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Call your API here
      // const response = await api.login(email, password);
      
      // For demo purposes:
      if (email && password) {
        // Mock successful login
        const mockToken = 'mock-jwt-token';
        const mockUser = { email, name: 'User' };
        
        // Save to localStorage
        localStorage.setItem('authToken', mockToken);
        
        // Update state
        setIsLoggedIn(true);
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
  };

  // Register function
  const register = async (userData) => {
    try {
      // Call your API here
      // const response = await api.register(userData);
      
      // For demo purposes:
      const mockToken = 'mock-jwt-token';
      const mockUser = { 
        email: userData.email, 
        name: userData.name || 'New User' 
      };
      
      // Save to localStorage
      localStorage.setItem('authToken', mockToken);
      
      // Update state
      setIsLoggedIn(true);
      setUser(mockUser);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  // Create the context value
  const contextValue = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};