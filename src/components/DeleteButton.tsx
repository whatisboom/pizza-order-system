import React, { useState } from 'react';
import { deleteOrder } from '../api';

export default function DeleteButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  async function doDelete() {
    if (loading) return;
    setLoading(true);
    try {
      await deleteOrder(id);
    } catch (e) {
      console.log('delete-error', e);
    } finally {
      setLoading(false);
      // remove item?
    }
  }
  return (
    <span
      className='float-right cursor-pointer rounded bg-red-900 text-white px-2 py-1 ml-6'
      onClick={doDelete}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </span>
  );
}
