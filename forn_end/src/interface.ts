export interface Infro {
    "_id": string,
    "name": string,
    "price": number,
    "desc": string,
    "category": string,
    "image": string,

}

export type InfroLite = Omit<Infro, "id"> // ngược lại của pick

export type UsersLogin = {
    _id: string
    username: string;
    email: string;
    password: string;
};

export type UserLoginLite = Omit<UsersLogin, 'username'>


export type ProductFormParams = {
    title: string;
    price: number;
    image: string;
    description: string;
    category: string;
    isShow: boolean;
  };
  
  export type CartItem = {
    product: Infro;
    quantity: number;
  };
  
  export type Cart = {
    _id: string;
    user: string;
    products: CartItem[];
  };
  