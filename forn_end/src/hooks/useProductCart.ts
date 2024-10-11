import axios from "axios";
import { useUser } from "../contexts/user";
import { Infro } from "../interface";
import { useCart } from "../contexts/cart";


type AddToCart = {
  product: Infro;
  quantity: number;
};

export const useProductCart = () => {
  const { user, setUser } = useUser();
  const { cart, setCart } = useCart();

  const getCartUser = async () => {
    const userStorage = localStorage.getItem("user") || "{}";
    const user = JSON.parse(userStorage);
    setUser(user);
    if (!user._id) return;
    const { data } = await axios.get(`http://localhost:3000/carts/user/${user._id}`);
    setCart(data);
  };

  const addToCart = async ({ product, quantity }: AddToCart) => {
    if (quantity <= 0 || !user) return;
    try {
      if (cart) {
        await axios.put(`http://localhost:3000/carts/${cart._id}`, {
          product,
          quantity,
          user: user._id,
        });
      } else {
        await axios.post("http://localhost:3000/carts", {
          product,
          quantity,
          user: user._id,
        });
      }
      const { data } = await axios.get(`http://localhost:3000/carts/user/${user._id}`);
      setCart(data);
    } catch (error) {
      console.log(error);
    }
  };
  const removeToCart = async (productId: string) => {
    if (!user) return;
    if (window.confirm("Remove Item Cart")) {
      try {
        await axios.delete(`http://localhost:3000/carts/user/${user._id}/product/${productId}`);
        getCartUser();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return { addToCart, removeToCart, getCartUser };
};