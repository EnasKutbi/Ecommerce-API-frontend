import PageTitle from "@/components/PageTitle"
import { addToCart } from "@/tookit/slices/cartSlice"
import { fetchProductBySlug } from "@/tookit/slices/productSlice"
import { AppDispatch, RootState } from "@/tookit/store"
import { Product } from "@/types"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

export const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>()
  const { product, isLoading, error } = useSelector((state: RootState) => state.productR)

  const dispatch: AppDispatch = useDispatch()

  const handelAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProductBySlug(slug))
    }
    fetchData()
  }, [])

  return (
    <article className="products-details">
      <PageTitle title="Product Details" />
      <br />
      <h2>Products Details</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}
      <section className="products">
        {product && (
          <div>
            <img src={product.imageUrl} alt={product.name} className="product-details__img" />
            <div className="product-details__body">
              <h3 className="product-details__name">{product.name}</h3>
              <p className="product-details__description"> Description: {product.description}</p>
              <p className="product-details__quantity"> Quantity: {product.quantity}</p>
              <p className="product-details__sold">Sold: {product.sold}</p>
              <p className="product-details__price">Price: {product.price}</p>
              <p>Product Added: {new Date(product.createdAt).toLocaleDateString()}</p>
              <button
                className="btn product_btn"
                onClick={() => {
                  handelAddToCart(product)
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        )}
      </section>
    </article>
  )
}

