import AdminSidebar from "@/components/AdminSidebar"
import { AppDispatch } from "@/tookit/store"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useCategoriesState from "@/hooks/useCategoriesState"
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from "@/tookit/slices/categorySlice"
import SingleCategory from "./SingleCategory"
import { SubmitHandler, useForm } from "react-hook-form"
import { Category, CreateCategoryFormData } from "@/types"

export const AdminCategories = () => {
  //access store for all the categories
  const { categories, isLoading, error, totalPages } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CreateCategoryFormData>()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [isEdit, setIsEdit] = useState(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize, searchKeyword, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchKeyword, sortBy])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const onSubmit: SubmitHandler<CreateCategoryFormData> = async (data) => {
    try {
      if (isEdit) {
        await dispatch(updateCategory({ updateCategoryData: data, categoryId: selectedCategoryId }))
        setIsEdit(false)
      } else {
        await dispatch(createCategory(data))
      }
      reset()
    } catch (error) {
      console.log(error)
    }
  }
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCategory(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (category: Category) => {
    setIsEdit(true)
    setSelectedCategoryId(category.categoryId)
    setValue("name", category.name)
    setValue("description", category.description)
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Search Categories"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <p>Stor By:</p>
          <select name="" id="" onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
          </select>
        </div>
        {/* create or edit category */}
        <div>
          <h2>{isEdit ? "Edit Category" : "Create Category"}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label htmlFor="name"> Name: </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "Name must be at least 2 characters" }
                })}
              />
              {errors.name && <p> {errors.name.message} </p>}
            </div>

            <div className="form-field">
              <label htmlFor="description"> Description: </label>
              <textarea {...register("description")}></textarea>
            </div>

            <button className="btn" type="submit">
              {isEdit ? "Update Category" : "Create Category"}
            </button>
          </form>
        </div>
        <h2>List of categories: </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <tr key={category.categoryId}>
                  <td>{category.name}</td>
                  <td>{category.description.substring(0, 100)}...</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleEdit(category)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        handleDelete(category.categoryId)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={pageNumber == 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={pageNumber == totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}