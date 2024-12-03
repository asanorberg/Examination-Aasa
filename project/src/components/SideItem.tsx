import React from "react";
import { SideItemProps } from "../types";
import { useCart } from "../context/CartContext";

const SideItem: React.FC<SideItemProps> = ({ id, name, type, price }) => {
  const { dispatch } = useCart();

  const formatName = (name: string, type: string): string => {
    if (type === "dip") {
      return name.toLowerCase();
    }
    return name;
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id, name, price, quantity: 1 },
    });
  };

  return (
    <div
      onClick={handleAddToCart}
      className="bg-shadelight w-fit active:bg-coal text-snow shadow-md px-3 py-2 whitespace-nowrap rounded-[4px] hover:cursor-pointer"
    >
      <h2 className="text-[14px] font-thin leading-4">
        {formatName(name, type)}
      </h2>
    </div>
  );
};

export default SideItem;
