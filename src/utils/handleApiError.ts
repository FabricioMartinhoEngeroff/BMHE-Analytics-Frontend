import axios from "axios";

export function handleApiError(error: unknown, defaultMessage: string) {
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
