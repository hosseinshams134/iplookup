import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  background-color: #ff4d4d;
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;
`;

const Toast = ({ message }) => {
  useEffect(() => {
      const toastElement = document.querySelector('.toast-container');
    return;
  }, []);

  return (
    <ToastContainer className="toast-container">
      {message}
    </ToastContainer>
  );
};

export default Toast;
