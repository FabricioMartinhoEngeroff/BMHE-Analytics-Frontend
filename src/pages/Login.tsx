import { useLoginForm } from "../hooks/UseLoginForm";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";

// Ícones
import {
  FaEnvelope, FaUser, FaIdCard, FaPhone, 
  FaMapMarkerAlt, FaCity, FaGlobeAmericas, 
  FaBuilding, FaLock, FaEye, FaEyeSlash
} from "react-icons/fa";

// Estilos
import {
  Container, LeftPanel, RightPanel, LoginBox,
  FormContainer, Row, InputField, Footer, LogoText, PasswordHint
} from "../styles/GlobalStyles";

export function Login() {
  const {
    formData, isRegistering, passwordVisible,
    toggleRegister, togglePasswordVisibility,
    handleChange, handleSubmit
  } = useLoginForm();

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

              {/* Campos comuns para Login e Cadastro */}
              <Row>
                <FormField icon={FaEnvelope} type="email" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} />
                <InputField>
                  <FaLock />
                  <input type={passwordVisible ? "text" : "password"} placeholder="Senha" name="password" value={formData.password} onChange={handleChange} />
                  <span className="toggle-visibility" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </InputField>
              </Row>

              {/* Mostrar campos adicionais apenas no Cadastro */}
              {isRegistering && (
                <>
                  {/* Linha 1 */}
                  <Row>
                    <FormField icon={FaUser} type="text" placeholder="Usuário" name="login" value={formData.login} onChange={handleChange} />
                    <FormField icon={FaPhone} type="text" placeholder="Telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
                  </Row>

                  {/* Linha 2 */}
                  <Row>
                    <FormField icon={FaIdCard} type="text" placeholder="CPF" name="cpf" value={formData.cpf} onChange={handleChange} />
                    <FormField icon={FaMapMarkerAlt} type="text" placeholder="Rua" name="endereco.rua" value={formData.endereco.rua} onChange={handleChange} />
                  </Row>

                  {/* Linha 3 */}
                  <Row>
                    <FormField icon={FaBuilding} type="text" placeholder="Bairro" name="endereco.bairro" value={formData.endereco.bairro} onChange={handleChange} />
                    <FormField icon={FaCity} type="text" placeholder="Cidade" name="endereco.cidade" value={formData.endereco.cidade} onChange={handleChange} />
                  </Row>

                  {/* Linha 4 */}
                  <Row>
                    <FormField icon={FaGlobeAmericas} type="text" placeholder="Estado" name="endereco.estado" value={formData.endereco.estado} onChange={handleChange} />
                    <FormField icon={FaBuilding} type="text" placeholder="CEP" name="endereco.cep" value={formData.endereco.cep} onChange={handleChange} />
                  </Row>
                </>
              )}

              {/* Mensagem sobre requisitos de senha */}
              <PasswordHint>
                A senha deve conter pelo menos 8 caracteres, incluindo letras, números e símbolos.
              </PasswordHint>

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
