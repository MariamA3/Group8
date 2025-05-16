import { createContext, useState, useEffect } from 'react';

// Predefined example users
// const exampleUsers = [
//   {
//     email: "researcher@ntnu.no",
//     password: "password123",
//     name: "Test Researcher",
//     role: "researcher"
//   },
//   {
//     email: "admin@example.com",
//     password: "admin123",
//     name: "Admin User",
//     role: "admin"
//   }
// ];

export const AuthContext = createContext();

// Create a provider component.
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Called on login.
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        return { success: true };
      } else {
        const error = await res.json();
        return { success: false, error: error.message || 'Login failed' };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Called on logout.
  const logout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      setIsLoggedIn(false);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/me', { credentials: 'include' });
      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
