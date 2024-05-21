import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Contact, Error, Home } from "@/pages"
import Navbar from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ProductDetails } from "@/pages/ProductDetails"
import { Register } from "@/pages/Register"

export const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Index
