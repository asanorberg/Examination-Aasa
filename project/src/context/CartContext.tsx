import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartItem } from "../types";

//definierar hur cart state ska se ut
interface CartState {
  items: CartItem[]; //array av items i carten
  total: number; //totala priset
}

// Type some definierar möjliga actions som kan dispatchas
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" };

//initialt cart state
const initialCartState: CartState = {
  items: [],
  total: 0,
};

// Context för cart state och dispatch functions
const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialCartState, dispatch: () => {} });

//Reducer som hanterar cart state uppdateringar baserat på dispatch actions
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // Kolla om item redan finns i cart
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        //Om item finns, öka quantity
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state, //övrig state
          items: updatedItems, //uppdatera items array
          total: state.total + action.payload.price, //uppdatera totalen
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
      };
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 } //minska quantity
            : item
        )
        .filter((item) => item.quantity > 0); //filtrera ut items med quantity 0
      const removedItem = state.items.find(
        (item) => item.id === action.payload
      );
      return {
        ...state,
        items: updatedItems, //uppdatera items array
        total: state.total - (removedItem?.price || 0), //minska totalen
      };
    }
    case "CLEAR_CART": {
      //reset cart till initial state
      return initialCartState;
    }
    default:
      //om action inte känns igen, returner current state
      return state;
  }
}

interface CartProviderProps {
  children: ReactNode; //child components wrappas av providern
}

// CartProvider component to provide cart state and dispatch to the app
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // useReducer hook för att manage cart state
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    // Provide cart state och dispatch function till child components
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

//Custom hook för att komma åt cartens context i komponenter
export const useCart = () => useContext(CartContext);
