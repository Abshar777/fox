"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const LoaderContext = createContext({ ready: false, finish: () => {} });

export function LoaderProvider({ children }) {
  const [ready, setReady] = useState(false);

  // Stable identity: the preloader's layout effect depends on this, and a new
  // reference would revert and restart its timeline mid-handoff.
  const finish = useCallback(() => {
    setReady(true);
    document.body.classList.remove("is-loading");
  }, []);

  const value = useMemo(() => ({ ready, finish }), [ready, finish]);

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export const useLoader = () => useContext(LoaderContext);
