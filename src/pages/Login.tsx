import styled from "styled-components";
import { useState } from "react";
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaPhone, FaEye, FaEyeSlash, FaMapMarkerAlt } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f8;
  overflow: auto;
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
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const LoginBox = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  background: white;
  font-size: 18px;
  width: 48%;
  box-sizing: border-box;
  position: relative;

  input {
    border: none;
    outline: none;
    flex: 1;
    padding: 8px;
    font-size: 16px;
  }

  svg {
    margin-right: 8px;
    color: #0066cc;
    font-size: 20px;
    cursor: pointer;
  }

  .toggle-visibility {
    position: absolute;
    right: 10px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #0066cc;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #004a99;
  }
`;

const Footer = styled.div`
  margin-top: 15px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  color: #0066cc;
  cursor: pointer;
`;

const LogoText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 10px;
`;

export function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpf, setCpf] = useState("");

  function toggleRegister() {
    setIsRegistering(!isRegistering);
  }

  function togglePasswordVisibility() {
    setPasswordVisible(!passwordVisible);
  }

  function formatCpf(value: string): string {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

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
          <form>
            <FormContainer>
              <InputField>
                <FaEnvelope />
                <input type="email" placeholder="E-mail" />
              </InputField>
              {isRegistering && (
                <>
                  <InputField>
                    <FaUser />
                    <input type="text" placeholder="Usuário" />
                  </InputField>
                  <InputField>
                    <FaIdCard />
                    <input 
                      type="text" 
                      placeholder="CPF" 
                      value={cpf} 
                      onChange={(e) => setCpf(formatCpf(e.target.value))} 
                      maxLength={14}
                    />
                  </InputField>
                  <InputField>
                    <FaPhone />
                    <input type="text" placeholder="Telefone" />
                  </InputField>
                  <InputField>
                    <FaMapMarkerAlt />
                    <input type="text" placeholder="Rua" />
                  </InputField>
                  <InputField>
                    <input type="text" placeholder="Número" />
                  </InputField>
                  <InputField>
                    <input type="text" placeholder="Bairro" />
                  </InputField>
                  <InputField>
                    <input type="text" placeholder="Cidade" />
                  </InputField>
                  <InputField>
                    <input type="text" placeholder="Estado" />
                  </InputField>
                  <InputField>
                    <input type="text" placeholder="CEP" />
                  </InputField>
                </>
              )}
              <InputField>
                <FaLock />
                <input type={passwordVisible ? "text" : "password"} placeholder="Senha" />
                <span className="toggle-visibility" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </InputField>
            </FormContainer>
            <Button>{isRegistering ? "Cadastrar" : "Entrar"}</Button>
          </form>
          <Footer>
            <span onClick={toggleRegister}>{isRegistering ? "Já tem uma conta? Entrar" : "Criar conta"}</span>
          </Footer>
        </LoginBox>
      </RightPanel>
    </Container>
  );
}
