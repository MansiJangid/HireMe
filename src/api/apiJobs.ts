import supabaseClient from "@/utils/supabase";

export type Job = {
  id: string;
  title: string;
  location: string;
  company_id: string;
  description?: string;
  created_at?: string;
};

interface JobFilters {
  location?: string;
  company_id?: string;
  searchQuery?: string;
}

export async function getJobs(token: string, options?: JobFilters) {
  const supabase = await supabaseClient(token);
  const { location, company_id, searchQuery } = options || {};

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), saved:saved_jobs(id)");

  if (location) query = query.eq("location", location);
  if (company_id) query = query.eq("company_id", company_id);
  if (searchQuery) query = query.ilike("title", `%${searchQuery}%`);

  const { data, error } = await query;
  if (error) {
    console.error("Error Fetching Jobs:", error);
    return null;
  }

  return data;
}

export async function toggleSaveJob(
  token: string,
  user_id: string,
  job_id: string,
  alreadySaved: boolean
) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", job_id)
      .eq("user_id", user_id);

    if (error) {
      console.error("Error removing saved job:", error);
      return null;
    }
    return data;
  } else {
    const { data, error } = await supabase
      .from("saved_jobs")
      .insert([{ user_id, job_id }])
      .select();

    if (error) {
      console.error("Error saving job:", error);
      return null;
    }
    return data;
  }
}


export interface Application {
  id: string;
  user_id: string;
  job_id: string;
  created_at: string;
  // add more fields if your applications table has them
}

export interface Company {
  name: string;
  logo_url?: string;
}

export interface SingleJob {
  id: string;
  title: string;
  description?: string;
  location?: string;
  company_id: string;
  created_at?: string;
  company: Company;
  applications: Application[];
}

export async function getSingleJob(
  token: string,
  id: string
): Promise<SingleJob | null> {
  const supabase = await supabaseClient(token);
  const jobId = Number(id);
if (isNaN(jobId)) {
  console.error("Invalid Job ID:", id);
  return null;
}
  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url), applications:applications(*)")
    .eq("id", jobId)
    .single<SingleJob>();

  if (error) {
    console.error("Error Fetching Job:", error);
    return null;
  }

  return data;
}
