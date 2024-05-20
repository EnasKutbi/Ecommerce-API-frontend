import React from "react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar_lists">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar