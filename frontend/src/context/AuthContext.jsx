import { createContext, useState, useEffect } from 'react';

// Create the auth context
export const AuthContext = createContext();

// Predefined example users
const exampleUsers = [
  {
    email: "researcher@ntnu.no",
    password: "password123",
    name: "Test Researcher",
    role: "researcher"
  },
  {
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin"
  }
];

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the app loads
  useEffect(() => {
    const checkLoggedIn = () => {
      // Check for saved user in localStorage
      const savedUser = localStorage.getItem('user');
      const token = localStorage.getItem('authToken');
      
      if (token && savedUser) {
        try {
          // Parse the saved user data
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error parsing saved user:', error);
          // Clean up invalid data
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
        }
      }
      
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      // Check if email and password match an example user
      const foundUser = exampleUsers.find(
        user => user.email.toLowerCase() === email.toLowerCase() && 
                user.password === password
      );
      
      if (foundUser) {
        // Create a user object without the password
        const safeUserData = { 
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role
        };
        
        // Generate a mock token (in a real app, this would come from the server)
        const mockToken = `mock-jwt-token-${Date.now()}`;
        
        // Save to localStorage
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('user', JSON.stringify(safeUserData));
        
        // Update state
        setIsLoggedIn(true);
        setUser(safeUserData);
        return { success: true };
      }
      
      return { 
        success: false, 
        error: 'Invalid email or password' 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: 'An error occurred during login' 
      };
    }
  };

  // Logout function
  const logout = () => {
    // Remove data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
  };

  // Register function
  const register = async (userData) => {
    try {
      // Check if email already exists
      const emailExists = exampleUsers.some(
        user => user.email.toLowerCase() === userData.email.toLowerCase()
      );
      
      if (emailExists) {
        return { 
          success: false, 
          error: 'Email already in use' 
        };
      }
      
      // In a real app, you would save this to a database
      // For demo purposes, we'll just create a user object
      const newUser = {
        email: userData.email,
        name: userData.name || 'New User',
        role: 'user'
      };
      
      // Generate a mock token
      const mockToken = `mock-jwt-token-${Date.now()}`;
      
      // Save to localStorage
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setIsLoggedIn(true);
      setUser(newUser);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: 'An error occurred during registration' 
      };
    }
  };

  // Create the context value
  const contextValue = {
    isLoggedIn,
    user,
    loading,
    login,
    logout,
    register,
    // Export example user emails for easy reference in login form
    exampleUserEmails: exampleUsers.map(user => user.email)
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};