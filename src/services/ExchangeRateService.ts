// Servicio simple para obtener tasas del BCV
// Usa una API pública de scraping como intermediario

/* export const ExchangeRateService = {
  async getBCVRate(): Promise<{
    usd: number;
    eur: number;
    source: string;
  } | null> {
    try {
      // API pública de PyDolarVenezuela
      const response = await fetch(
        "https://pydolarvenezuela-api.vercel.app/api/v1/dollar/page?page=bcv",
      );

      if (response.ok) {
        const data = await response.json();
        return {
          usd: data.monitors?.usd?.price || 0,
          eur: data.monitors?.eur?.price || 0,
          source: "API (Online)",
        };
      }
      throw new Error("API Error");
    } catch (error) {
      console.warn("No se pudo obtener tasa BCV online:", error);
      // Fallback para demo si falla internet
      return { usd: 36.5, eur: 39.1, source: "Offline" };
    }
  },
}; */
