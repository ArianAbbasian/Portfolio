import type { Metadata } from 'next';
import { redirect } from "next/navigation";


export const metadata: Metadata = {
  other: {
    refresh: '0;url=/fa',
  },
};

export default function RootPage() {
  redirect("/fa");
}