import api from "@/api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { UserState, User, LoginFormData, UpdateProfileFormData } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"


const data = getLocalStorage("loginData", {
  userData: null,
  token: null,
  isLoggedIn: false
})

const initialState: UserState = {
  users: [],
  totalPages: 1,
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

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
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
            `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}&sortBy=${sortBy}`,
            {
              headers: {
                Authorization: `Bearer ${getToken()}`
              }
            }
          )
        : await api.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`
            }
          })
    return response.data
  }
)

export const banUnbanUser = createAsyncThunk("users/banUnbanUser", async (userId: string) => {
  const response = await api.put(
    `/users/ban_unban/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
  return response.data
})

const userSlice = createSlice({
  name: "users",
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
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      state.isLoggedIn = true
      state.isLoading = false
      setLocalStorage("loginData", {
        isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        token: state.token
      })
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

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(banUnbanUser.fulfilled, (state, action) => {
      const foundUser = state.users.find((users) => users.userId == action.payload)
      if (foundUser) {
        foundUser.isBanned = !foundUser.isBanned
      }
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
      (state) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export const { logoutUser } = userSlice.actions
export default userSlice.reducer
