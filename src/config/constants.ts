export const AUTH_EVENTS = {
  SIGNED_IN: "SIGNED_IN",
  SIGNED_OUT: "SIGNED_OUT",
} as const;

export const ROLES = {
  ADMIN: "ADMIN",
  DEV: "DEV",
  OPERATOR: "OPERADOR",
} as const;

export const TRANSACTION_TYPES = {
  INCOME: "ENTRADA",
  EXPENSE: "SALIDA",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];
