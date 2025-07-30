// import React from "react"
import { Link } from 'react-router-dom'
import '../index.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card'

const LandingPage = () =>{
    return (
        <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
            <section className='text-center'>
                <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">Your Dream Job, Just a Click Away
                    {/* ek logo bhi aayega span me h1 ke andar*/}
                </h1>
                <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
                    Find your job or the perfect candidate is now easy with us!
                </p>
            </section>
            <div className='flex gap-6 justify-center'>
                <Link to='/Jobs'>
                    <Button variant='outline' size='lg' >
                        Find Jobs
                    </Button>
                </Link>
                <Link to='/post-job'>
                    <Button variant='outline' size='lg'>
                        Post Jobs
                    </Button>
                </Link>
            </div>
            {/* carousal */}
            {/* banner */}
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Job Seekers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Search and Apply for Jobs, Track Applications, & more...</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Employers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Post Jobs, Manage Applications, & Find the Best Candidates.</p>
                    </CardContent>
                </Card>
            </section>

            {/* Accordion for FAQs */}
        </main>
    )
}

export default LandingPage