import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import { register } from "../auth/AuthService";
import axios from "axios";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaHome,
  FaCity,
  FaGlobeAmericas,
  FaBuilding,
} from "react-icons/fa";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import {
  Container,
  LeftPanel,
  RightPanel,
  LoginBox,
  FormContainer,
  Column,
  InputField,
  Footer,
  LogoText,
} from "./Styles";

export function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    login: "",
    cpf: "",
    telefone: "",
    endereco: {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: "",
    },
  });

  const toggleRegister = () => setIsRegistering((prev) => !prev);
  const togglePasswordVisibility = () => setPasswordVisible((prev) => !prev);

  // Formatação de CPF
  const formatCpf = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
  };

  // Formatação de telefone
  const formatPhone = (value: string): string => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\(\d{2}\) \d{4,5})(\d)/, "$1-$2");
  };

  // Função para lidar com mudanças nos campos de entrada
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") formattedValue = formatCpf(value);
    if (name === "telefone") formattedValue = formatPhone(value);

    setFormData((prev) => {
      if (name.startsWith("endereco.")) {
        const field = name.split(".")[1];
        return {
          ...prev,
          endereco: { ...prev.endereco, [field]: formattedValue },
        };
      }
      return { ...prev, [name]: formattedValue };
    });
  }, []);

  // Submissão do formulário
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("Enviando dados:", JSON.stringify(formData, null, 2));
      await register(formData);
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para login após cadastro
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.message || "Erro ao cadastrar usuário.");
      } else {
        alert("Erro ao conectar com o servidor. Tente novamente.");
      }
    }
  };

  return (
    <Container>
      <LeftPanel>
        <LogoText>BMHE</LogoText>
        <LogoText>Analytics</LogoText>
        <h2>Seja bem-vindo!</h2>
        <p>Política de Privacidade</p>
      </LeftPanel>
      <RightPanel>
        <LoginBox>
          <h2>{isRegistering ? "Crie sua conta" : "Bem-vindo ao BMHE Analytics"}</h2>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <Column>
                <InputField>
                  <FaEnvelope />
                  <Input type="email" placeholder="E-mail" name="email" onChange={handleChange} />
                </InputField>
                {isRegistering && (
                  <>
                    <InputField>
                      <FaIdCard />
                      <Input type="text" placeholder="CPF" name="cpf" value={formData.cpf} onChange={handleChange} />
                    </InputField>
                    <InputField>
                      <FaMapMarkerAlt />
                      <Input type="text" placeholder="Rua" name="endereco.rua" onChange={handleChange} />
                    </InputField>
                    <InputField>
                      <FaCity />
                      <Input type="text" placeholder="Cidade" name="endereco.cidade" onChange={handleChange} />
                    </InputField>
                    <InputField>
                      <FaBuilding />
                      <Input type="text" placeholder="CEP" name="endereco.cep" onChange={handleChange} />
                    </InputField>
                  </>
                )}
              </Column>

              <Column>
                {isRegistering && (
                  <>
                    <InputField>
                      <FaUser />
                      <Input type="text" placeholder="Usuário" name="login" onChange={handleChange} />
                    </InputField>
                    <InputField>
                      <FaPhone />
                      <Input type="text" placeholder="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                    </InputField>
                    <InputField>
                      <FaHome />
                      <Input type="text" placeholder="Número" name="endereco.numero" onChange={handleChange} />
                    </InputField>
                    <InputField>
                      <FaGlobeAmericas />
                      <Input type="text" placeholder="Estado" name="endereco.estado" onChange={handleChange} />
                    </InputField>
                  </>
                )}
                <InputField>
                  <FaLock />
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Senha"
                    name="password"
                    onChange={handleChange}
                  />
                  <span className="toggle-visibility" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </InputField>
              </Column>
            </FormContainer>
            <Button text={isRegistering ? "Cadastrar" : "Entrar"} />
          </form>
          <Footer>
            <span onClick={toggleRegister}>
              {isRegistering ? "Já tem uma conta? Entrar" : "Criar conta"}
            </span>
          </Footer>
        </LoginBox>
      </RightPanel>
    </Container>
  );
}