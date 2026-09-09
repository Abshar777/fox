"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const LoaderContext = createContext({ ready: false, finish: () => { } });

export function LoaderProvider({ children, initialReady = false }) {
  const [ready, setReady] = useState(initialReady);

  // Routes without a preloader (the blog, admin) mount as already-ready, so
  // nothing else would ever clear the `is-loading` class the document sets
  // before hydration which would leave the body locked at 100vh.
  useEffect(() => {
    if (initialReady) document.body.classList.remove("is-loading");
  }, [initialReady]);

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
