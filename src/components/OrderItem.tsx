import React from 'react';
import DeleteButton from './DeleteButton';

type OrderItemProps = {
  item: {
    Size: string;
    Flavor: string;
    Crust: string;
    Table_No: number;
    Order_ID: number;
  };
};

export default function OrderItem({
  item: { Size, Crust, Flavor, Table_No, Order_ID },
}: OrderItemProps) {
  return (
    <div className='bg-gray-300 px-6 py-3 my-3 rounded'>
      {Order_ID}: {[Size, Crust, Flavor].join(' ')} for table: {Table_No}{' '}
      <DeleteButton id={Order_ID} />
    </div>
  );
}
