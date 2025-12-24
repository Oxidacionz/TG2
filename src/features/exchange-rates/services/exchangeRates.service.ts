import supabaseClient from "@/lib/supabaseClient";

import { ExchangeRate } from "../types";

export const ExchangeRateService = {
  async getInitialRates(): Promise<ExchangeRate[]> {
    const { data, error } = await supabaseClient
      .from("current_rates")
      .select("*");

    if (error) {
      console.error("Error fetching initial rates:", error);
      throw new Error(error.message);
    }

    return data as ExchangeRate[];
  },

  async updateInternalRate(value: number): Promise<void> {
    const { error } = await supabaseClient
      .from("current_rates")
      .update({ value, updated_at: new Date().toISOString() })
      .match({ source: "Internal", symbol: "VES" });

    if (error) {
      console.error("Error updating internal rate:", error);
      throw new Error(error.message);
    }
  },
};
