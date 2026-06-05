import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Portfolio of Arian Abbasian',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // فقط children رو پاس بده، هیچ تگ html/body اینجا نذار
  return children;
}