import api from "@/api"
import { CategoryState, CreateCategoryFormData } from "@/types"
import { getToken } from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState: CategoryState = {
  categories: [],
  totalPages: 1,
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
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
            `/categories?pageNumber=${pageNumber}&pageSize=${pageSize}&searchKeyword=${searchKeyword}&sortBy=${sortBy}`
          )
        : await api.get(
            `/categories?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
          )
    return response.data
  }
)

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: string) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (newCategory: CreateCategoryFormData) => {
    const response = await api.post(`/categories`, newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data.data
  }
)
export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({
    updateCategoryData,
    categoryId
  }: {
    updateCategoryData: CreateCategoryFormData
    categoryId: string
  }) => {
    const token = getToken()
    const response = await api.put(`/categories/${categoryId}`, updateCategoryData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  }
)

//cases: pending, fulfilled, rejected
const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.categoryId != action.payload
      )
    })

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload)
    })

    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const foundCategory = state.categories.find(
        (category) => category.categoryId == action.payload.data.categoryId
      )
      if (foundCategory) {
        foundCategory.name = action.payload.data.name
        foundCategory.description = action.payload.data.description
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
      (state, action) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default categorySlice.reducer
