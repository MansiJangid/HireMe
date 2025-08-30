import { getSingleJob, type SingleJob } from "@/api/apiJobs";
import useFetch from "@/hooks/user-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Job = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams<{ id: string }>();

  const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch<SingleJob>(getSingleJob, {
    token: user?.id, // 👈 you'll likely need session token here instead of user.id
    id: id as string,
  });

  useEffect(() => {
    if (isLoaded && user) {
      fnJob();
    }
  }, [isLoaded, user]);

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  if (!job) {
    return <div className="text-center text-red-500">Job not found</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        {job.company.logo_url && (
          <img
            src={job.company.logo_url}
            alt={job.company.name}
            className="w-16 h-16 object-contain"
          />
        )}
        <h1 className="text-2xl font-bold">{job.title}</h1>
      </div>

      <p className="text-gray-700 mb-2">
        <strong>Company:</strong> {job.company.name}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Location:</strong> {job.location || "Not specified"}
      </p>
      <p className="text-gray-700 mb-6">{job.description}</p>

      <h2 className="text-lg font-semibold">Applications</h2>
      {job.applications?.length > 0 ? (
        <ul className="list-disc pl-6">
          {job.applications.map((app) => (
            <li key={app.id}>{app.user_id}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No applications yet.</p>
      )}
    </div>
  );
};

export default Job;
