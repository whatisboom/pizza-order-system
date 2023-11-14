import React, { useState } from 'react';
import { deleteOrder } from '../api';

type DeleteButtonProps = {
  id: number;
  callback: Function;
};

export default function DeleteButton({ id, callback }: DeleteButtonProps) {
  const [loading, setLoading] = useState(false);
  async function doDelete() {
    if (loading) return;
    setLoading(true);
    try {
      await deleteOrder(id);
      callback(id);
    } catch (e) {
      console.log('delete-error', e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <button
      className='float-right cursor-pointer rounded bg-red-900 text-white px-6 py-1 ml-6'
      onClick={doDelete}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}
