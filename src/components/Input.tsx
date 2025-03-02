import styled from "styled-components";
import { ChangeEvent } from "react";

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

interface InputProps {
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  type,
  placeholder,
  name,
  value,
  onChange,
}: InputProps) {
  return (
    <InputField
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}
