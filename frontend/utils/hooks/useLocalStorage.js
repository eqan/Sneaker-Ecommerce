import { useState, useEffect } from "react";

export default function useLocalStorage() {

  const [items, setItems] = useState(() => {
    const items = localStorage.getItem("cart");
    return items ? JSON.parse(items) : [];
  });

  const addToCart = (item) => {
    if(isInCart(item.id))
    {
      updateItemInCart(item.id, item.quantity);
    }
    else
    {
      setItems([...items, item]);
    }
  };

  const updateItemInCart = (id, quantity) => {
    setItems(
      items.map((item) =>
        item.id == id
          ? { ...item, quantity: quantity}
          : item
      )
    );
  }

  const incrementItem = (id) => {
    setItems(
      items?.map((item) =>
        item.id == id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementItem = (id) => {
    setItems(
      items?.map((item) =>
        item.id == id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItemFromCart = (id) => {
    setItems(items.filter((cartItem) => cartItem.id !== id));
    }

  const isInCart = (itemId) => items.some((cartItem) => cartItem.id === itemId);

  const getItemFromCart = (id) => {
    var result = items.filter(item => {
      return item.id === id
    })
    if(result[0])
    {
      return parseInt(result[0]['quantity']);
    }
    else
    {
      return 0;
    }
  }

  const amountOfItemsInCart = () => items.reduce((acc, item) => (acc += item.quantity), 0);

  const totalCartPrice = () => items.reduce((acc, item) => (acc += item.price * item.quantity), 0);

  const resetCart = () => {
    setItems([]);
  };

  useEffect(() => {
    console.log("changed");
    if (items) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  return {
      items, setItems, addToCart, incrementItem,
      decrementItem, removeItemFromCart, getItemFromCart,
      amountOfItemsInCart, totalCartPrice, resetCart
    };
};