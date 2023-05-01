import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCartStore: (item) =>
        set((state) => ({ cartItems: [item, ...state.cartItems] })),
      updateCartStore: (item) => set((state) => (state.cartItems = item)),
      emptyCartStore: () => set((state) => (state.cartItems = [])),
    }),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
