import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService"; 
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 🔹 SECURE FIREBASE INIT
  // We try to get the config from the window object (injected by environment)
  // If not found, we use a dummy config to prevent the app from crashing immediately.
  // In a real app, these values come from process.env
  const firebaseConfig = window.__firebase_config ? JSON.parse(window.__firebase_config) : {
    apiKey: "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV", // Dummy key to prevent crash
    authDomain: "mock-project.firebaseapp.com",
    projectId: "mock-project",
  };

  // Initialize Firebase only if it hasn't been initialized yet
  let app;
  let auth;
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
    // Fallback auth object to prevent 'undefined' errors
    auth = { currentUser: null }; 
  }

  // 🔹 Load user from localStorage & Firebase on app start
  useEffect(() => {
    const initAuth = async () => {
      // 1. Try Firebase Auth (if configured)
      try {
        if (window.__initial_auth_token && auth.currentUser === null) {
           // Only if we have a valid token and a real auth instance
           if(firebaseConfig.apiKey !== "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV") {
              await signInWithCustomToken(auth, window.__initial_auth_token);
           }
        } else if (auth.currentUser === null) {
           // Only sign in anonymously if we have a real config
           if(firebaseConfig.apiKey !== "AIzaSyD-QMOCK-API-KEY-FOR-DEV-ENV") {
              await signInAnonymously(auth);
           }
        }
      } catch (e) {
        console.warn("Firebase auth skipped (using mock/local mode):", e.code);
      }

      // 2. Backend Auth Check (localStorage)
      // This is the critical part for your existing data
      try {
        const storedUser = authService.getCurrentUser();
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem('user'); 
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Firebase listener (only active if auth is real)
    let unsubscribe = () => {};
    if (auth.onAuthStateChanged) {
        unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                // console.log("Firebase User Connected");
            }
        });
    }
    
    return () => unsubscribe();
  }, [auth, firebaseConfig.apiKey]);

  // 🔹 LOGIN (Connects to Backend)
  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      
      if (response.success) {
        const userData = response.data;
        setUser(userData);
        
        const role = userData.role;
        if (role === "admin") navigate("/admin-dashboard");
        else if (role === "instructor") navigate("/instructor-dashboard");
        else navigate("/dashboard");
      }
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // 🔹 SIGNUP (Connects to Backend)
  const register = async (formData) => {
    try {
      const response = await authService.register(formData);
      
      if (response.success) {
        const userData = response.data;

        // Manually save session
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('user', JSON.stringify(userData));
        }
        
        setUser(userData);
        navigate("/dashboard");
      }
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // 🔹 LOGOUT
  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}