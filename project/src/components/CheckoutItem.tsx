import React from "react";
import { useCart } from "../context/CartContext";
import { CheckoutItemProps } from "../types";

const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleIncrease = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id: item.id, name: item.name, price: item.price, quantity: 1 },
    });
  };

  const handleDecrease = () => {
    dispatch({ type: "REMOVE_ITEM", payload: item.id });
  };

  return (
    <div className="py-8 flex-1 border-shadedark border-b-2 border-t-0 border-x-0 border-dotted last:border-none">
      <div className="flex w-full">
        <span className="text-[18px] font-medium">
          {item.name.toUpperCase()}
        </span>
        <span className="flex-1 border-b-2 border-t-0 border-x-0 border-dotted p-2"></span>

        <span className="text-[14px] text-gray-500 m-0 p-0">
          {item.quantity * item.price} SEK
        </span>
      </div>
      <div className="flex float-start p-1  space-x-4">
        <button
          className="text-coal bg-shadedark rounded-full h-6 w-6 border-none "
          onClick={handleDecrease}
        >
          -
        </button>
        <span className="text-[18px]">{item.quantity} stycken</span>
        <button
          className="text-coal bg-shadedark rounded-full h-6 w-6 border-none"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
