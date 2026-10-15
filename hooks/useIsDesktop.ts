"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};

export default function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
