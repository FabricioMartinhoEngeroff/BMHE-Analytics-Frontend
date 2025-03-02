import { useLoginForm } from "../hooks/UseLoginForm";
import { Button } from "../components/Button";
import { FormField } from "../components/FormField";

import {
  FaEnvelope,
  FaUser,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
  FaGlobeAmericas,
  FaBuilding,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  Container,
  LeftPanel,
  RightPanel,
  LoginBox,
  FormContainer,
  Row,
  InputField,
  Footer,
  LogoText,
} from "../styles/GlobalStyles";

export function Login() {
  const {
    formData,
    isRegistering,
    passwordVisible,
    toggleRegister,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
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
          <h2>
            {isRegistering ? "Crie sua conta" : "Bem-vindo ao BMHE Analytics"}
          </h2>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              {/* Campos comuns para login e cadastro */}
              <Row>
                <FormField
                  icon={FaEnvelope}
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputField>
                  <FaLock />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Senha minimo 8 caracteres"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="toggle-visibility"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </InputField>
              </Row>

              {isRegistering && (
                <>
                  <Row>
                    <FormField
                      icon={FaUser}
                      type="text"
                      placeholder="Usuário"
                      name="login"
                      value={formData.login}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaPhone}
                      type="text"
                      placeholder="Telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </Row>

                  <Row>
                    <FormField
                      icon={FaIdCard}
                      type="text"
                      placeholder="CPF"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaMapMarkerAlt}
                      type="text"
                      placeholder="Rua"
                      name="endereco.rua"
                      value={formData.endereco.rua}
                      onChange={handleChange}
                    />
                  </Row>

                  <Row>
                    <FormField
                      icon={FaBuilding}
                      type="text"
                      placeholder="Bairro"
                      name="endereco.bairro"
                      value={formData.endereco.bairro}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaCity}
                      type="text"
                      placeholder="Cidade"
                      name="endereco.cidade"
                      value={formData.endereco.cidade}
                      onChange={handleChange}
                    />
                  </Row>

                  <Row>
                    <FormField
                      icon={FaGlobeAmericas}
                      type="text"
                      placeholder="Estado"
                      name="endereco.estado"
                      value={formData.endereco.estado}
                      onChange={handleChange}
                    />
                    <FormField
                      icon={FaBuilding}
                      type="text"
                      placeholder="CEP"
                      name="endereco.cep"
                      value={formData.endereco.cep}
                      onChange={handleChange}
                    />
                  </Row>
                </>
              )}
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
