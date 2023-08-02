import { create } from "zustand";

export const useCategoriesStore = create((set) => ({
  categories: [],
  subCategories: [],
  setCategories: (value) =>
    set((state) => ({
      categories: value,
    })),
  setSubCategories: (value) =>
    set((state) => ({
      subCategories: value,
    })),
}));

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (value) =>
    set((state) => ({
      products: value,
    })),
}));

export const useUserStore = create((set) => ({
  users: [],
  setUsers: (value) =>
    set((state) => ({
      users: value,
    })),
}));

export const useOrderStore = create((set) => ({
  orders: [],
  setOrders: (value) =>
    set((state) => ({
      orders: value,
    })),
}));
