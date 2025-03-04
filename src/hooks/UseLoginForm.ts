import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import axios from "axios";
import {
  validateEmail,
  validateCPF,
  validatePhone,
  validatePassword,
  validateEmptyFields,
} from "../utils/validators";

export function useLoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
    password: string | null;
    cpf: string | null;
    telefone: string | null;
    endereco: {
      rua: string | null;
      bairro: string | null;
      cidade: string | null;
      estado: string | null;
      cep: string | null;
    };
  }>({
    name: null,
    email: null,
    password: null,
    cpf: null,
    telefone: null,
    endereco: {
      rua: null,
      bairro: null,
      cidade: null,
      estado: null,
      cep: null,
    },
  });

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    cpf: "",
    telefone: "",
    endereco: { rua: "", bairro: "", cidade: "", estado: "", cep: "" },
  });

  const toggleRegister = () => setIsRegistering((prev) => !prev);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.startsWith("endereco.")) {
        const field = name.split(".")[1];
        return { ...prev, endereco: { ...prev.endereco, [field]: value } };
      }
      return { ...prev, [name]: value };
    });

    let error: string | null = null;
    if (name === "email") error = validateEmail(value);
    if (name === "password") error = validatePassword(value);
    if (name === "cpf") error = validateCPF(value);
    if (name === "telefone") error = validatePhone(value);

    setErrors((prev) => {
      if (name.startsWith("endereco.")) {
        const field = name.split(".")[1];
        return { ...prev, endereco: { ...prev.endereco, [field]: error } };
      }
      return { ...prev, [name]: error };
    });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emptyFieldsError = validateEmptyFields(formData);
    if (emptyFieldsError) {
      alert(`❌ Erro: ${emptyFieldsError}`);
      return;
    }

    const newErrors = {
      name: formData.name ? null : "Nome não pode estar vazio.",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      cpf: validateCPF(formData.cpf),
      telefone: validatePhone(formData.telefone),
      endereco: {
        rua: formData.endereco.rua ? null : "Rua não pode estar vazia.",
        bairro: formData.endereco.bairro ? null : "Bairro não pode estar vazio.",
        cidade: formData.endereco.cidade ? null : "Cidade não pode estar vazia.",
        estado: formData.endereco.estado ? null : "Estado não pode estar vazio.",
        cep: formData.endereco.cep ? null : "CEP não pode estar vazio.",
      },
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== null)) {
      alert("❌ Corrija os erros antes de prosseguir.");
      return;
    }

    try {
      console.log("📤 Enviando dados:", JSON.stringify(formData, null, 2));
      const response = await register(formData);

      if (response.token) {
        localStorage.setItem("token", response.token); 
        alert("✅ Cadastro realizado com sucesso!");
        navigate("/insights"); 
      }
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
    errors,
  };
}
