import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ProductState } from "@/types"

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

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state) => {
          state.error = null
          state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
          state.products = action.payload.data.items
          state.totalPages = action.payload.data.totalPages
          state.isLoading = false
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
          state.error = action.error.message || "An error occurred"
          state.isLoading = false
        })
     }
})

export default productSlice.reducer
