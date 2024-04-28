import { createClient } from "@supabase/supabase-js";

const URL = "https://laeczmsiamcedfnwvkup.supabase.co";

const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const supabase = createClient(URL, API_KEY);
