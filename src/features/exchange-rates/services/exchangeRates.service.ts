import { supabase } from "@/lib/supabaseClient";
import { ExchangeRate } from "../types";

export const ExchangeRateService = {
  /**
   * Fetches the initial state of exchange rates from Supabase.
   * Returns a list of current rates.
   */
  async getInitialRates(): Promise<ExchangeRate[]> {
    const { data, error } = await supabase.from("current_rates").select("*");

    if (error) {
      console.error("Error fetching initial rates:", error);
      throw new Error(error.message);
    }

    return data as ExchangeRate[];
  },
};
