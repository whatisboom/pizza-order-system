import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Order, OrderForm } from '../types';
import { inputProps, inputWrapperProps } from '../constants';
import { createOrder } from '../api';
import OrderItem from '../components/OrderItem';
import Input from '../components/Input';

export default function Order() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>();

  const [orders, setOrders] = useState<Order[]>([]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response: Order = await createOrder(data);
      setOrders((state) => {
        return [...state, response];
      });
    } catch (e) {
      console.log('create-order', e);
    }
  });

  function deleteCallback(id: number) {
    setOrders((state) => {
      return state.filter((order) => order.Order_ID !== id);
    });
  }

  return (
    <div className='p-6 max-w-2xl'>
      <form className='p-6' onSubmit={onSubmit}>
        <Input
          {...inputProps}
          errors={errors}
          name='Crust'
          register={register}
        />
        <Input
          {...inputProps}
          errors={errors}
          name='Flavor'
          register={register}
        />
        <Input
          {...inputProps}
          errors={errors}
          name='Size'
          register={register}
        />
        <Input
          {...inputProps}
          errors={errors}
          name='Table_No'
          placeholder='Table Number'
          register={register}
        />
        <Link className='float-right py-2' to='/orders'>
          View All Orders
        </Link>
        <div {...inputWrapperProps}>
          <input
            {...inputProps}
            className='bg-green-700 text-white px-6 py-1 rounded'
            type='submit'
            value='Order'
          />
        </div>
      </form>
      <h3>Recent orders:</h3>
      <div>
        {orders.map((order: Order) => {
          return (
            <OrderItem
              key={order.Order_ID}
              item={order}
              deleteCallback={deleteCallback}
            />
          );
        })}
      </div>
    </div>
  );
}
