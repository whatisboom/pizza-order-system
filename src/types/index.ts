export interface LoginForm {
  username: string;
  password: string;
};

export interface OrderForm {
  Crust: string;
  Flavor: string;
  Size: string;
  Table_No: number;
};

export interface Order extends OrderForm {
  Order_ID: number;
}