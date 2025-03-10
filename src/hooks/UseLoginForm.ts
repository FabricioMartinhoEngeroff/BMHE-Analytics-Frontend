import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

import {
  validateEmail,
  validateCPF,
  validatePhone,
  validatePassword,
  validateEmptyFields,
} from "../utils/validators";
import type { FormData, FormErrors, Address } from "../types/Form";

// Máscara para telefone: (XX) XXXXX-XXXX
const maskPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

// Máscara para CPF: XXX.XXX.XXX-XX
const maskCPF = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
  if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
  return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
};

export function useLoginForm() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [errors, setErrors] = useState<FormErrors>({
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

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
    cpf: "",
    telefone: "",
    endereco: {
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });

  const toggleRegister = () => setIsRegistering((prev) => !prev);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      let formattedValue = value;
      if (name === "telefone") {
        formattedValue = maskPhone(value);
      } else if (name === "cpf") {
        formattedValue = maskCPF(value);
      }

      setFormData((prev) => {
        if (name.startsWith("endereco.")) {
          const field = name.split(".")[1] as keyof Address;
          return {
            ...prev,
            endereco: {
              ...prev.endereco,
              [field]: formattedValue,
            },
          };
        }
        return { ...prev, [name]: formattedValue } as FormData;
      });

      let error: string | null = null;
      if (name === "email") error = validateEmail(value);
      if (name === "password") error = validatePassword(value);
      if (name === "cpf") error = validateCPF(value.replace(/\D/g, ""));
      if (name === "telefone") error = validatePhone(value.replace(/\D/g, ""));

      setErrors((prev) => {
        if (name.startsWith("endereco.")) {
          const field = name.split(".")[1] as keyof Address;
          return {
            ...prev,
            endereco: {
              ...prev.endereco,
              [field]: error,
            },
          };
        }
        return { ...prev, [name]: error } as FormErrors;
      });
    },
    []
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("🟦 Dados informados no formulário:", formData);

    const emptyFieldsError = validateEmptyFields(formData);
    if (emptyFieldsError) {
        console.error("❌ Campos vazios detectados:", emptyFieldsError);
        alert(`Erro: ${emptyFieldsError}`);
        return;
    }

  
    const newErrors: FormErrors = {
      name: formData.name ? null : "Nome não pode ser vazio",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      cpf: validateCPF(formData.cpf.replace(/\D/g, "")),
      telefone: validatePhone(formData.telefone.replace(/\D/g, "")),
      endereco: {
        rua: formData.endereco.rua ? null : "Rua não pode ser vazio",
        bairro: formData.endereco.bairro ? null : "Bairro não pode ser vazio",
        cidade: formData.endereco.cidade ? null : "Cidade não pode ser vazio",
        estado: formData.endereco.estado ? null : "Estado não pode ser vazio",
        cep: formData.endereco.cep ? null : "CEP não pode ser vazio",
      },
  };
  console.log("🟨 Resultado da validação detalhada:", newErrors);
  
    // Verificar se há erros, incluindo nos subcampos de endereco
    const hasErrors =
      Object.values(newErrors).some((error) => error !== null) ||
      Object.values(newErrors.endereco).some((error) => error !== null);
  
    if (hasErrors) {
      // Collect all error messages into a single alert
      const errorMessages = [
        newErrors.name,
        newErrors.email,
        newErrors.password,
        newErrors.cpf,
        newErrors.telefone,
        newErrors.endereco.rua,
        newErrors.endereco.bairro,
        newErrors.endereco.cidade,
        newErrors.endereco.estado,
        newErrors.endereco.cep,
      ]
        .filter((error) => error !== null)
        .join("\n");
  
      alert(`Corrija os erros antes de continuar:\n${errorMessages}`);
      return;
    }
  
    const payload: FormData = {
      ...formData,
      telefone: formData.telefone.replace(/\D/g, ""), 
      endereco: {
          ...formData.endereco,
          estado: formData.endereco.estado.trim(), 
      }
    };

    try{
  
      console.log("📤 Payload enviado para a API:", payload);
  
      const response = await register(payload);
  
      console.log("📥 Resposta da API:", response);
  
      if (response?.token) {
          localStorage.setItem("token", response.token);
          alert("Cadastro realizado com sucesso!");
          navigate("/insights");
      } else {
          console.warn("⚠️ Resposta sem token:", response);
          alert("Erro ao realizar cadastro. Verifique os dados.");
      }
  } catch (error) {
    console.error("❌ Erro ao se comunicar com a API:", error);
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
