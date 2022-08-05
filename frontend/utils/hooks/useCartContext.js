import { useState, useEffect} from 'react';

export default function useLocalStorage() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );


  const addItemToCart = (item) => {
    if(isInCart(item.id))
    {
      updateItemInCart(item.id, item.quantity);
    }
    else
    {
      setCart([...cart, item]);
      localStorage.setItem('cart', JSON.stringify([...cart, item]));
    }
  };

  const updateItemInCart = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id == id
          ? { ...item, quantity: quantity}
          : item
      )
    );
    localStorage.setItem(
      'cart',
      JSON.stringify(
        cart.filter((item) =>
        item.id == id
          ? { ...item, quantity: quantity}
          : item
      )))
  };

  const removeItemFromCart = (id) => {
    setCart(cart.filter((cartItem) => cartItem.id !== id));
    localStorage.setItem(
      'cart',
      JSON.stringify(cart.filter((cartItem) => cartItem.id !== id))
    );
  };

  const getItemFromCart = (id) => {
    return localStorage.getItem(
      'cart',
      JSON.stringify(cart.filter((cartItem) => cartItem.id == id))
    );
  }

  const isInCart = (itemId) => cart.some((cartItem) => cartItem.id === itemId);

  const amountOfItemsInCart = () =>
    cart.reduce((acc, item) => (acc += item.quantity), 0);

  const totalCartPrice = () =>
    cart.reduce((acc, item) => (acc += item.price * item.quantity), 0);

  const resetCart = () => {
    setCart([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return {addItemToCart, removeItemFromCart, getItemFromCart, isInCart, amountOfItemsInCart, totalCartPrice, resetCart};
};