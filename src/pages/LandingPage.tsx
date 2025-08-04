// import React from "react"
import { Link } from 'react-router-dom'
import '../index.css'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'


const faqs = [
    {
        question: "How do I create an account on JobQuest?",
        answer: "Creating an account is simple! Click on the 'Sign Up' button, choose whether you're a job seeker or employer, fill in your basic information, and verify your email address. You'll be ready to start your journey within minutes."
    },
    {
        question: "Is JobQuest free to use for job seekers?",
        answer: "Yes, JobQuest is completely free for job seekers. You can search and apply for jobs, create your profile, upload your resume, and communicate with employers at no cost."
    },
    {
        question: "How much does it cost for employers to post jobs?",
        answer: "We offer flexible pricing plans for employers. You can post individual jobs starting from $99, or choose from our monthly subscription plans that include multiple job postings, premium features, and enhanced visibility."
    },
    {
        question: "How does the job matching algorithm work?",
        answer: "Our smart matching algorithm analyzes your skills, experience, location preferences, and career goals to suggest the most relevant job opportunities. The more complete your profile, the better our recommendations become."
    },
    {
        question: "Can I edit or delete my job applications?",
        answer: "Once submitted, job applications cannot be edited or deleted as they are sent directly to employers. However, you can always update your profile and resume to ensure future applications reflect your most current information."
    }
];


const LandingPage = () => {
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



            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about using JobQuest
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible>
                        {faqs.map((faq, index) => {
                            return (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index + 1}`}
                                    className="bg-card border border-border rounded-lg px-6 py-2 shadow-card hover:shadow-glow transition-all duration-300"
                                >
                                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>)
                        })}
                    </Accordion>
                </div>
            </div>
        </main>
    )
}

export default LandingPage