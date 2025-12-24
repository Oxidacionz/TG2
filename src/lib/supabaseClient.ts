import { createClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";

interface ENV_TYPE {
  URL: string;
  ANON_KEY: string;
}

const SUPABASE: ENV_TYPE = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

if (!SUPABASE.URL || !SUPABASE.ANON_KEY) {
  throw new Error("Missing Supabase URL or Anon Key");
}

const supabaseClient = createClient<Database>(SUPABASE.URL, SUPABASE.ANON_KEY);

export default supabaseClient;
