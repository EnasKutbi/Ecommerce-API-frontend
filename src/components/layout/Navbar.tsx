import React from "react"
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "@/tookit/store"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "@/tookit/slices/userSlice"
import { CartIcon } from "../CartIcon"
import useCartState from "@/hooks/useCartState"
import useUsersState from "@/hooks/useUsersState"

export const Navbar = () => {
      const dispatch: AppDispatch = useDispatch()
  const { isLoggedIn, userData } = useUsersState()
  const { cartItems } = useCartState()
      const handleLogout = () => {
        dispatch(logoutUser())
      }
  return (
    <nav className="navbar">
      <ul className="navbar_lists">
        <li>
          <img
            className="logo-img"
            src="https://res.cloudinary.com/enas-cloud/image/upload/v1716913199/e-commerce-sda2/bnhn0ausceuw6fqfma2n.png"
            width="70"
            alt="Harry Potter photo"
          />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            {userData?.isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/admin">Admin Profile</Link>
                </li>
              </>
            )}
            {!userData?.isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/user">Profile</Link>
                </li>
              </>
            )}
          </>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/cart">
            <CartIcon value={cartItems && cartItems.length > 0 ? cartItems.length : 0} />
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
