import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Service } from "../lib/types";
export const STORAGE_KEY = "studio-cart-v1";
export function parseCart(raw: string | null): CartItem[] {
  try {
    const value: unknown = JSON.parse(raw || "[]");
    if (!Array.isArray(value)) return [];
    const seen = new Set<string>();
    return value.slice(0, 30).filter((item): item is CartItem => {
      const s = item?.service;
      if (
        !s ||
        typeof s.id !== "string" ||
        s.id.length > 80 ||
        seen.has(s.id) ||
        !["name", "category", "description", "image", "delivery"].every(
          (k) => typeof s[k] === "string" && s[k].length < 2000,
        ) ||
        s.currency !== "USD" ||
        !Number.isSafeInteger(s.priceCents) ||
        s.priceCents < 0 ||
        s.priceCents > 100000000 ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 10
      )
        return false;
      seen.add(s.id);
      return true;
    });
  } catch {
    return [];
  }
}
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as CartItem[], open: false, hydrated: false },
  reducers: {
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.hydrated = true;
    },
    add(state, action: PayloadAction<Service>) {
      const item = state.items.find((i) => i.service.id === action.payload.id);
      if (item) item.quantity = Math.min(10, item.quantity + 1);
      else if (state.items.length < 30)
        state.items.push({ service: action.payload, quantity: 1 });
      state.open = true;
    },
    setQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) {
      const item = state.items.find((i) => i.service.id === action.payload.id);
      if (item && Number.isInteger(action.payload.quantity))
        item.quantity = Math.max(1, Math.min(10, action.payload.quantity));
    },
    remove(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.service.id !== action.payload);
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});
export const { hydrate, add, setQuantity, remove, setOpen } = cartSlice.actions;
export default cartSlice.reducer;
