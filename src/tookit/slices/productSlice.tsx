import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateProductForBackend, CreateProductFormData, ProductState } from "@/types"
import { getToken } from "@/utils/localStorage"

const initialState: ProductState = {
  products: [],
  totalPages: 1,
  product: null,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    searchKeyword,
    sortBy,
    selectedCategories,
    minPrice,
    maxPrice
  }: {
    pageNumber: number
    pageSize: number
    searchKeyword: string
    sortBy: string
    selectedCategories?: string[]
    minPrice?: number
    maxPrice?: number
  }) => {
    const params = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      sortBy
    })
    selectedCategories?.forEach((categoryId) => {
      params.append("SelectedCategories", categoryId)
    })
    if (minPrice !== undefined) {
      params.append("MinPrice", minPrice.toString())
    }
    if (maxPrice !== undefined) {
      params.append("MaxPrice", maxPrice.toString())
    }
    if (searchKeyword) {
      params.append("SearchKeyword", searchKeyword)
    }
    const response = await api.get("/products", { params })
    return response.data
  }
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (slug: string | undefined) => {
    const response = await api.get(`/products/${slug}`)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: string) => {
    await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return productId
  }
)

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newProduct: CreateProductForBackend) => {
    const response = await api.post(`/products`, newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    updateProductData,
    productId
  }: {
    updateProductData: CreateProductForBackend
    productId: string
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.product = action.payload.data
      state.isLoading = false
    })

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter((product) => product.productId != action.payload)
    })

    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.products.push(action.payload)
      state.isLoading = false
    })

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const foundProduct = state.products.find(
        (product) => product.productId == action.payload.data.productId
      )
      if (foundProduct) {
        foundProduct.name = action.payload.data.name
        // foundProduct.imageUrl = action.payload.data.imageUrl
        foundProduct.description = action.payload.data.description
        foundProduct.price = action.payload.data.price
        foundProduct.quantity = action.payload.data.quantity
        foundProduct.sold = action.payload.data.sold
        foundProduct.shipping = action.payload.data.shipping
        foundProduct.categoryId = action.payload.data.categoryId
      }
    })

    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default productSlice.reducer
