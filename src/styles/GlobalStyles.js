import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    background-color: ${({ theme }) => theme.colors.light};
    color: ${({ theme }) => theme.colors.dark};
    direction: rtl;
  }

  input, button {
    font-family: ${({ theme }) => theme.fonts.primary};
  }

  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.borderRadius};
    width: 100%;
  }

  button {
    padding: 10px 20px;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius};
    cursor: pointer;
    width: 100%;
  }

  button:disabled {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: not-allowed;
  }
`;