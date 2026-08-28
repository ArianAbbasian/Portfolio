"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RootPage() {
  useEffect(() => {
    window.location.replace("/fa");
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/fa" />
      </noscript>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1rem",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <p>در حال انتقال به صفحه اصلی...</p>
        <Link href="/fa" style={{ color: "var(--accent)", fontWeight: "bold" }}>
          رفتن به صفحه اصلی
        </Link>
      </div>
    </>
  );
}
