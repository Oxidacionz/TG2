import { createClient } from '@supabase/supabase-js';

// Credenciales de Supabase
const CREDENTIALS = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  KEY: import.meta.env.VITE_SUPABASE_KEY,
};

if (!CREDENTIALS.URL || !CREDENTIALS.KEY) {
  throw new Error('Missing Supabase credentials');
}

// Cliente de Supabase
const supabase = createClient(CREDENTIALS.URL, CREDENTIALS.KEY);

export { supabase };
