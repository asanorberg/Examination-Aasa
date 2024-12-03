export interface FetchMenuResponse {
  items: MenuItem[]; //api response håller en array av MenuItem objects
}

// strukturen för en single menu item
export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  type: "wonton" | "dip" | "drink";
  ingredients?: string[];
}

//props required för att rendera en WontonItem component
export interface WontonItemProps {
  id: number;
  name: string;
  ingredients: string[];
  price: number;
}

//props required för att rendera en SideItem component
export interface SideItemProps {
  id: number;
  name: string;
  type: "dip" | "drink";
  price: number;
}

// strukturen för en item i shopping cart
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

//props required för att rendera en CheckoutItem component
export interface CheckoutItemProps {
  item: CartItem; //en CartItem att visas i checkout
}
