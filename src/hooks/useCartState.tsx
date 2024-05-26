import { RootState } from "@/tookit/store"
import { useSelector } from "react-redux"

const useCartState = () => {
  const { cartItems } = useSelector(
    (state: RootState) => state.cartR
  )
  return { cartItems }
}
export default useCartState
