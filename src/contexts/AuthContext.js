import React, { createContext, useState, useContext } from 'react';

// Create Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock login function (will connect to backend later)
  const login = async (email, password) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'student@bytegurukul.com' && password === 'password') {
          const userData = {
            id: '1',
            name: 'John Doe',
            email: email,
            role: 'student',
            avatar: '👨‍🎓'
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
        setIsLoading(false);
      }, 1500);
    });
  };

  // Mock register function
  const register = async (userData) => {
    setIsLoading(true);
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now().toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.role === 'student' ? '👨‍🎓' : '👨‍🏫'
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(newUser);
        setIsLoading(false);
      }, 1500);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Check if user is logged in on app start
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}