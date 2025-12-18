import { ExchangeProvider, ExchangeRateResponse } from "../types";

/**
 * Interfaz principal del servicio de tasas de cambio.
 * Define los métodos necesarios para obtener tasas y realizar cálculos.
 */
export interface IExchangeRateService {
  /**
   * Obtiene la tasa de cambio actual desde la API.
   * @param from Moneda origen (ej. USD).
   * @param to Moneda destino (ej. VES).
   * @param provider Proveedor específico de tasa (opcional).
   */
  getExchangeRate(
    from: string,
    to?: string,
    provider?: ExchangeProvider,
  ): Promise<ExchangeRateResponse>;

  /**
   * Calcula el valor equivalente en Bolívares (VES) dado un monto en USD y una tasa.
   * @param amountUSD Monto en dólares.
   * @param rate Tasa de cambio.
   * @returns String con el valor formateado a 2 decimales.
   */
  calculateVES(amountUSD: number, rate: number): string;

  /**
   * Calcula la ganancia (profit) basada en un porcentaje del monto.
   * @param amountUSD Monto base en dólares.
   * @param percentage Porcentaje de ganancia deseado.
   * @returns Valor numérico de la ganancia.
   */
  calculateProfit(amountUSD: number, percentage: number): number;
}

/**
 * Clase personalizada para manejar errores específicos del servicio de intercambio.
 * Facilita la identificación de errores de negocio vs errores de sistema.
 */
export class ExchangeServiceError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ExchangeServiceError";
  }
}

/**
 * Configuración para inicializar el servicio (opcional).
 * Útil para pruebas o inyección de dependencias.
 */
interface ServiceConfig {
  apiUrl?: string;
  apiKey?: string;
}

/**
 * Estructura de respuesta de error que devuelve la API.
 */
interface ApiErrorResponse {
  error?: string;
  message?: string;
}

/**
 * Implementación concreta del servicio de tasas de cambio.
 */
export class ExchangeRateServiceImpl implements IExchangeRateService {
  /** Variables inmutables que almacenan la URL y Key de la API */
  private readonly API_URL: string;
  private readonly API_KEY: string;

  /**
   * Inicializa el servicio.
   * Prioriza la configuración inyectada, luego las variables de entorno, y finalmente strings vacíos.
   */
  constructor(config?: ServiceConfig) {
    const { apiUrl, apiKey } = config || {};

    let url = apiUrl || import.meta.env.VITE_EXCHANGE_CORE_URL || "";

    // Normalizar URL: asegurar que tenga protocolo
    if (url && !url.startsWith("http")) {
      url = `https://${url}`;
    }

    // Quitar slash final si existe para consistencia
    this.API_URL = url.replace(/\/$/, "");
    this.API_KEY = apiKey || import.meta.env.VITE_EXCHANGE_CORE_KEY || "";

    // Advertencia en desarrollo si no hay URL configurada
    if (!this.API_URL) {
      console.warn(
        "ExchangeRateService: API URL no configurada. Las peticiones fallarán.",
      );
    }
  }

  /**
   * Realiza la petición HTTP a la API para obtener las tasas.
   */
  async getExchangeRate(
    from: string,
    to: string = "VES",
    provider?: ExchangeProvider,
  ): Promise<ExchangeRateResponse> {
    if (!this.API_URL) {
      throw new Error(
        "ExchangeRateService: La URL de la API no está configurada (VITE_EXCHANGE_CORE_URL).",
      );
    }

    let fullUrl = "";

    if (provider) {
      // Patrón RESTful: /rates/provider/from-to
      fullUrl = `${this.API_URL}/rates/${provider.toLowerCase()}/${from.toLowerCase()}-${to.toLowerCase()}`;
    } else {
      // Fallback a query params si no hay proveedor específico
      const queryParams = new URLSearchParams({ from, to });
      fullUrl = `${this.API_URL}/rates?${queryParams}`;
    }

    try {
      console.log(`ExchangeRateService: Fetching ${fullUrl}`);
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "x-api-key": this.API_KEY,
          "Content-Type": "application/json",
        },
      });

      const text = await response.text();
      let data: ApiErrorResponse | ExchangeRateResponse;

      try {
        data = JSON.parse(text);
      } catch {
        console.error("ExchangeRateService: Error parseando JSON", {
          url: fullUrl,
          status: response.status,
          responseText: text,
        });
        throw new Error(
          `La respuesta del servidor no es JSON válido (Status: ${response.status}). Posible error de ruta o servidor caído.`,
        );
      }

      if (!response.ok) {
        this.handleError(response.status, data as ApiErrorResponse);
      }

      return data as ExchangeRateResponse;
    } catch (error) {
      // Si el error ya es conocido (ExchangeServiceError), se relanza tal cual
      if (error instanceof ExchangeServiceError) {
        throw error;
      }

      // Captura errores de red o inesperados y los envuelve en un Error estándar
      console.error("ExchangeRateService Network Error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      throw new Error(
        `Error de conexión con el servicio de tasas: ${errorMessage}`,
      );
    }
  }

  /**
   * Helper para multiplicar monto por tasa.
   */
  calculateVES(amountUSD: number, rate: number): string {
    return (amountUSD * rate).toFixed(2);
  }

  /**
   * Helper para calcular comisiones o ganancias.
   */
  calculateProfit(amountUSD: number, percentage: number): number {
    return amountUSD * (percentage / 100);
  }

  /**
   * Método privado para manejo centralizado de errores HTTP.
   * Convierte códigos de estado HTTP en mensajes amigables y lanza ExchangeServiceError.
   */
  private handleError(status: number, data: ApiErrorResponse): never {
    let message =
      data.error || data.message || "Error desconocido del servidor";

    switch (status) {
      case 401:
        message = "Error de autenticación: API Key inválida o faltante.";
        break;
      case 429:
        message = "Límite de peticiones excedido. Reintenta en un minuto.";
        break;
      case 500:
      case 502:
        message = `Error interno del proveedor: ${message}`;
        break;
    }

    throw new ExchangeServiceError(status, message);
  }
}

// Exportar una instancia singleton por defecto para uso general en la app
export const exchangeRateService = new ExchangeRateServiceImpl();
