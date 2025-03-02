import { Input } from "./Input";
import { InputField } from "../styles/GlobalStyles";
import { IconType } from "react-icons";

interface FormFieldProps {
  icon: IconType;
  type: string;
  placeholder: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormField({
  icon: Icon,
  type,
  placeholder,
  name,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <InputField>
      <Icon />
      <Input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
    </InputField>
  );
}
