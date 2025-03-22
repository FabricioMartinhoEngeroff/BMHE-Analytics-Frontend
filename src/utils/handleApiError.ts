import axios from "axios";

export function handleApiError(error: unknown, defaultMessage: string): void {
  console.error("🚨 Erro na API:", error);

  let message = defaultMessage;

  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(`❌ Código de status: ${error.response.status}`);
      console.error("📝 Dados da resposta:", error.response.data);
      message = error.response.data?.message || defaultMessage;
    } else if (error.request) {
      console.error("⚠️ Nenhuma resposta recebida do servidor");
    }
  } else if (error instanceof Error) {
    console.error("Erro desconhecido:", error.message);
    message = error.message;
  }

  alert(message);

  throw error;
}