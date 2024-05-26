import AdminSidebar from "@/components/AdminSidebar"
import { AppDispatch } from "@/tookit/store"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/categorySlice"
import SingleProduct from "./SingleProduct"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { CreateProductFormData, Product } from "@/types"
import useProductsState from "@/hooks/useProductState"
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from "@/tookit/slices/productSlice"

export const AdminProducts = () => {
  const { categories } = useCategoriesState()
  const { products, isLoading, error, totalPages } = useProductsState()
  const dispatch: AppDispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<CreateProductFormData>()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [isEdit, setIsEdit] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchKeyword, sortBy }))
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

  // const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
  //   try {
  //     if (isEdit) {
  //       await dispatch(updateProduct({ updateProductData: data, productId: selectedProductId }))
  //       setIsEdit(false)
  //     } else {
  //       await dispatch(createProduct(data))
  //     }
  //     reset()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  const onSubmit: SubmitHandler<CreateProductFormData> = async (data) => {
    try {
      if (isEdit) {
        await dispatch(updateProduct({ updateProductData: data, productId: selectedProductId }))
        setIsEdit(false)
      } else {
        await dispatch(createProduct(data))
      }
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDelete = async (productId: string) => {
    try {
      await dispatch(deleteProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (product: Product) => {
    setIsEdit(true)
    setSelectedProductId(product.productId)
    setValue("name", product.name)
    setValue("imageUrl", product.imageUrl)
    setValue("description", product.description)
    setValue("price", product.price)
    setValue("quantity", product.quantity)
    setValue("sold", product.sold)
    setValue("shipping", product.shipping)
    setValue("categoryId", product.categoryId)
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
            placeholder="Search Products"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <p>Stor By:</p>
          <select name="" id="" onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
          </select>
        </div>
        {/* create or edit product */}
        <div>
          <h2>{isEdit ? "Edit Product" : "Create Product"}</h2>
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
              <label htmlFor="image"> Image: </label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <img className="image-preview" src={imagePreview} alt="imagePreview"></img>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="description"> Description: </label>
              <textarea {...register("description")}></textarea>
            </div>

            <div className="form-field">
              <label htmlFor="price"> Price: </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "price is required"
                })}
              />
              {errors.price && <p> {errors.price.message} </p>}
            </div>

            <div className="form-field">
              <label htmlFor="quantity"> Quantity: </label>
              <input
                type="number"
                step="0.01"
                {...register("quantity", {
                  required: "quantity is required"
                })}
              />
              {errors.quantity && <p> {errors.quantity.message} </p>}
            </div>

            <div className="form-field">
              <label htmlFor="sold"> Sold: </label>
              <input
                type="number"
                step="0.01"
                {...register("sold", {
                  required: "sold is required"
                })}
              />
              {errors.sold && <p> {errors.sold.message} </p>}
            </div>

            <div className="form-field">
              <label htmlFor="shipping"> Shipping: </label>
              <input
                type="number"
                step="0.01"
                {...register("shipping", {
                  required: "shipping is required"
                })}
              />
              {errors.shipping && <p> {errors.shipping.message} </p>}
            </div>

            <br />
            <div className="form-field">
              <label htmlFor="categoryIds"> Category: </label>
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <select {...field}>
                    {categories.map((category) => (
                      <option key={category.categoryId} value={category.categoryId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <br />

            <button className="btn" type="submit">
              {isEdit ? "Update Product" : "Create Product"}
            </button>
          </form>
        </div>
        <h2>List of Products: </h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <tr key={product.productId}>
                  <td>
                    <img src={product.imageUrl} alt={product.slug} className="product_img" />
                  </td>
                  <td>{product.name}</td>
                  <td>{JSON.stringify(product.category?.name)}</td>
                  <td>{product.description.substring(0, 100)}...</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleEdit(product)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn"
                      onClick={() => {
                        handleDelete(product.productId)
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
