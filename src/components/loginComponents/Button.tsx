import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #0066cc;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-top: 12px;
  cursor: pointer;

  &:hover {
    background-color: #0066cc;
  }
`;

interface ButtonProps {
  text: string;
}

export function Button({ text }: ButtonProps) {
  return <StyledButton>{text}</StyledButton>;
}
