import "./globals.css";
import { roboto } from "@/lib/fonts";
import { CartProvider } from "@/context/CartContext";
import SmoothScroll from "../components/customer/Scroll";
import MetaPixel from "../components/admin/MetaPixel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <MetaPixel />
        <meta name="facebook-domain-verification" content="b0ojpnj3ymhjrklgj2d4shzd7hrk4s" />
      </head>
      <body
        className="antialiased font-serif bg-[#F7F2E8] text-[#19151D]"
      >
        <SmoothScroll>
          <CartProvider>
          {children}
          </CartProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
