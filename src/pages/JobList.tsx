import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/user-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";

// ✅ Define Job type
type Job = {
  id: string;
  title: string;
  description: string;
  location?: string;
  company?: string;
  // Add other properties based on your actual response
};

const JobList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [company_id, setCompany_id] = useState<string>("");

  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
    // error,
  } = useFetch<Job[]>(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Job
      </h1>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => {
              return <JobCard key={job.id} job={job} />
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList;
