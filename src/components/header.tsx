// import React from 'react'

// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

const Header = () => {
  return (
    <nav className="py-4 px-10 m-2 flex justify-between items-center">
      <Link to="/">
        <img src="/Logo.png" alt="Logo" className="h-15" />
      </Link>

      <Button variant="outline">Login</Button>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
      
    </nav>
  )
}

export default Header