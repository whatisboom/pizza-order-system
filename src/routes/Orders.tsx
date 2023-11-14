import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api';
import { Order } from '../types';
import OrderItem from '../components/OrderItem';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function doRequest() {
      const response = await getOrders();
      return response;
    }
    doRequest().then((res) => setOrders(res));
  }, []);
  return (
    <div className='flex place-content-center justify-center bg-zinc-800 min-h-screen'>
      {/* <div className='max-w-xl'>
        <Link to='/order'>Back to make another order</Link>
      </div> */}
      <div className='max-w-2xl'>
        {orders.map((order: Order) => {
          return <OrderItem key={order.Order_ID} item={order} />;
        })}
      </div>
    </div>
  );
}
