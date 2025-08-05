// import React from 'react'

import { SignedIn, SignedOut, SignIn, UserButton, useUser } from "@clerk/clerk-react"
import { Link, useSearchParams } from "react-router-dom"
import { Button } from "./ui/button"
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react"
import { useEffect, useState } from "react"
// import PostJob from "@/pages/PostJob"

const Header = () => {

  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const {user} = useUser();

  useEffect(()=>{
    if(search.get("sign-in")){
      setShowSignIn(true);
      setSearch({});
    }
  }, [search]);

  const handleOverlayClick = (e: { target: any; currentTarget: any }) =>{
    if(e.target == e.currentTarget){
      setShowSignIn(false);
    }
  }

  return (
    <div>
      <nav className="py-4 px-10 m-2 flex justify-between items-center">
        <Link to="/">
          <img src="/Logo.png" alt="Logo" className="h-15" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>Login</Button>

          </SignedOut>
          <SignedIn>
            { user?.unsafeMetadata?.role =="recruiter" && ( <Link to={"/PostJob"}>
                <Button variant='outline' className="rounded-full gap-0.5">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton appearance={{
              elements:{
                avatarBox: "w-10 h-10",
              },
            }}>
              <UserButton.MenuItems>
                <UserButton.Link
                label="My Jobs"
                labelIcon={<BriefcaseBusiness size={15}/>}
                href="/my-jobs"
                />
                <UserButton.Link
                label="Saved Jobs"
                labelIcon={<Heart size={15}/>}
                href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>

        </div>
      </nav>


      {showSignIn && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                          onClick={handleOverlayClick}>
        <SignIn
          signUpForceRedirectUrl="/onboarding"
          fallbackRedirectUrl="/onboarding" 
        />
      </div>
      }
    </div>
  )
}

export default Header