import React from "react"
import { PageTitle } from "@/components/PageTitle"
import useCartState from "@/hooks/useCartState"
import { AppDispatch } from "@/tookit/store"
import { useDispatch } from "react-redux"
import { decrementQuantity, incrementQuantity, removeAllFromCart, removeFromCart } from "@/tookit/slices/cartSlice"
import { useNavigate } from "react-router-dom"
import useUsersState from "@/hooks/useUsersState"

export const Cart = () => {
  const { cartItems } = useCartState()
  const { userData, isLoggedIn } = useUsersState()

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const handelRemoveAllProductsFromCart = () => {
    dispatch(removeAllFromCart())
  }

  const handelRemoveFromCart = (productId?: string) => {
    if (productId) {
      dispatch(removeFromCart(productId))
    }
  }
  const handelIncrementQuantity = (productId?: string) => {
    if (productId) {
      dispatch(incrementQuantity(productId))
    }
    }
    const handelDecrementQuantity = (productId?: string) => {
      if (productId) {
        dispatch(decrementQuantity(productId))
      }
    }

  const cartTotal = () => {
    let total = 0
    cartItems && cartItems.map((cartItem) => (total += cartItem.price * cartItem.orderQuantity))
    return total
  }

  return (
    <div className="cart">
      <PageTitle title={"Cart"} />
      {cartItems && cartItems.length > 0 ? (
        <>
          <div>
            <h2>Shopping Cart [{cartItems.length}] items</h2>
            <button onClick={handelRemoveAllProductsFromCart}>Remove all items from cart</button>
            <button
              onClick={() => {
                navigate("/")
              }}
            >
              Shop more
            </button>
          </div>
          <div className="cart-body cart">
            <div className="cart-items">
              {cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.productId}>
                  <div className="cart-item-left">
                    <img className="cart-img" src={cartItem.imageUrl} alt={cartItem.name} />
                  </div>
                  <div className="cart-item-center">
                    <p>{cartItem.name}</p>
                    <p>Price: {cartItem.price}$</p>
                    <p>In stock: {cartItem.quantity}</p>
                  </div>
                  <div className="cart-item-right">
                    <div className="quantity-controls">
                      <button
                        onClick={() => {
                          handelIncrementQuantity(cartItem.productId)
                                  }}
                                  disabled= {cartItem.quantity == cartItem.orderQuantity}
                      >
                        +
                      </button>
                      <span>{cartItem.orderQuantity}</span>
                      <button
                        onClick={() => {
                          handelDecrementQuantity(cartItem.productId)
                        }}
                      >
                        -
                      </button>
                    </div>
                    <br />
                    <button onClick={() => handelRemoveFromCart(cartItem.productId)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="catt-summary">
              <h3>Cart Summary</h3>
              <h4>Total: {cartTotal()} $</h4>
              {isLoggedIn ? (
                <div>
                  <p>{userData && userData.address}</p>
                  <button
                    onClick={() => {
                      navigate("/dashboard/user/profile")
                    }}
                  >
                    Update Delivery Address
                  </button>
                  <br />
                  <button>Pay here</button>
                </div>
              ) : (
                <h3>login first for placing the order and the delivery address</h3>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>No items in the cart</p>
      )}
    </div>
  )
}
