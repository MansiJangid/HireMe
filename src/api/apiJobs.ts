import supabaseClient from "@/utils/supabase";

// ✅ Define the Job type (adjust fields based on your actual DB schema)
type Job = {
    id: string;
    title: string;
    location: string;
    company_id: string;
    description?: string;
    created_at?: string;
    // add more fields if needed
};

// ✅ Define the filter parameters type
interface JobFilters {
    location?: string;
    company_id?: string;
    searchQuery?: string;
}

// ✅ Typed function
export async function getJobs(
    token: string,
    options?: JobFilters
): Promise<Job[] | null> {
    const { location, company_id, searchQuery } = options || {};
    const supabase = await supabaseClient(token);

    let query = supabase.from("jobs").select("*, company:companies(name, logo_url), saved: saved_jobs(id)");

    if (location) {
        query = query.eq("location", location);
    }

    if (company_id) {
        query = query.eq("company_id", company_id);
    }

    if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Error Fetching Jobs: ", error);
        return null;
    }

    return data as Job[]; // safely assert the expected type
}
