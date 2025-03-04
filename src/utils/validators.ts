import validationErrors from "./validationErrors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;


export function validateEmail(email: string): string | null {
  if (!email) return validationErrors.required;
  if (!emailRegex.test(email)) return validationErrors.invalidEmail;
  return null;
}


export function validateCPF(cpf: string): string | null {
  if (!cpf) return validationErrors.required;
  if (!cpfRegex.test(cpf)) return validationErrors.invalidCPF;
  return null;
}


export function validatePhone(phone: string): string | null {
  if (!phone) return validationErrors.required;
  if (!phoneRegex.test(phone)) return validationErrors.invalidPhone;
  return null;
}


export function validatePassword(password: string): string | null {
  if (!password) return validationErrors.required;
  if (password.length < 8) return validationErrors.passwordTooShort;
  if (!passwordRegex.test(password)) return validationErrors.invalidPassword;
  return null;
}

export function validateEmptyFields(fields: Record<string, any>): string | null {
    for (const [key, value] of Object.entries(fields)) {
      if (typeof value === "object") {
        const nestedError = validateEmptyFields(value);
        if (nestedError) return `${key}.${nestedError}`;
      } else if (!value.trim()) {
        return `${key} - Este campo é obrigatório`;
      }
    }
    return null;
  }
  
