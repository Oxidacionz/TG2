import { Role } from "./enums";

// Removed type alias as it's now an Enum imported above

export interface AppUser {
  id: string;
  email?: string;
  role?: Role;
}

export interface AppSession {
  user: AppUser;
  // Add other session fields if needed
}
