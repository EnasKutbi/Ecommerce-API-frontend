import { PageTitle } from "@/components/PageTitle"
import Products from "@/components/Products"
import React from "react"

export const Home = () => {
  return (
    <div>
      <PageTitle title={"Home"} />
      <Products />
    </div>
  )
}
