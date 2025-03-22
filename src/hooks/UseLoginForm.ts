import { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { handleApiError } from "../utils/handleApiError";

import {
  validateEmail,
  validateCPF,
  validatePhone,
  validatePassword,
  validateEmptyFields,
} from "../utils/validators";
import type { FormData, FormErrors, Address } from "../types/Form";

const maskPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
};

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

      const formattedValue =
        name === "telefone"
          ? maskPhone(value)
          : name === "cpf"
          ? maskCPF(value)
          : value;

      setFormData((prev) => {
        if (name.startsWith("endereco.")) {
          const field = name.split(".")[1] as keyof Address;
          return {
            ...prev,
            endereco: { ...prev.endereco, [field]: formattedValue },
          };
        }
        return { ...prev, [name]: formattedValue };
      });

      setErrors((prev) => {
        let error: string | null = null;
        if (name === "email") error = validateEmail(value);
        else if (name === "password") error = validatePassword(value);
        else if (name === "cpf") error = validateCPF(value.replace(/\D/g, ""));
        else if (name === "telefone") error = validatePhone(value.replace(/\D/g, ""));

        if (name.startsWith("endereco.")) {
          const field = name.split(".")[1] as keyof Address;
          return {
            ...prev,
            endereco: { ...prev.endereco, [field]: error },
          };
        }

        return { ...prev, [name]: error };
      });
    },
    []
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emptyFieldsError = validateEmptyFields(formData);
    if (emptyFieldsError) {
      handleApiError(new Error(emptyFieldsError), "Corrija os campos obrigatórios vazios.");
      return;
    }

    try {
      const response = await register(formData);

      if (response?.token) {
        localStorage.setItem("token", response.token);
        navigate("/insights");
      } else {
        handleApiError(new Error("Token não retornado."), "Erro ao realizar cadastro. Verifique os dados.");
      }
    } catch (error) {
      handleApiError(error, "Erro ao realizar cadastro, tente novamente.");
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