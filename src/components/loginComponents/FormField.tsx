import { InputField, ErrorText } from "../../styles/GlobalStyles";
import { IconType } from "react-icons";

interface FormFieldProps {
  icon: IconType;
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

export function FormField({
  icon: Icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  error,
}: FormFieldProps) {
  return (
    <div style={{ width: "100%" }}>
      <InputField isError={!!error}>
        <Icon />
        <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
      </InputField>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}
