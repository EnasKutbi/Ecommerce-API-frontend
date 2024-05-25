import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdminCategories, AdminDashboard, AdminOrders, AdminProducts, AdminUsersManagement, Contact, Error, Home, UserDashboard } from "@/pages"
import Navbar from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ProductDetails } from "@/pages/ProductDetails"
import { Register } from "@/pages/Register"
import { Login } from "@/pages/Login"
import { UserProfile } from "@/pages/users/UserProfile"
import { UserOrders } from "@/pages/users/UserOrders"
import ProtectedRoute from "./ProtectedRoute"
import AdminRoute from "./AdminRoute"

export const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/categories" element={<AdminCategories />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/users" element={<AdminUsersManagement />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
