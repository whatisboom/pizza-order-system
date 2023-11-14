import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './routes/Login';
import Order from './routes/Order';
import Orders from './routes/Orders';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: 'order',
    element: <Order />,
  },
  {
    path: 'orders',
    element: <Orders />,
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
