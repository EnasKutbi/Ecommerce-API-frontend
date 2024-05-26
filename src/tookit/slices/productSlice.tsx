import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CreateProductFormData, ProductState } from "@/types"
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
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    searchKeyword: string
    sortBy: string
  }) => {
    const response =
      searchKeyword.length > 0
        ? await api.get(
            `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}`
          )
        : await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
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
  async (newProduct: CreateProductFormData) => {
    const response = await api.post(`/products`, newProduct, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(response.data.data)
    return response.data
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    updateProductData,
    productId
  }: {
    updateProductData: CreateProductFormData
    productId: string
  }) => {
    const token = getToken()
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${token}`
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
        foundProduct.imageUrl = action.payload.data.imageUrl
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
