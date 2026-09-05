import type { Metadata } from "next";
import RootRedirect from "./root-redirect";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootPage() {
  return <RootRedirect />;
}
