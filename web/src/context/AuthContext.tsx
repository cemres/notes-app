import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  refreshToken,
  logout as logoutService,
  UserData,
  getCurrentUser,
} from "../services/authService";

import api from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
  user: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { accessToken } = await refreshToken();
        setIsAuthenticated(true);
        api.defaults.headers.common = {
          Authorization: `Bearer ${accessToken}`,
        };
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(true);
    navigate("/notes");
  };

  const logout = async () => {
    await logoutService();
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
