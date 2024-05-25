import { deleteCategory } from "@/tookit/slices/categorySlice"
import { AppDispatch } from "@/tookit/store"
import { Category } from "@/types"
import React from "react"
import { useDispatch } from "react-redux"

const SingleCategory = (props: { category: Category }) => {
  const { category } = props

  const dispatch: AppDispatch = useDispatch()

  const handleDelete = async (id: string) => {
    dispatch(deleteCategory(id))
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (id: string) => {
    dispatch(deleteCategory(id))
    try {
      const response = await dispatch(deleteCategory(id))
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <article className="category card">
      <div className="category_body">
        <h3 className="category_name">Category: {category.name}</h3>
        <p className="category_description">Description: {category.description}</p>
        <div>
          <button
            className="btn"
            onClick={() => {
              handleEdit(category.categoryId)
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
        </div>
      </div>
    </article>
  )
}

export default SingleCategory
