import api from "./api"

import "./App.css"
import { useEffect } from "react"

function App() {
  const getProducts = async () => {
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

  return (
    <div className="App">
      <h1>Welcome to E-commerce app</h1>
    </div>
  )
}

export default App
