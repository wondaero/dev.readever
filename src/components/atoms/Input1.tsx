'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const StyledInput = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 16px;
  border: 1px solid #ccc;
  transition: border-color .3s;

  ${(props) =>
    props.hasError &&
    css`
      border-color: red;
    `}

  &:focus {
    outline: none;
    border-color: #0070f3;
  }
`;

const Input = forwardRef<HTMLInputElement, InputProps>(({ hasError, ...props }, ref) => {
  return <StyledInput ref={ref} hasError={hasError} {...props} />;
});

Input.displayName = 'Input';

export default Input;
