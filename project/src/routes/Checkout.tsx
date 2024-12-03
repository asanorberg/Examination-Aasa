import React from "react";
import { useCart } from "../context/CartContext"; // custom hook för access till cart context
import CheckoutItem from "../components/CheckoutItem"; // komponent för att rendera cart items
import { placeOrder } from "../api/orders"; // funktionen för API anrop
import { useNavigate } from "react-router-dom"; //för routing
import Button from "../components/Button";

const tenantId = import.meta.env.VITE_TENANT_ID;

const Checkout: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();

  // LÄGG BESTÄLLNING
  const handleOrderSubmit = async () => {
    // cart items för API-anropet
    const orderItems = state.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));
    console.log("Ordered items", orderItems); // Loggar items i ordern

    try {
      // anropa placeOrder funktionen med tenantId och orderItems
      const orderConfirmation = await placeOrder(tenantId, orderItems);
      console.log("Order submitted successfully:", orderConfirmation); // Loggar order details

      dispatch({ type: "CLEAR_CART" }); // Rensa cart efter att ordern är lagd

      navigate("/confirmation", {
        state: { order: orderConfirmation.order },
      });
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const totalPrice = state.total; // beräkna total priset av cart items

  return (
    <div className="flex flex-col items-center w-full gap-4 text-coal m-0 p-0">
      <ul className="w-[90%] m-0 p-0 list-none">
        {state.items.map((item) => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </ul>

      <div className="w-full bottom-10  space-y-4">
        <div className="flex w-[90%] items-center justify-between h-[78px] bg-shadedark rounded-[4px] text-[32px] leading-[38.4px] font-bold mt-auto hover:cursor-pointer select-none">
          <div className="flex flex-col">
            <span className="text text-[22px] leading-[26.4px]">TOTALT</span>
            <span className="text-[14px] leading-[16.8px] font-medium">
              inkl moms 20%
            </span>
          </div>
          <div className="text-[32px]">{totalPrice.toFixed()} SEK</div>
        </div>

        <Button
          variant="cta"
          onClick={handleOrderSubmit} //lägg best
          className="flex w-[90%]"
        >
          TAKE MY MONEY!
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
