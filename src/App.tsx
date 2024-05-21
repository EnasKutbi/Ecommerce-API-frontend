// import api from "./api"

import "./App.css"
import Index from "./routes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { useEffect } from "react"

function App() {
  return (
    <div>
      <ToastContainer />
      <Index />
    </div>
  )
}

export default App
