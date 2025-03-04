import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }

  body {
    background-color: #e3eefc;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`;

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #e3eefc;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background-color: #e3eefc;
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
  max-width: 1000px;  
  padding: 50px;  
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  text-align: center;
`;


export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
`;

export const InputField = styled.div<{ isError?: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${({ isError }) => (isError ? "red" : "#ccc")};
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
    width: 100%;
  }

  svg {
    margin-right: 8px;
    color: #0066cc;
    font-size: 20px;
  }
`;

export const Footer = styled.div`
  margin-top: 20px; // Increased margin-top
  font-size: 16px;
  display: flex;
  justify-content: center;
  color: #0066cc;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 5px;
  text-align: left;
`;

export const LogoText = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 10px;
`;

export const ToggleText = styled.p`
  font-size: 16px;
  color: #0066cc;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
  &:hover {
    text-decoration: underline;
  }
`;