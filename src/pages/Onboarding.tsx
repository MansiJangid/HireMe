import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners"


const Onboarding = () => {

  const {user, isLoaded} = useUser();
  const navigate = useNavigate();

  const handleRoleSelection = async(role: string) => {   // storing roles in clerk instead of supabase
    await user?.update({
      unsafeMetadata:{role}, 
    }).then(()=>{
        navigate(role==='recuriter' ? "/post-job" :"/jobs")
    })
  };


  if(!isLoaded){
    return<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>;
  };

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a 
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button variant='outline' onClick={()=>handleRoleSelection("candidate")}>
          Candidate
        </Button>
        <Button variant='outline'onClick={()=>handleRoleSelection("recruiter")}>
          Recruiter
        </Button>
      </div>
    </div>
  )
}
export default Onboarding