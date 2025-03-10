import { useLoginForm } from "../../hooks/UseLoginForm";
import { Button } from "../../components/loginComponents/Button";
import { FormField } from "../../components/loginComponents/FormField";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  RightPanel,
  LoginBox,
  FormContainer,
  Footer,
} from "../../styles/GlobalStyles";

export function Login() {
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
        <h2>Bem-vindo ao BMHE Analytics</h2>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <FormField
              id="email"
              icon={FaEnvelope}
              type="email"
              placeholder="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <FormField
              id="password"
              icon={FaLock}
              type={passwordVisible ? "text" : "password"}
              placeholder="Senha"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <span
              className="toggle-visibility"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </FormContainer>

          <Button text="Entrar" />
        </form>

        <Footer>
          <span
            onClick={() => window.dispatchEvent(new Event("toggleRegister"))}
            style={{ marginLeft: "5px", color: "#0066cc", cursor: "pointer" }}
          >
            Já tem uma conta? Criar conta.
          </span>
        </Footer>
      </LoginBox>
    </RightPanel>
  );
}
