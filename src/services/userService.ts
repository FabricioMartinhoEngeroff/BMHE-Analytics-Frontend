import { api } from "../api/api";
import { handleApiError } from "../utils/handleApiError";
import { User } from "../types/User";

export async function fetchAuthenticatedUser(): Promise<User | null> {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Sessão expirada. Faça login novamente.");
    console.warn("⚠️ Token ausente, redirecionando para login...");
    window.location.href = "/login";
    return null;
  }

  try {
    console.log(`📡 Buscando usuário autenticado: ${api.defaults.baseURL}/users/me`);

    const response = await api.get<User>("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response || !response.data) {
      throw new Error("❌ Resposta inválida do servidor.");
    }

    console.log("✅ Usuário autenticado:", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error, "Erro ao buscar usuário autenticado.");
    return null;
  }
}
