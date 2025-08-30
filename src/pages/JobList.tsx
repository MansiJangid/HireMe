import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/job-card";
import useFetch from "@/hooks/user-fetch";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import BarLoader from "react-spinners/BarLoader";
// import { useAuth } from "@clerk/clerk-react";
import { getCompaines } from "@/api/apiCompanies";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";

export interface Job {
  id: string;
  title: string;
  description: string;
  location?: string;
  company: {
    name:string
    logo_url: string;
  };
  saved: { id: string }[];
}[]

const JobList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const { isLoaded, user } = useUser();
  // const { getToken } = useAuth();

  const {
    fn: fnJobs,
    data: jobs,
    loading: loadingJobs,
  } = useFetch<Job[]>(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const {
    fn: fnCompanies,
    data: companies,
  } = useFetch<Job[]>(getCompaines);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded, fnCompanies]);


  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query  = formData.get("search-query");
    if (typeof query === "string") setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="p-10">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Job
      </h1>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
      )}

      <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3">
        <Input type="text" placeholder="Search Jobs by Titles..." name="search-query" className="h-full flex-1 px-4 text-md"></Input>
        <Button type="submit" className="h-full sm:w-28" variant="blue">Search</Button>
      </form>
      <div className="flex w-full gap-4">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>


         {/* <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ company, id  }) => {
                return (
                  <SelectItem key={company.name} value={id}>
                    {company.name}
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>  */}

        <Button onClick={clearFilters} variant="blue" className="w-[180px] ">Clear Filters</Button>
      </div>
      {!loadingJobs && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.length ? (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                savedInit={job.saved?.length > 0}
                onJobSaved={fnJobs}
              />
            ))
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobList;
