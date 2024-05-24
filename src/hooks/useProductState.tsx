import { RootState } from "@/tookit/store"
import { useSelector } from "react-redux"

const useProductsState = () => {
  const { products, isLoading, error, totalPages, product } = useSelector(
    (state: RootState) => state.productR
  )
  return { products, isLoading, error, totalPages, product }
}
export default useProductsState
