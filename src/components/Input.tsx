import React from 'react';
import { inputProps, inputWrapperProps } from '../constants';

type InputProps = {
  name: string;
  placeholder: string;
  error?: object;
};

export default function Input({ error, ...props }: InputProps) {
  const { register } = useForm;
  return (
    <div {...inputWrapperProps}>
      <input {...inputProps} {...props} {...register('username', inputOpt)} />
      {error && <div>This field is required.</div>}
    </div>
  );
}
