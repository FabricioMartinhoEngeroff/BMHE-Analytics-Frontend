import { createContext, useState, ReactNode } from "react";
import { login as authLogin } from "../services/authService";
import { fetchAuthenticatedUser } from "../services/userService";
import { User } from "../types/User"; // 🔥 Importamos a interface User

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); 

  async function login(email: string, password: string) {
    const data = await authLogin(email, password);
  
    if (data?.token) {
      localStorage.setItem("token", data.token);
  
      try {
        const userData = await fetchAuthenticatedUser(); // 🔥 Agora busca direto do backend
        if (userData) {
          setUser(userData); 
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
