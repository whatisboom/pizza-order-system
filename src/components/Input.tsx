import React from 'react';
import { inputProps, inputWrapperProps } from '../constants';
import { FieldErrors } from 'react-hook-form';
import { OrderForm } from '../types';

type InputProps = {
  name: string;
  register: Function;
  errors?: FieldErrors<OrderForm>;
  placeholder?: string;
};

export default function Input({
  register,
  name,
  placeholder,
  errors,
  ...rest
}: InputProps) {
  return (
    <div {...inputWrapperProps}>
      <input
        placeholder={placeholder || name}
        {...register(name, {
          required: { value: true, message: 'This field is required.' },
        })}
        {...inputProps}
        {...rest}
      />
      {/*
      // @ts-ignore */}
      {errors && errors[name]?.message}
    </div>
  );
}
