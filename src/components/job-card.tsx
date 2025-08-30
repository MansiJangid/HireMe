import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { toggleSaveJob } from "@/api/apiJobs";

interface Job {
  id: string;
  title: string;
  description: string;
  location?: string;
  company: {
    name:string
    logo_url: string;
  };
}

interface JobCardProps {
  job: Job;
  isMyJob?: boolean;
  savedInit?: boolean;
  onJobSaved?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const [saved, setSaved] = useState(savedInit);
  const [loading, setLoading] = useState(false);

const { user } = useUser();
const { getToken } = useAuth();
  const handleSaveJob = async () => {
    if (!user) return;
    setLoading(true);

    const token = await getToken({ template: "supabase" });
    await toggleSaveJob(token!, user.id, job.id, saved);

    setSaved(!saved);
    setLoading(false);
    onJobSaved();
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon fill="red" size={18} className="text-red-300 cursor-pointer" />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company?.logo_url && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description.substring(0, job.description.indexOf("."))}
      </CardContent>

      <CardFooter className="flex gap-2">
        <Link to={`/jobs/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            onClick={handleSaveJob}
            disabled={loading}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
