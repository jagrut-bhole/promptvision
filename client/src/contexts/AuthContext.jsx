import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: false,
  });

  // Check authentication status on mount
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (token && user) {
      setAuth(prev => ({
        ...prev,
        accessToken: token,
        user: user,
        isAuthenticated: true,
      }));
    }
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (auth.accessToken && auth.user) {
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("refreshToken", auth.refreshToken || "");
      localStorage.setItem("user", JSON.stringify(auth.user));
    }
  }, [auth]);

  const login = (tokens, user) => {
    setAuth({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken || null,
      user: user,
      isAuthenticated: true,
    });
    navigate("/home");
  };

  const logout = () => {
    setAuth({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
