import { createClient } from "@supabase/supabase-js";

const SUPABASE = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

if (!SUPABASE.URL || !SUPABASE.ANON_KEY) {
  throw new Error("Missing Supabase URL or Anon Key");
}

export const supabase = createClient(SUPABASE.URL, SUPABASE.ANON_KEY);
