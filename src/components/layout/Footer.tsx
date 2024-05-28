import React from "react"

export const Footer = () => {
  return (
    <footer>
      <div>
        <label htmlFor="subscribe">Subscribe to Newsletter: </label>
        <input
          type="email"
          name="subscribe"
          id="subscribe"
          placeholder="Enter Your Email Address"
        />
        <button>Subscribe</button>
      </div>
      <div>
        <small>Copyright 2024 © Enas Kutbi. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
