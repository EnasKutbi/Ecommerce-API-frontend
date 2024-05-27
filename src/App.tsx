// import api from "./api"

import "./App.css"
import Index from "./routes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Cloudinary } from "@cloudinary/url-gen"
// import { useEffect } from "react"

function App() {
  const cld = new Cloudinary({ cloud: { cloudName: "enas-kutbi" } })
  return (
    <div>
      <ToastContainer />
      <Index />
    </div>
  )
}

export default App
