import { RootState } from "@/tookit/store"
import { useSelector } from "react-redux"
const useUsersState = () => {
  const { userData, isLoading, error, token, isLoggedIn, users, totalPages } = useSelector(
    (state: RootState) => state.userR
  )

  return { userData, isLoading, error, token, isLoggedIn, users, totalPages }
}

export default useUsersState
