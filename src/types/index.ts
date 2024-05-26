export type Category = {
  categoryId: string
  name: string
  slug: string
  description: string
  createdAt: string
  products?: Product[]
}

export type CategoryState = {
  categories: Category[]
  totalPages: number
  category: Category | null
  error: null | string
  isLoading: boolean
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

export type CartItem = Product & { orderQuantity: number }

export type CartState = {
  cartItems: CartItem[]
}

export type User = {
  userId?: string
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
  users: User[]
  totalPages: number
  error: null | string
  isLoading: boolean
  userData: null | User
  token: null | string
  isLoggedIn: boolean
}

export type LoginFormData = {
  email: string
  password: string
}

export type LoginData = {
  isLoggedIn: boolean
  userData: User | null
  token: string
}

export type RegisterFormData = {
  name: string
  email: string
  password: string
  image: string
  phone: string
  address: string
}

export type CreateProductFormData = {
  name: string
  imageUrl: string
  description: string
  price: number
  quantity: number
  sold: number
  shipping: number
  categoryId: string
}

export type UpdateProfileFormData = {
  name: string
  address: string
}

export type CreateCategoryFormData = {
  name: string
  description: string
}
