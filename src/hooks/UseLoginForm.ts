import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import axios from "axios";

export function useLoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    login: "",
    cpf: "",
    telefone: "",
    endereco: { rua: "", bairro: "", cidade: "", estado: "", cep: "" },
  });

  const toggleRegister = () => setIsRegistering((prev) => !prev);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  // 🔹 Função para formatar CPF
  const formatCpf = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
      .slice(0, 14);
  };

  // 🔹 Função para formatar telefone no padrão esperado pelo backend
  const formatPhone = (value: string): string => {
    return value
      .replace(/\D/g, "") // Remove tudo que não for número
      .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona hífen
      .slice(0, 15); // Limita o tamanho máximo
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") formattedValue = formatCpf(value);
    if (name === "telefone") formattedValue = formatPhone(value);

    setFormData((prev) => {
      if (name.startsWith("endereco.")) {
        const field = name.split(".")[1];
        return { ...prev, endereco: { ...prev.endereco, [field]: formattedValue } };
      }
      return { ...prev, [name]: formattedValue };
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 🔹 Validação do campo "estado" para garantir que contenha apenas letras
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.endereco.estado)) {
      alert("O estado deve conter apenas letras. Verifique sua entrada.");
      return;
    }

    try {
      console.log("📤 Enviando dados:", JSON.stringify(formData, null, 2));
      await register(formData);
      alert("✅ Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("❌ Erro no cadastro:", error);
      alert(axios.isAxiosError(error) && error.response ? error.response.data.message : "Erro ao conectar.");
    }
  };

  return {
    formData,
    isRegistering,
    passwordVisible,
    toggleRegister,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
  };
}
