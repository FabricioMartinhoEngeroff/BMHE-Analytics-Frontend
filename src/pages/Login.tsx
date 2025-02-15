import styled from "styled-components";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { login, register } from "../services/api";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f8;
`;

const LeftPanel = styled.div`
  flex: 1;
  background-color: #e1ecf7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
  min-width: 50%;
  height: 100vh;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  min-width: 50%;
  height: 100vh;
`;

const LoginBox = styled.div`
  width: 400px;
  padding: 40px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 12px;
  margin: 12px 0;
  background: white;
  font-size: 18px;

  input {
    border: none;
    outline: none;
    flex: 1;
    padding: 8px;
    font-size: 18px;
  }

  svg {
    margin-right: 10px;
    color: #0066cc;
    font-size: 20px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0066cc;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #004a99;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  color: #0066cc;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 10px;
  text-align: center;
  line-height: 1.2;
`;

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      if (isRegistering) {
        await register({ login: username, email, password, roles: ["USER"] });
        alert("Cadastro realizado com sucesso!");
        setIsRegistering(false);
      } else {
        const data = await login(email, password);
        localStorage.setItem("token", data.token);
        alert("Login bem-sucedido!");
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Erro ao processar solicitação!");
      }
    }
  }

  function toggleRegister() {
    setIsRegistering(!isRegistering);
  }

  return (
    <Container>
      <LeftPanel>
        <LogoText>
          BMHE
          <br />
          Analytics
        </LogoText>
        <h2>Seja bem-vindo!</h2>
        <p>Política de Privacidade</p>
      </LeftPanel>
      <RightPanel>
        <LoginBox>
          <h2>
            {isRegistering ? "Crie sua conta" : "Bem-vindo ao BMHE Analytics"}
          </h2>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <InputField>
              <FaEnvelope />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputField>
            {isRegistering && (
              <InputField>
                <FaUser />
                <input
                  type="text"
                  placeholder="Usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputField>
            )}
            <InputField>
              <FaLock />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputField>
            <Button type="submit">
              {isRegistering ? "Cadastrar" : "Entrar"}
            </Button>
          </form>
          <Footer>
            <label>
              <input type="checkbox" /> Lembrar-me
            </label>
            <span onClick={toggleRegister}>
              {isRegistering ? "Já tem uma conta? Entrar" : "Criar conta"}
            </span>
          </Footer>
        </LoginBox>
      </RightPanel>
    </Container>
  );
}
