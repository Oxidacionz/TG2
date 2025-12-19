import { Role } from "@/types/enums";

export interface AppUser {
  id: string;
  email?: string;
  role?: Role;
}

export interface AppSession {
  user: AppUser;
  // Add other session fields if needed
}
