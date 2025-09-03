import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import NavBarContainer from "@/components/navbar/NavBarContainer";
import { ToastContainer } from 'react-toastify';
import { CartProvider } from "@/context/CartContext";
import { Analytics } from "@vercel/analytics/next"

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"], // Changed "600" to "700"
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AsteroiDMart - Home",
  description: "AsteroidMart is a sleek and modern e-commerce website where you can browse, shop, and securely checkout with ease. Whether you're looking for the latest trends or everyday essentials, AsteroidMart makes online shopping seamless and enjoyable. 🚀🛍️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ubuntu.className}>
      <body className="" suppressHydrationWarning={true}>
        <main className="w-full">
          {/* <NavBar /> */}
          <CartProvider>
            <NavBarContainer />
            <ToastContainer />
            {children}
            <Analytics />
            <Footer />
          </CartProvider>
        </main>
      </body>
    </html>
  );
}
