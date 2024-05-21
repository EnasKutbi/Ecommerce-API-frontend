export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  createdAt: string
  products?: Product[]
}

export type Product = {
  productId: string
  name: string
  slug: string
  imageUrl: string
  description: string
  price: number
  quantity: number
  sold: number
  shipping: number
  categoryId: string
  createdAt: string
  category?: Category
}

export type ProductState = {
  products: Product[]
  totalPages: number
  product: Product | null
  error: null | string
  isLoading: boolean
}

export type User = {
  name: string
  email: string
  password: string
  address: string
  image?: string
  isAdmin?: boolean
  isBanned?: boolean
  createdAt?: string
}

export type UserState = {
  error: null | string
  isLoading: boolean
}