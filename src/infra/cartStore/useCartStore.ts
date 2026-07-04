import { create } from "zustand";

import { ProductCart, ProductCartScreen } from "@domain";

const initialState: {
  productCartStore: ProductCartScreen[];
  selectedItems: number;
  totalSelectedPrice: number;
} = {
  productCartStore: [],
  selectedItems: 0,
  totalSelectedPrice: 0,
};

export type CartStoreType = typeof initialState & {
  addProductToCart: (product: ProductCart) => void;
  removeProductFromCart: (productCartId: number) => void;
  removeProductsFromCart: (productCartIds: number[]) => void;
  updateProductVolume: (productCartId: number, newVolume: number) => void;
  toggleProductSelection: (productCartId: number) => void;
  getSelectedProducts: () => ProductCartScreen[];
  clearCart: () => void;
};

const useCartStore = create<CartStoreType>()((set, get) => ({
  ...initialState,

  addProductToCart: (product) => {
    set((state) => {
      const existingProduct = state.productCartStore.find(
        (item) => item.id === product.id,
      );

      if (existingProduct) {
        state.totalSelectedPrice +=
          (product.volume - existingProduct.volume) * product.price;

        existingProduct.volume = product.volume;

        return {
          productCartStore: state.productCartStore,
        };
      }

      state.selectedItems += 1;
      state.totalSelectedPrice += product.volume * product.price;

      return {
        productCartStore: [
          ...state.productCartStore,
          { ...product, isSelected: true },
        ],
      };
    });
  },

  removeProductFromCart: (productCartId) => {
    set((state) => {
      const productToRemove = state.productCartStore.find(
        (item) => item.cartId === productCartId,
      );

      if (productToRemove?.isSelected) {
        state.selectedItems -= 1;
        state.totalSelectedPrice -=
          productToRemove.volume * productToRemove.price;
      }

      return {
        productCartStore: state.productCartStore.filter(
          (item) => item.cartId !== productCartId,
        ),
      };
    });
  },

  removeProductsFromCart: (productCartIds) => {
    set((state) => {
      const productsToRemove = state.productCartStore.filter((item) =>
        productCartIds.includes(item.cartId),
      );

      productsToRemove.forEach((prod) => {
        if (prod.isSelected) {
          state.selectedItems -= 1;
          state.totalSelectedPrice -= prod.volume * prod.price;
        }
      });

      return {
        productCartStore: state.productCartStore.filter(
          (item) => !productCartIds.includes(item.cartId),
        ),
      };
    });
  },

  updateProductVolume: (productCartId, newVolume) => {
    set((state) => {
      const productToUpdate = state.productCartStore.find(
        (item) => item.cartId === productCartId,
      );

      if (productToUpdate?.isSelected) {
        const oldPrice = productToUpdate.price * productToUpdate.volume;
        const newPrice = productToUpdate.price * newVolume;

        state.totalSelectedPrice =
          state.totalSelectedPrice - oldPrice + newPrice;
      }

      return {
        productCartStore: state.productCartStore.map((item) =>
          item.cartId === productCartId ? { ...item, volume: newVolume } : item,
        ),
      };
    });
  },

  toggleProductSelection: (productCartId) => {
    set((state) => {
      const productToToggleSelection = state.productCartStore.find(
        (item) => item.cartId === productCartId,
      );

      if (productToToggleSelection) {
        state.selectedItems += productToToggleSelection.isSelected ? -1 : 1;
        state.totalSelectedPrice += productToToggleSelection.isSelected
          ? -productToToggleSelection.volume * productToToggleSelection.price
          : productToToggleSelection.volume * productToToggleSelection.price;
      }

      return {
        productCartStore: state.productCartStore.map((item) =>
          item.cartId === productCartId
            ? { ...item, isSelected: !item.isSelected }
            : item,
        ),
      };
    });
  },

  getSelectedProducts: () => {
    const state = get();
    return state.productCartStore.filter((item) => item.isSelected);
  },

  clearCart: () => {
    set(initialState);
  },
}));

export function useCartStoreZustand(): Pick<
  CartStoreType,
  "productCartStore" | "selectedItems" | "totalSelectedPrice"
> {
  const productCartStore = useCartStore((state) => state.productCartStore);
  const selectedItems = useCartStore((state) => state.selectedItems);
  const totalSelectedPrice = Math.abs(
    useCartStore((state) => state.totalSelectedPrice),
  );

  return { productCartStore, selectedItems, totalSelectedPrice };
}

export function useCartServiceZustand(): Omit<
  CartStoreType,
  "productCartStore" | "selectedItems" | "totalSelectedPrice"
> {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart,
  );
  const removeProductsFromCart = useCartStore(
    (state) => state.removeProductsFromCart,
  );
  const updateProductVolume = useCartStore(
    (state) => state.updateProductVolume,
  );
  const toggleProductSelection = useCartStore(
    (state) => state.toggleProductSelection,
  );
  const clearCart = useCartStore((state) => state.clearCart);
  const getSelectedProducts = useCartStore(
    (state) => state.getSelectedProducts,
  );

  return {
    addProductToCart,
    removeProductFromCart,
    removeProductsFromCart,
    updateProductVolume,
    toggleProductSelection,
    clearCart,
    getSelectedProducts,
  };
}
