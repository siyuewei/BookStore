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
  description: string;
  price: number;
  image: string;
}

export interface IUser {
  id: number;
  username: String;
  password: String;
  email: String;
  avatar: String;
  notes: String;
}

export interface IUserAuth {
  username: String;
  password: String;
}

export interface IOrderItem {
  id: number;
  amount: number;
  book: IBook;
}

export interface IOrder {
  id: number;
  orderItems: IOrderItem[];
  purchaseTime: Date;
  totalPrice: number;
}
