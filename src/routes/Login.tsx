import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoginForm } from '../types';
import { inputProps, inputWrapperProps } from '../constants';
import { auth } from '../api';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await auth(data);
      localStorage.setItem('access_token', response);
      navigate('/order');
    } catch (e) {
      console.log('login-error', e);
    }
  });
  const inputOpt = { required: true };

  return (
    <div className='flex justify-center'>
      <form className='bg-gray-300 m-6 p-6 max-w-md' onSubmit={onSubmit}>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            {...register('username', inputOpt)}
            placeholder='Username'
          />
          {errors?.username && <div>This field is required.</div>}
        </div>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            {...register('password', inputOpt)}
            placeholder='Password'
          />
          {errors?.password && <div>This field is required.</div>}
        </div>
        <div {...inputWrapperProps}>
          <input {...inputProps} className='float-right' type='submit' />
        </div>
      </form>
    </div>
  );
}
