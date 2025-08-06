import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = <T = any>(
    cb: any,
    options: Record<string, any> = {}
) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const { session } = useSession();

    const fn = async (...args: any[]) => {
        setLoading(true);
        setError(null);

        try {
            const supabaseAccessToken = await session?.getToken({
                template: "supabase",
            });

            const response = await cb(supabaseAccessToken as string, options, ...args);
            setData(response);
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            } else {
                setError(new Error("Unknown error"));
            }
        } finally {
            setLoading(false);
        }
    };

    return { fn, data, loading, error };
};

export default useFetch;
