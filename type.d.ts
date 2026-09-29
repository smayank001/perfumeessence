
export interface Variant {
  label: string;
  sku: string;
  stock: number;
}

export interface productType {
  _id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  onSale?: boolean;
  hotSeller?: boolean;
  category: string;
  description: string;
  keywords: string[];
  images: string[];
  hasVariants: boolean;
  fragranceType?: string | null;
  variants: Variant[];
  createdAt: number
  updatedAt: number
}

export type CartItem = {
  productId: string
  name: string
  slug: string

  image: string

  variant: {
    label: string
    stock: number
  }

  price: number        // base price
  salePrice: number | null
  onSale: boolean

  finalPrice: number   // calculated once when added
  quantity: number
}

export type checkoutItem = {
  productId: string
  name: string
  price: number
  onSale: boolean
  salePrice: number
  finalPrice: number
  quantity: number
  image: string
  variant: string
}

export type OrderItem = {
  productId: string
  name: string
  price: number
  onSale: boolean
  salePrice: number | null
  finalPrice: number
  quantity: number
  image: string
  variant: string
}

export type OrderUserDetails = {
  fullName: string
  phone: string
  email?: string
}

export type ShippingAddress = {
  city?: string
  postalCode?: string
  address: string
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"

export type PaymentMethod = "cod" | "bank"


export type Order = {
  _id: string
  orderId: string
  items: OrderItem[]

  totalPrice: number
  shippingCost: number

  userDetails: OrderUserDetails
  notes?: string

  status: OrderStatus

  shippingAddress: ShippingAddress

  paymentMethod: PaymentMethod
  paymentProof?: string

  createdAt: Date
  updatedAt: Date
}

export interface mediaType {
  _id: string
  media: string
  publicId: string
  mediaType: "image" | "video"
} 

export interface ReviewType {
  name: string
  message: string
  _id: string
}