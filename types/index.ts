
export interface Transaction {
  id: string;
  date: string;
  ref: string;
  client: string;
  clientBank: string;
  amount: number;
  currency: string;
  type: 'ENTRADA' | 'SALIDA';
  operator: string;
  rate: number;
  profit: number;
  status: 'Completado' | 'Pendiente' | 'Cancelado';
  notes?: string;
  targetAccount?: string;
  commission?: number;
  receipt_data?: string;
}

export interface Client {
  id: string;
  name: string;
  alias?: string;
  phone?: string;
  email?: string;
  notes?: string;
  created_at?: string;
}

export interface Account {
  id: string;
  bank_name: string;
  holder_name: string;
  account_number: string;
  currency: string;
  balance: number;
  type: 'BANCO' | 'WALLET' | 'EFECTIVO';
}

export interface Debt {
  id: string;
  created_at: string;
  type: 'COBRAR' | 'PAGAR';
  client_name: string;
  platform: string;
  amount: number;
  currency: string;
  due_date?: string;
  status: 'PENDIENTE' | 'PAGADO';
  notes?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  currency: string;
  category: 'OPERATIVO' | 'LOGISTICA';
  date: string;
  created_at?: string;
}

export interface Operator {
  id: string;
  username: string;
  role: 'ADMIN' | 'OPERADOR' | 'DEV'; // Actualizado con DEV
  email?: string;
  last_active?: string;
  is_active?: boolean;
}

export interface Note {
  id: string;
  content: string;
  created_at: string;
  sender_id?: string;
  target_id?: string;
  is_global: boolean;
  status: 'PENDIENTE' | 'LEIDO';
}

export interface AppConfig {
    id: number;
    global_rate_ves: number;
    global_rate_eur: number;
    whatsapp_api_key?: string;
    telegram_api_key?: string;
    ocr_enabled?: boolean;
}

export interface ChartDataPoint {
  name: string;
  volume: number;
  profit: number;
}