import { createSlice, configureStore } from "@reduxjs/toolkit";
import { ShopProduct } from "../shared.types";

// Define the type for the slice state
type SliceState = {
  products: ShopProduct[];
  cart: ShopProduct[];
};

// Load cart from localStorage
const loadCartFromLocalStorage = (): ShopProduct[] => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Could not load cart from localStorage", error);
    return [];
  }
};

// Define the initial state with loaded cart
const initialState: SliceState = {
  products: [],
  cart: loadCartFromLocalStorage(),
};

// Create a slice
const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addToCart: (state, action) => {
      const existingProd = state.cart.find(
        (prod) => prod.id === action.payload.id
      );
      if (existingProd) {
        existingProd.quantity++;
      } else {
        const quantity = 1;
        const newProd = { ...action.payload, quantity };
        state.cart.push(newProd);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((prod) => prod.id !== action.payload.id);
    },
    decrementQuantity: (state, action) => {
      const existingProd = state.cart.find(
        (prod) => prod.id === action.payload.id
      );
      if (existingProd && existingProd.quantity > 1) {
        existingProd.quantity--;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

// Store configuration
const store = configureStore({
  reducer: shopSlice.reducer,
});

// Subscribe to store changes to save cart to localStorage
store.subscribe(() => {
  const state = store.getState() as SliceState;
  localStorage.setItem("cart", JSON.stringify(state.cart));
});

// Actions
const {
  setProducts,
  addToCart,
  removeFromCart,
  decrementQuantity,
  clearCart,
} = shopSlice.actions;

// Selectors
const productsSelector = (state: SliceState) => state.products;
const cartSelector = (state: SliceState) => state.cart;
const cartCountSelector = (state: SliceState) =>
  state.cart.reduce((total, prod) => total + prod.quantity, 0);
const cartTotalSelector = (state: SliceState) =>
  state.cart
    .reduce((total, prod) => total + prod.quantity * prod.price, 0)
    .toFixed(2);

export {
  store,
  setProducts,
  addToCart,
  removeFromCart,
  decrementQuantity,
  productsSelector,
  cartCountSelector,
  cartTotalSelector,
  cartSelector,
  clearCart,
};
