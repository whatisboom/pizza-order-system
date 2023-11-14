import { LoginForm, OrderForm } from '../types';

const apiHost = 'https://pizza-api-app.herokuapp.com/api';

export const auth = async (values: LoginForm) => {
  try {
    const {access_token} = await fetch(`${apiHost}/auth`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
    return access_token;
  } catch(e) {
    console.log('api-error', e);
  }
  
}

export const createOrder = async (values: OrderForm) => {
  // I would use an interceptor in a query library
  const access_token = localStorage.getItem('access_token');
  return await fetch(`${apiHost}/orders`, {
    method: 'POST',
    body: JSON.stringify(values, (_k,v) => isNaN(v) ? v : +v),
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${access_token}`
    } as HeadersInit
  }).then(res => res.json());
}

export const getOrders = async () => {
  // I would use an interceptor in a query library
  const access_token = localStorage.getItem('access_token');
  return await fetch(`${apiHost}/orders`, {
    headers: {
      method: 'GET',
      authorization: `Bearer ${access_token}`
    } as HeadersInit
  }).then(res => res.json());
}

export const deleteOrder = async (id: number) => {
  // I would use an interceptor in a query library
  const access_token = localStorage.getItem('access_token');
  return await fetch(`${apiHost}/orders/${id}`, {
    headers: {
      authorization: `Bearer ${access_token}`,
      method: 'DELETE'
    } as HeadersInit
  }).then(res => res.json());
}