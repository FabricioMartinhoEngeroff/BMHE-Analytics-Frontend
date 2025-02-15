import styled from "styled-components";

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
}

export function Input({ type, placeholder }: InputProps) {
  return <InputField type={type} placeholder={placeholder} />;
}
