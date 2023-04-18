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
  id: 3;
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
