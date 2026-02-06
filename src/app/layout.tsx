import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/hooks/cart-provider';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: 'SneakerVerse - Find Your Perfect Pair',
  description: 'The ultimate destination for shoe lovers. Browse, search, and buy the latest sneakers from top brands.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseProvider>
          <FirebaseClientProvider>
            <CartProvider>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-grow">
                        {children}
                    </main>
                    <Footer />
                </div>
                <Toaster />
            </CartProvider>
          </FirebaseClientProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
