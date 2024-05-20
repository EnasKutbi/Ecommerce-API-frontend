import { Product } from "@/types"
import React from "react"
import { Link } from "react-router-dom"

const SingleProduct = (props: { product: Product }) => {
  const { product } = props
  return (
    <article className="product card">
      <img src={product.imageUrl} alt={product.name} className="product_img" />
      <div className="product_body">
        <h3 className="product_name">{product.name}</h3>
        {/* <p className="product_description">{product.description}</p> */}
        <p className="product_price">Price: {product.price}</p>
        <div>
          <Link to={`/products/${product.slug}`}>
            <button className="btn product_btn">
              Show Details
            </button>
          </Link>
          <button className="btn product_btn">
            Add To Cart
          </button>
        </div>
      </div>
    </article>
  )
}

export default SingleProduct
