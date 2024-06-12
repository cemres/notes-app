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
  login,
} from "../services/authService";
import api from "../services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
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
        const currentUser = await getCurrentUser(accessToken);
        setUser(currentUser);
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      await login({ email, password });
      const { accessToken } = await refreshToken();
      const currentUser = await getCurrentUser(accessToken);
      setUser(currentUser);
      setIsAuthenticated(true);
      api.defaults.headers.common = {
        Authorization: `Bearer ${accessToken}`,
      };
      navigate("/notes");
    } catch (error) {
      setIsAuthenticated(false);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    await logoutService();
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loginUser, logout, loading, user }}
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
