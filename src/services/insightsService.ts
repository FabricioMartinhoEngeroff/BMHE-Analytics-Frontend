import { api } from "../api/api"; 

export const getInsightsData = async () => {
  try {
    const response = await api.get("/insights"); 
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar insights:", error);
    return [];
  }
};
