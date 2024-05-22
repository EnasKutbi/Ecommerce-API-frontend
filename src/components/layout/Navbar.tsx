import React from "react"
import { Link } from "react-router-dom"
import { AppDispatch, RootState } from "@/tookit/store"
import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "@/tookit/slices/userSlice"

export const Navbar = () => {
      const dispatch: AppDispatch = useDispatch()
      const { isLoggedIn } = useSelector((state: RootState) => state.userR)
      const handleLogout = () => {
        dispatch(logoutUser())
      }
  return (
    <nav className="navbar">
      <ul className="navbar_lists">
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
      </ul>
    </nav>
  )
}

export default Navbar
