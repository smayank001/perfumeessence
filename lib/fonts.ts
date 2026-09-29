import {Roboto, Lavishly_Yours, Playfair_Display_SC } from "next/font/google"


export const serif = Playfair_Display_SC({
    weight: "400",
    subsets: ["latin"],
    style: ["italic", "normal"]
})

export const lavish = Lavishly_Yours({
    weight: "400",
    subsets: ["latin"]
})

export const roboto = Roboto({
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})
