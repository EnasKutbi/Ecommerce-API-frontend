import AdminSidebar from "@/components/AdminSidebar"
import useOrdersState from "@/hooks/useOrdersState"
import { fetchOrders } from "@/tookit/slices/orderSlice"
import { AppDispatch } from "@/tookit/store"
import { Order } from "@/types"
import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"

export const AdminOrders = () => {
  const { orders, isLoading, error, totalPages } = useOrdersState()

  const dispatch: AppDispatch = useDispatch()

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize] = useState(5)
  const [searchKeyword, setSearchKeyword] = useState("")
  const [sortBy, setSortBy] = useState("OrderDate")
  //const [isEdit, setIsEdit] = useState(false)
  const [selectedOrderId, setSelectedOrderId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchOrders({ pageNumber, pageSize, searchKeyword, sortBy }))
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
  // const onSubmit: SubmitHandler<CreateOrderFormData> = async (data) => {

  //     try {
  //         await dispatch(updateOrder({updateOrderData: data, orderId: selectedOrderId}))
  //         setIsEdit(false)

  //         reset()
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  //     const handleDelete = async (id: string) => {
  //     try {
  //         await dispatch(deleteOrder(id))
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }

  // const handleEdit = async (order: Order) => {
  //     setSelectedOrderId(order.orderId)
  //     setValue("order Status", order.orderStatus)
  // }
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
            <option value="OrderStatus">Order Status</option>
            <option value="OrderDate">Order Date</option>
          </select>
        </div>
        {/* edit Order
            <div>
                <h2>Edit Order</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-field">
                    <label htmlFor="orderStatus"> Order Status: </label>
                    <input type="text" {... register("orderStatus")}/>
                    </div>
                    <button className="btn" type="submit">
                    Update Order
                    </button>
                    </form> */}
        <h2>List of order: </h2>
        <table>
          <thead>
            <tr>
              <th>userId</th>
              <th>orderStatus</th>
              <th>orderTotal</th>
              <th>createdAt</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.length > 0 &&
              orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.userId}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.orderTotal}</td>
                  <td>{order.orderDate}</td>
                  {/* <td>
                                    <button className= "btn" 
                                    // onClick={() => {handleEdit(order)}}
                                    >
                                    Edit
                                    </button>
                                    <button className= "btn" 
                                    // onClick={() => {handleDelete(order.orderId)}}
                                    >
                                    Delete
                                    </button>
                                </td> */}
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
