// import api from "./api"

import "./App.css"
import Index from "./routes"
// import { useEffect } from "react"

function App() {
  /*const getProducts = async () => {
    try {
      console.log("I am running");
      const res = await api.get("/products")
      console.log(res.data.data.items);
      // return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  useEffect(() => {
    getProducts();
  }, []);
  */
  return < Index />
}

export default App
