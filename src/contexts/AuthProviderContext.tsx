import { createContext } from "react";

interface AuthContextType {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
