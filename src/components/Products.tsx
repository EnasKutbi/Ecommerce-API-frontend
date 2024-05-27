import React, { useEffect, useState } from "react"
import { fetchProducts } from "@/tookit/slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/tookit/store"
import SingleProduct from "./SingleProduct"
import useCategoriesState from "@/hooks/useCategoriesState"
import { fetchCategories } from "@/tookit/slices/categorySlice"

const Products = () => {
  const { products, isLoading, error, totalPages } = useSelector(
    (state: RootState) => state.productR
  )
  const { categories } = useCategoriesState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined)
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchProducts({
          pageNumber,
          pageSize,
          searchKeyword,
          sortBy,
          selectedCategories,
          minPrice,
          maxPrice
        })
      )
    }
    fetchData()
  }, [pageNumber, searchKeyword, sortBy, selectedCategories, minPrice, maxPrice])

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchCategories({ pageNumber, pageSize: 20, searchKeyword, sortBy }))
    }
    fetchData()
  }, [])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault
    setSearchKeyword(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    )
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(Number(e.target.value))
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(Number(e.target.value))
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error{error}</p>}
      <div>
        <div>
          <h3>Filter by Category goes here</h3>
          {categories &&
            categories.length > 0 &&
            categories.map((category) => (
              <div key={category.categoryId}>
                <label htmlFor="categories">
                  <input
                    type="checkbox"
                    value={category.categoryId}
                    checked={selectedCategories.includes(category.categoryId)}
                    onChange={() => handleCategoryChange(category.categoryId)}
                  />{" "}
                  {category.name}
                </label>
              </div>
            ))}
        </div>
        <div>
          <h3>Filter by Price goes here</h3>
          <div>
            <label htmlFor="min-price">
              Min Price:
              <input type="text" name="min-price" id="min-price" onChange={handleMinPriceChange} />
            </label>
          </div>
          <div>
            <label htmlFor="max-price">
              Max Price:
              <input type="text" name="max-price" id="max-price" onChange={handleMaxPriceChange} />
            </label>
          </div>
        </div>
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
