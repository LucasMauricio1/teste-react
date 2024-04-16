import React, { InputHTMLAttributes, forwardRef } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  function InputComponent({ type = "text", name = "", ...props }, ref) {

    return (
      <>
        <input type={type} name={name} {...props} ref={ref} />
      </>
    );
  }
);
Input.displayName = 'Input';

export default Input;
