import React from "react";
import { WontonItemProps } from "../types";
import { useCart } from "../context/CartContext";

const WontonItem: React.FC<WontonItemProps> = ({
  id,
  name,
  ingredients,
  price,
}) => {
  const { dispatch } = useCart();
  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id, name, price, quantity: 1 },
    });
  };

  return (
    <div
      onClick={handleAddToCart}
      className="flex flex-col w-full gap-2 p-4 bg-clay active:bg-coal first:rounded-t-lg border-t-0 border-x-0 last:border-b-0 last:rounded-b-lg border-b border-dotted border-shadelight hover:cursor-pointer select-none shadow-lg"
    >
      <div className="flex items-center gap-2 w-full">
        <h2 className="text-[22px] font-medium">{name.toUpperCase()}</h2>
        <span className="flex-1 border-b-2 border-t-0 border-x-0 border-dotted p-2"></span>
        <p className="font-bold text-xl">{price} SEK</p>
      </div>

      <p className="w-full">{ingredients.join(", ")}</p>
    </div>
  );
};

export default WontonItem;
