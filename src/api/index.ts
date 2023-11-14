import { LoginForm, OrderForm } from '../types';

const apiHost = 'https://pizza-api-app.herokuapp.com/api';

export const auth = async (values: LoginForm) => {
  const response = await fetch(`${apiHost}/auth`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'content-type': 'application/json'
    }
  })
  const { access_token } = await response.json();
  return access_token;
}

export const createOrder = async (values: OrderForm) => {
  // I would use an interceptor in a query library
  const access_token = localStorage.getItem('access_token');
  const response = await fetch(`${apiHost}/orders`, {
    method: 'POST',
    body: JSON.stringify(values, (_k,v) => isNaN(v) ? v : +v),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${access_token}`
    } as HeadersInit
  });
  const data = await response.json();
  return data;
}

export const getOrders = async () => {
  // I would use an interceptor in a query library
  const access_token = localStorage.getItem('access_token');
  const response = await fetch(`${apiHost}/orders`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${access_token}`
    } as HeadersInit
  });
  const data = await response.json();
  return data;
}

export const deleteOrder = async (id: number) => {
  // I would use an interceptor in a query library
  const access_token = localStorage.getItem('access_token');
  const response = await fetch(`${apiHost}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${access_token}`
    } as HeadersInit
  });
  const data = await response.json();
  return data;
}