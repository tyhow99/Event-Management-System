import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (workerId, password) => {
    // Implement logic to authenticate user
    const response = await auth.login(workerId, password);
    if (response) {
      setUser(response.user);
    }
  };

  const logout = () => {
    setUser(null);
    auth.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
