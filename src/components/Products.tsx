import React, { useEffect } from "react"

const Products = () => {

    useEffect(() => {
        console.log("fetch product data")
    }, [])
    return <div>Products</div>
}

export default Products