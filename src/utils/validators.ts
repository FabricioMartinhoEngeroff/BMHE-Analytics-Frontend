import validationErrors from "./validationErrors";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cpfRegex = /^\d{11}$/; // Valida apenas 11 dígitos
const phoneRegex = /^\d{10,11}$/; // Valida 10 ou 11 dígitos (DDD + número)
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

export function validateEmail(email: string): string | null {
  if (!email) return validationErrors.required;
  if (!emailRegex.test(email)) return validationErrors.invalidEmail;
  return null;
}

export function validateCPF(cpf: string): string | null {
  if (!cpf) return validationErrors.required;
  const numbers = cpf.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (!cpfRegex.test(numbers)) return validationErrors.invalidCPF;
  // Adicione aqui a lógica de validação de CPF (opcional, se necessário)
  return null;
}

export function validatePhone(phone: string): string | null {
  if (!phone) return validationErrors.required;
  const numbers = phone.replace(/\D/g, ""); // Remove tudo que não é dígito
  if (!phoneRegex.test(numbers)) return validationErrors.invalidPhone;
  // Adicione aqui a lógica de validação de telefone (opcional, se necessário)
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return validationErrors.required;
  if (password.length < 8) return validationErrors.passwordTooShort;
  if (!passwordRegex.test(password)) return validationErrors.invalidPassword;
  return null;
}

export function validateEmptyFields(fields: Record<string, any>): string | null {
  console.log("🔍 Validando campos:", fields); 

  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === "object") {
      const nestedError = validateEmptyFields(value);
      if (nestedError) {
        console.warn(`❌ Erro no campo aninhado: ${key}.${nestedError}`);
        return `${key}.${nestedError}`;
      }
    } else if (!value || !value.trim()) {
      console.warn(`❌ Campo vazio detectado: ${key}`);
      return `${key} - Este campo é obrigatório`;
    }
  }
  console.log("✅ Todos os campos estão preenchidos corretamente.");
  return null;
}
