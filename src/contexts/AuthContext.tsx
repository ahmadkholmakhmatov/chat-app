import React, { createContext, useState, useContext } from "react";
import api from "../utils/api";

interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(
    () => localStorage.getItem("username") || null
  );

  const login = async (username: string, password: string) => {
    try {
      const response = await api.post("/login/", {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("authToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", username);

      setUser(username);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
