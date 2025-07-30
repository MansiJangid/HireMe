import { Button } from "@/components/ui/button"


export const Onboarding = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a 
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button variant='outline'>
          Candidate
        </Button>
        <Button variant='outline'>
          Recruiter
        </Button>
      </div>
    </div>
  )
}
export default Onboarding