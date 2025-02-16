export const API_URL = "http://localhost:8090/api";

export async function login(email: string, password: string) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), 
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao autenticar");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error) {
    console.error("Erro de login:", error);
    throw error;
  }
}

export async function register(userData: { 
  login: string;
  email: string;
  password: string;
  cpf: string;
  telefone: string;
  endereco: {
    rua: string;
    numero: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(errorMessage.message || "Erro ao cadastrar usuário");
    }

    alert("Cadastro realizado com sucesso!");
    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    throw error;
  }
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (response.status === 401) {
    alert("Sessão expirada. Faça login novamente.");
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return response.json();
}
