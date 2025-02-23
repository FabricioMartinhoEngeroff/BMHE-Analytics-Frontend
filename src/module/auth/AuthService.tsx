import axios, { AxiosError } from "axios";

export const API_URL = "http://localhost:8090/api";

// Configuração do axios com headers padrão
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interface para os dados de registro
interface RegisterUserData {
  login: string;
  email: string;
  password: string;
  cpf: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}

// Função de login
export async function login(email: string, password: string) {
  try {
    const response = await api.post("/auth/login", { email, password });

    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, "Erro ao realizar login.");
  }
}

// Função de cadastro
export async function register(userData: RegisterUserData) {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error, "Erro ao cadastrar usuário.");
  }
}

// Função para requisições autenticadas
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    window.location.href = "/login";
    return;
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${API_URL}${url}`, { ...options, headers });

    if (response.status === 401) {
      alert("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    return await response.json();
  } catch (error: unknown) {
    handleApiError(error, "Erro ao buscar dados.");
  }
}


function handleApiError(error: unknown, defaultMessage: string) {
  if (error instanceof AxiosError) {
    alert(error.response?.data?.message || defaultMessage);
  } else if (error instanceof Error) {
    alert(error.message || defaultMessage);
  } else {
    alert(defaultMessage);
  }
  throw error;
}

export default register;

