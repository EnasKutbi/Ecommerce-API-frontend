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