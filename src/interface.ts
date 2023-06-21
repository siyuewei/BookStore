export interface ICartData {
  id: number;
  amount: number;
  userId: number;
  book: IBook;
}

export interface IBook {
  id: number;
  name: string;
  isbn: string;
  author: string;
  inventory: number;
  sales: number;
  isDelete: boolean;
  description: string;
  price: number;
  image: string;
}

export enum IRole {
  CUSTOMER,
  ADMIN,
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  avatar: string;
  notes: string;
  role: IRole;
  status: boolean;
}

export interface IUserAuth {
  username: string;
  password: string;
}

export interface IOrderItem {
  id: number;
  amount: number;
  isDelete: boolean;
  book: IBook;
}

export interface IOrder {
  id: number;
  orderItems: IOrderItem[];
  purchaseTime: Date;
  totalPrice: number;
  isDelete: boolean;
  user: IUser;
}

export interface IBookAmountPriceForm {
  book: IBook;
  amount: number;
  price: number;
}
