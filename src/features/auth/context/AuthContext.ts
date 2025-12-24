import { createContext } from "react";

import { AppSession, AppUser } from "@/types";

export interface AuthContextType {
  user: AppUser | null;
  session: AppSession | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});
