import React from "react"
import { FaCartPlus } from "react-icons/fa"

export const CartIcon = ({value} : {value: number}) => {
  return (
      <div>
          <FaCartPlus />
          <span>{value}</span>
      </div>
  )
}
