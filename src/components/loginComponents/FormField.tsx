import { InputField, ErrorText } from "../../styles/GlobalStyles";
import { IconType } from "react-icons";

interface FormFieldProps {
  icon: IconType;
  type: string;
  placeholder: string;
  name: string;
  id: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  autocomplete?: string;
}

export function FormField({
  icon: Icon,
  type,
  placeholder,
  name,
  id,
  value,
  onChange,
  error,
  autocomplete = "off",
}: FormFieldProps) {
  return (
    <div style={{ width: "100%" }}>
      <InputField $hasError={!!error}>
        <Icon />
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          autoComplete={autocomplete}
        />
      </InputField>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
