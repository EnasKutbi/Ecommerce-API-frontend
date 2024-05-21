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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchProducts({ pageNumber, pageSize, searchKeyword, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchKeyword, sortBy])

  return (
    <div>
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
      <h2>List of Products</h2>
      <section className="products">
        {products &&
          products.length > 0 &&
          products.map((product) => <SingleProduct key={product.productId} product={product} />)}
      </section>
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
  )
}

export default Products
