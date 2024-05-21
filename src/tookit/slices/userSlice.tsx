import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserState, User } from "@/types"

const initialState: UserState = {
  error: null,
  isLoading: false
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post(`/users`, newUser)
  return response.data
})

const userSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},

})

export default userSlice.reducer
