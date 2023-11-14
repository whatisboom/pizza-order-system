import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { OrderForm } from '../types';
import { inputProps, inputWrapperProps } from '../constants';
import { createOrder } from '../api';

export default function Order() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>();

  const [orders, setOrders] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createOrder(data);
      console.log(response);
      setOrders((state) => {
        console.log(state);
        return [];
      });
    } catch (e) {
      console.log('create-order', e);
    }
  });
  const inputOpt = { required: true };

  useEffect(() => {
    console.log(orders);
  }, [orders.length]);

  return (
    <div className='flex justify-center'>
      <form className='bg-gray-300 m-6 p-6 max-w-2xl' onSubmit={onSubmit}>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            {...register('Crust', inputOpt)}
            placeholder='Crust'
          />
          {errors?.Crust && <div>This field is required.</div>}
        </div>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            {...register('Flavor', inputOpt)}
            placeholder='Flavor'
          />
          {errors?.Flavor && <div>This field is required.</div>}
        </div>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            {...register('Size', inputOpt)}
            placeholder='Size'
          />
          {errors?.Size && <div>This field is required.</div>}
        </div>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            {...register('Table_No', inputOpt)}
            placeholder='Table Number'
          />
          {errors?.Table_No && <div>This field is required.</div>}
        </div>
        <Link className='float-left py-2' to='/orders'>
          View All Orders
        </Link>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            className='float-right'
            type='submit'
            value='Order'
          />
        </div>
      </form>
    </div>
  );
}
