import React, { useEffect, useState } from "react"
import { fetchProducts } from "@/tookit/slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/tookit/store"
import SingleProduct from "./SingleProduct"

const Products = () => {
        const { products, isLoading, error, totalPages } = useSelector(
          (state: RootState) => state.productR
    )
    
    const dispatch: AppDispatch = useDispatch()

    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [sortBy, setSortBy] = useState("Name")



    useEffect(() => {
      const fetchData = async () => {
        await dispatch(fetchProducts({ pageNumber, pageSize, searchKeyword, sortBy }))
      }
      fetchData()
    }, [pageNumber, searchKeyword, sortBy])

    
    return (
      <div>
        <h2>Products</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error{error}</p>}
        <section className="products">
          {products &&
            products.length > 0 &&
            products.map((product) => <SingleProduct key={product.productId} product={product} />)}
        </section>
      </div>
    )
}

export default Products