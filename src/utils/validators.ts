import validationErrors from "./validationErrors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{11}$/;
const phoneRegex = /^\d{10,11}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

export function validateEmail(email: string): string | null {
  if (!email) return validationErrors.required;
  if (!emailRegex.test(email)) return validationErrors.invalidEmail;
  return null;
}

export function validateCPF(cpf: string): string | null {
  if (!cpf) return validationErrors.required;
  const numbers = cpf.replace(/\D/g, "");
  if (!cpfRegex.test(numbers)) return validationErrors.invalidCPF;
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return validationErrors.required;
  const numbers = phone.replace(/\D/g, "");
  if (!phoneRegex.test(numbers)) return validationErrors.invalidPhone;
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return validationErrors.required;
  if (password.length < 8) return validationErrors.passwordTooShort;
  if (!passwordRegex.test(password)) return validationErrors.invalidPassword;
  return null;
}

export function validateEmptyFields(fields: Record<string, any>, parentKey = ""): string | null {
  for (const [key, value] of Object.entries(fields)) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      const nestedError = validateEmptyFields(value, fullKey);
      if (nestedError) {
        return nestedError;
      }
    } else if (!value?.trim()) {
      return `${fullKey} - Este campo é obrigatório`;
    }
  }
  return null;
}