import { useLoginForm } from "../../hooks/UseLoginForm";
import { Button } from "../../components/loginComponents/Button";
import { FormField } from "../../components/loginComponents/FormField";
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
  RightPanel,
  LoginBox,
  FormContainer,
  Row,
  InputField,
  Footer,
  ErrorText,
} from "../../styles/GlobalStyles";

export function Register() {
  const {
    formData,
    passwordVisible,
    togglePasswordVisibility,
    handleChange,
    handleSubmit,
    errors,
  } = useLoginForm();

  return (
    <RightPanel>
      <LoginBox>
        <h2>Crie sua conta</h2>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <Row>
              <FormField
                icon={FaEnvelope}
                type="email"
                placeholder="E-mail"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors?.email}
              />
              <FormField
                icon={FaUser}
                type="text"
                placeholder="Usuário"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors?.name}
              />
            </Row>
            <Row>
              <FormField
                icon={FaPhone}
                type="text"
                placeholder="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                error={errors?.telefone}
              />
              <FormField
                icon={FaIdCard}
                type="text"
                placeholder="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                error={errors?.cpf}
              />
            </Row>
            <Row>
              <FormField
                icon={FaMapMarkerAlt}
                type="text"
                placeholder="Rua"
                name="endereco.rua"
                value={formData.endereco?.rua}
                onChange={handleChange}
                error={errors?.endereco?.rua}
              />
              <FormField
                icon={FaBuilding}
                type="text"
                placeholder="Bairro"
                name="endereco.bairro"
                value={formData.endereco?.bairro}
                onChange={handleChange}
                error={errors?.endereco?.bairro}
              />
            </Row>
            <Row>
              <FormField
                icon={FaCity}
                type="text"
                placeholder="Cidade"
                name="endereco.cidade"
                value={formData.endereco?.cidade}
                onChange={handleChange}
                error={errors?.endereco?.cidade}
              />
              <FormField
                icon={FaGlobeAmericas}
                type="text"
                placeholder="Estado"
                name="endereco.estado"
                value={formData.endereco?.estado}
                onChange={handleChange}
                error={errors?.endereco?.estado}
              />
            </Row>
            <Row>
              <FormField
                icon={FaBuilding}
                type="text"
                placeholder="CEP"
                name="endereco.cep"
                value={formData.endereco?.cep}
                onChange={handleChange}
                error={errors?.endereco?.cep}
              />
              <InputField isError={!!errors?.password}>
                <FaLock />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Senha"
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
            {errors?.password && <ErrorText>{errors.password}</ErrorText>}
          </FormContainer>
          <Button text="Cadastrar" />
        </form>
        <Footer>
          <span onClick={() => window.dispatchEvent(new Event("toggleRegister"))}>
          Já possui uma conta? Faça login...
          </span>
        </Footer>
      </LoginBox>
    </RightPanel>
  );
}