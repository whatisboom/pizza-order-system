import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api';
import { Order } from '../types';
import OrderItem from '../components/OrderItem';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    async function doRequest() {
      const response = await getOrders();
      return response;
    }
    doRequest().then((res) => setOrders(res));
  }, []);

  const filteredOrders: Order[] = orders.filter((order) => {
    if (!filter) return orders;
    const pattern = new RegExp(filter.toLowerCase());
    const keys = Object.keys(order);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key === 'Timestamp') return false;
      // @ts-ignore
      const value = order[key];
      if (pattern.test(String(value).toLowerCase())) {
        return true;
      }
    }
    return false;
  });

  function deleteCallback(id: number) {
    setOrders((state) => {
      return state.filter((order) => order.Order_ID !== id);
    });
  }

  return (
    <>
      <div className='pl-6'>
        <Link to='/order'>Back to make another order</Link>
      </div>
      <div>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          placeholder='Search'
          value={filter}
        />
        <input type='button' onClick={() => setFilter('')} value='Clear' />
        <div className=''>
          {filteredOrders.map((order: Order) => {
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
    </>
  );
}
