import axios from "axios";

export const API_URL = "http://localhost:8091/api";

// 🔹 Configuração global do Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔹 Interface para os dados de registro
interface RegisterUserData {
  login: string;
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

// 🔹 Função de login
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
  } catch (error: unknown) {
    console.error("❌ Erro no login:", error);
    handleApiError(error, "Erro ao realizar login.");
  }
}

// 🔹 Função de cadastro
export async function register(userData: RegisterUserData) {
  try {
    console.log("📤 Enviando dados de cadastro:", userData);

    const response = await api.post("/auth/register", userData);

    if (!response || !response.data) {
      throw new Error("❌ Resposta inválida do servidor.");
    }

    console.log("✅ Cadastro realizado com sucesso:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("❌ Erro no cadastro:", error);
    handleApiError(error, "Erro ao cadastrar usuário.");
  }
}
// 🔹 Função para requisições autenticadas
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    console.warn("⚠️ Token ausente, redirecionando para login...");
    window.location.href = "/login";
    return;
  }

  try {
    console.log(`📡 Fazendo requisição para: ${API_URL}${url}`);

    // Garantindo que os headers sejam compatíveis com Axios
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...((options.headers as Record<string, string>) || {}), // Conversão segura
    };

    const response = await api.get(url, { headers });

    if (!response || !response.data) {
      throw new Error("❌ Resposta inválida do servidor.");
    }

    console.log("✅ Resposta recebida:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("❌ Erro na requisição autenticada:", error);
    handleApiError(error, "Erro ao buscar dados.");
  }
}

// 🔹 Função de tratamento de erro aprimorada
function handleApiError(error: unknown, defaultMessage: string) {
  console.error("🚨 Erro na API:", error);

  if (axios.isAxiosError(error)) {
    console.log("📥 Resposta do servidor:", error.response);

    if (error.response) {
      console.error(`❌ Código de status: ${error.response.status}`);
      console.error("📝 Dados da resposta:", error.response.data);
    } else if (error.request) {
      console.error("⚠️ Nenhuma resposta recebida do servidor");
    }

    alert(error.response?.data?.message || defaultMessage);
  } else if (error instanceof Error) {
    console.error("Erro desconhecido:", error.message);
    alert(error.message || defaultMessage);
  } else {
    alert(defaultMessage);
  }

  throw error;
}

export default register;