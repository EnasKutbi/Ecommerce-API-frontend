import { Login } from "@/pages"
import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.userR)
  return isLoggedIn ? <Outlet /> : <Login />
}
export default ProtectedRoute
