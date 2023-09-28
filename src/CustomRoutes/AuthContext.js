// AuthContext.js (Create an AuthContext)
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    // Perform authentication logic here, e.g., API call or setting a token
    // If authentication is successful, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const logout = () => {
    // Perform logout logic here, e.g., clearing tokens
    // Set isLoggedIn to false
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
