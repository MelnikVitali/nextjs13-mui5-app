import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Generated next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* console warning blocking */}
      <body suppressHydrationWarning={true} className={roboto.className}>
        <Header />
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html >
  );
}

