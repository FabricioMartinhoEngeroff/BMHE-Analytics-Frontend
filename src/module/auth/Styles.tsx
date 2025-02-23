import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #f0f4f8;
  overflow: auto;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background-color: #e1ecf7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`;

export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const LoginBox = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;

export const FormContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 12px;
  background: white;
  font-size: 18px;
  width: 100%;
  box-sizing: border-box;
  position: relative;

  input {
    border: none;
    outline: none;
    flex: 1;
    padding: 8px;
    font-size: 16px;
  }

  svg {
    margin-right: 8px;
    color: #0066cc;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const Footer = styled.div`
  margin-top: 15px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  color: #0066cc;
  cursor: pointer;
`;

export const LogoText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 10px;
`;