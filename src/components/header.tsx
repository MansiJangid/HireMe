// import React from 'react'

import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <nav className="py-4 px-10 m-2 flex justify-between items-center">
      <Link to="/">
        <img src="/Logo.png" alt="Logo" className="h-15" />
      </Link>

      <Button variant="outline">Login</Button>
    </nav>
  )
}

export default Header