"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { MotionConfig } from "framer-motion";
import { makeStore, type AppStore } from "@/store";
import { hydrate, parseCart, STORAGE_KEY } from "@/store/cartSlice";
export function Providers({ children }: { children: React.ReactNode }) {
  const ref = useRef<AppStore | null>(null);
  if (!ref.current) ref.current = makeStore();
  const store = ref.current;
  useEffect(() => {
    let saved = "";
    try {
      saved = localStorage.getItem(STORAGE_KEY) || "[]";
    } catch {}
    store.dispatch(hydrate(parseCart(saved)));
    const unsubscribe = store.subscribe(() => {
      const state = store.getState().cart;
      if (!state.hydrated) return;
      const raw = JSON.stringify(state.items);
      if (raw === saved) return;
      saved = raw;
      try {
        localStorage.setItem(STORAGE_KEY, raw);
      } catch {}
    });
    const sync = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        saved = e.newValue || "[]";
        store.dispatch(hydrate(parseCart(saved)));
      }
    };
    window.addEventListener("storage", sync);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", sync);
    };
  }, [store]);
  return (
    <Provider store={store}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Provider>
  );
}
