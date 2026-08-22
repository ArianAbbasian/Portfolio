"use client";

import { useEffect } from "react";

export default function RootRedirect() {
  useEffect(() => {
    window.location.replace("/fa");
  }, []);

  return null;
}