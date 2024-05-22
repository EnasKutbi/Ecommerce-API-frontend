import { Login } from "@/pages"
import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

const AdminRoute = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.userR)
  return isLoggedIn && userData?.isAdmin ? <Outlet /> : <Login />
}
export default AdminRoute
