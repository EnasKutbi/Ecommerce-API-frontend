import api from "@/api"
import { OrderState } from "@/types"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: OrderState = {
  orders: [],
  totalPages: 1,
  order: null,
  error: null,
  isLoading: false
}

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
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
            `/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}&sortBy=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            }
          )
        : await api.get(`/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          })
        
    return response.data
  }
)

//cases: pending, fulfilled, rejected
const orderSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
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
      (state, action) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default orderSlice.reducer
