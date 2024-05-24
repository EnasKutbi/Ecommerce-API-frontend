import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserState, User, LoginFormData, UpdateProfileFormData } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"

// const data =
//   localStorage.getItem("loginData") != null
//     ? JSON.parse(String(localStorage.getItem("loginData")))
//     : []

const data = getLocalStorage("loginData", {
  userData: null,
  token: null,
  isLoggedIn: false
})

const initialState: UserState = {
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post(`/users`, newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post(`/users/login`, userData)
  return response.data
})

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ updateUserData, userId }: { updateUserData: UpdateProfileFormData; userId: string }) => {
    const response = await api.put(`/users/${userId}`, updateUserData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)

const userSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.isLoading = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      state.isLoggedIn = true
      state.isLoading = false
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    })

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (state.userData) {
        state.userData.name = action.payload.data.name
        state.userData.address = action.payload.data.address
        setLocalStorage("loginData", {
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
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

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
