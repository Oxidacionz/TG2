import { createClient } from '@supabase/supabase-js';

// Credenciales proporcionadas
const supabaseUrl = 'https://kkkwfimgkemxwgvqvaob.supabase.co';
const supabaseKey = 'sb_publishable_Ao7kPUlHPzj8H1yBDyka4Q_fyhYshQt';

// Cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
