import { PageTitle } from "@/components/PageTitle"
import Products from "@/components/Products"
import React from "react"

export const Home = () => {
  return (
    <div>
      <PageTitle title={"Home"} />
      <section id="home" className="home">
        <h1>Welcome To Harry Potter World</h1>
        <p>
          Here is everything related to the Wizarding World of Harry Potter.
          <br />
          Our store specializes in selling Harry Potter products. <br />
          There is no fun for the Muggles here, only for witches and wizards.
          <br />
          All Potterheads are welcome.
        </p>
      </section>
      <Products />
    </div>
  )
}
