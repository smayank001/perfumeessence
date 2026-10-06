import { Playfair_Display, Cormorant_Garamond } from "next/font/google"

export const serif = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
})

export const lavish = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-cormorant",
})

// Times New Roman is the global brand typography
export const roboto = {
  className: "font-serif",
  variable: "--font-serif",
}

