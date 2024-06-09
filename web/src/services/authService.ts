import { AxiosResponse } from "axios";
import api from "./api";

export interface UserData {
  id?: string;
  username: string;
  email: string;
  password?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export const signup = (userData: UserData): Promise<AxiosResponse<UserData>> =>
  api.post("/users", userData);

export const getCurrentUser = (): Promise<UserData> =>
  api
    .get<UserData>("/users/current-user")
    .then((response: AxiosResponse<UserData>) => response.data);

export const login = (credentials: LoginCredentials): Promise<TokenData> =>
  api
    .post("/auth/login", credentials)
    .then((response: AxiosResponse<TokenData>) => response.data);

export const logout = (): Promise<void> => api.delete("/auth/refresh-token");

export const refreshToken = (): Promise<TokenData> =>
  api
    .get<TokenData>("/auth/refresh-token")
    .then((response: AxiosResponse<TokenData>) => response.data);
