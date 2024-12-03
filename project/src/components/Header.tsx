import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import cartIcon from "../assets/cart_btn.svg";

interface HeaderProps {
  onCartClick?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { state } = useCart();

  const handleCartClick = () => {
    navigate("/checkout");
  };

  return (
    <header className="bg-transparent absolute right-0 top-0 text-snow px-4 py-3">
      <div className="relative">
        <button
          onClick={handleCartClick}
          className="flex justify-center bg-snow w-[64px] h-[64px] rounded-lg cursor-pointer border-none"
          aria-label="View Cart"
        >
          <img src={cartIcon} alt="Cart" className="w-14 h-auto opacity-80" />
        </button>

        {state.items.length > 0 && (
          <div className="absolute top-0 right-0 bg-alert text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {state.items.reduce((total, item) => total + item.quantity, 0)}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
