"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useIsTouchDevice() {
  return useSyncExternalStore(
    emptySubscribe,
    () =>
      typeof window === "undefined"
        ? false
        : window.matchMedia("(pointer: coarse)").matches,
    () => false
  );
}