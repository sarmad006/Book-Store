// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};
export type registerForm = {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
};
export type postBook = {
  title: string;
  authorName: string;
  description: string;
  price: string;
  condition: string;
  photo: string;
  sellerId: string;
  donation:string;
  borrowRate:string;
  category:string;
  Borrow:string;
};
export type formPayload = {
  type: string;
  field?: string;
  payload?: string;
};
export type Books = {
  id: String;
  title: String;
  authorName: String;
  description: String;
  condition: String;
  price: String;
  sellerId: String;
  comments?: String;
  photo: String;
  status: String;
  donation:Boolean,
  borrowRate:String
  category:String
};

export type ReturnBook = {
  bookId : String;
  borrowedAt:Date;
  id:String;
  status : String;
  userId:String;
  book : Books;
}
