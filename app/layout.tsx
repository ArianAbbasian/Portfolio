import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi/Satoshi-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Satoshi/Satoshi-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Satoshi/Satoshi-Bold.woff2', weight: '700' },
    { path: '../public/fonts/Satoshi/Satoshi-Black.woff2', weight: '900' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
});

const iranYekan = localFont({
  src: [
    { path: '../public/fonts/IranYekan/iranyekanwebregular.woff', weight: '400' },
    { path: '../public/fonts/IranYekan/iranyekanwebmedium.woff', weight: '500' },
    { path: '../public/fonts/IranYekan/iranyekanwebbold.woff', weight: '700' },
    { path: '../public/fonts/IranYekan/iranyekanwebextrabold.woff', weight: '800' },
  ],
  variable: '--font-iran-yekan',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Arian Abbasian',
  description: 'Arian Abbasian — Frontend Developer & Software Engineering Student',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${iranYekan.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background-main text-text-primary antialiased selection:bg-accent-primary/30">
        {children}
      </body>
    </html>
  );
}