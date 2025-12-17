export interface Notification {
  id: number;
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export interface Note {
  id: number;
  content: string;
  created_at: string;
  is_global: boolean;
  status: "PENDIENTE" | "ENVIADO";
}

export interface DashboardContextType {
  refreshTrigger: number;
}
