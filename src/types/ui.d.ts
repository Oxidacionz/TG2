export interface Notification {
  id: number;
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export interface DashboardContextType {
  refreshTrigger: number;
}
