import { api } from "../api/api";
import { handleApiError } from "../utils/handleApiError";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  telefone: string;
  endereco: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

export async function login(email: string, password: string) {
  try {
    console.log("🔍 Tentando login com:", { email, password });

    const response = await api.post("/auth/login", { email, password });

    if (!response || !response.data) {
      throw new Error("❌ Resposta inválida do servidor.");
    }

    console.log("✅ Login bem-sucedido:", response.data);

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    handleApiError(error, "Erro ao realizar login.");
  }
}

export async function register(userData: RegisterUserData) {
  try {
    console.log("📤 Enviando dados de cadastro:", userData);

    const response = await api.post("/auth/register", userData);

    if (!response || !response.data) {
      throw new Error("❌ Resposta inválida do servidor.");
    }

    console.log("✅ Cadastro realizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro durante o cadastro:", error);
    handleApiError(error, "Erro ao cadastrar usuário.");
  }
}