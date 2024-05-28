import { RootState } from "@/tookit/store"
import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const UserSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <div className="admin-profile-container">
      <aside className="admin-sidebar">
        <div className="admin-profile">
          <h2>User Profile</h2>
          <p>{userData?.name}</p>
          <p>{userData?.email}</p>
        </div>
        <br />
        <ul className="admin-menu">
          <li className="admin-menu-item">
            <Link to="/dashboard/user/profile">Profile</Link>
          </li>
          <li className="admin-menu-item">
            <Link to="/dashboard/user/orders">Orders</Link>
          </li>
        </ul>
      </aside>
    </div>
  )
}
export default UserSidebar
