// Constants file cleaned up. Enums moved to src/types/enums.
export const APP_NAME = "Toro Group Financial";

export const RATES_CONFIG = {
  BCV: {
    // Hora de actualización automática (Formato 24h)
    SCHEDULED_TIME: "17:00",
    // Offset de zona horaria (Venezuela = UTC-4)
    TIMEZONE_OFFSET: -4,
  },
  BINANCE: {
    // Intervalo de actualización en milisegundos (5 minutos)
    REFRESH_INTERVAL_MS: 5 * 60 * 1000,
  },
};
