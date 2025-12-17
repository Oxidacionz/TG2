import { Role } from "./enums";

export interface Client {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  created_at?: string;
}

export interface Operator {
  id: string;
  username: string;
  role: Role;
  last_active: string;
  is_active: boolean;
}
