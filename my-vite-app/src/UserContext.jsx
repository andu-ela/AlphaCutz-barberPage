import React, { createContext, useContext, useState, useEffect } from 'react';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // On initial load, check if a user is stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Restore the user session
    }
  }, []);

  const login = (userData) => {
    setUser(userData); // Set the user data
    localStorage.setItem('user', JSON.stringify(userData)); // Persist the user in localStorage
  };

  const logout = () => {
    setUser(null); // Clear the user state
    localStorage.removeItem('user'); // Remove the user from localStorage
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
