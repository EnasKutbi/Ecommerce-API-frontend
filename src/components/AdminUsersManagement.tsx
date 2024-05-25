import AdminSidebar from "@/components/AdminSidebar"
import useUsersState from "@/hooks/useUsersState"
import { banUnbanUser, fetchUsers } from "@/tookit/slices/userSlice"
import { AppDispatch } from "@/tookit/store"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const AdminUsersManagement = () => {
  const { users, isLoading, error, totalPages } = useUsersState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("Name")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUsers({ pageNumber, pageSize, searchKeyword, sortBy }))
    }
    fetchData()
  }, [pageNumber, searchKeyword, sortBy])

  const handlePreviousPage = () => {
    setPageNumber((currentPage) => currentPage - 1)
  }

  const handleNextPage = () => {
    setPageNumber((currentPage) => currentPage + 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  const handleBanUnban = async (userId: string | undefined) => {
    try {
      userId && (await dispatch(banUnbanUser(userId)))
      //toast.success(payload.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-container">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div>
          <input
            type="text"
            placeholder="Search Categories"
            value={searchKeyword}
            onChange={handleSearchChange}
          />
          <p>Stor By:</p>
          <select name="" id="" onChange={handleSortChange}>
            <option value="Name">Name</option>
            <option value="Price">Price</option>
          </select>
        </div>

        <h2>List of Users: </h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Is Admin</th>
              <th>Is Banned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user) => (
                <tr key={user.userId}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>{user.isBanned ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => {
                        handleBanUnban(user.userId)
                      }}
                    >
                      {user.isBanned ? "Unban" : "Ban"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={pageNumber == 1}>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setPageNumber(index + 1)}>
              {index + 1}
            </button>
          ))}
          <button onClick={handleNextPage} disabled={pageNumber == totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
