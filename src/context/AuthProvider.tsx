import React, { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { AppSession, AppUser, Role } from "../types";
import { authService } from "../services/AuthService";
import { AuthEvent } from "../types/enums";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
  const { children } = props;
  const [session, setSession] = useState<AppSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    authService
      .getSession()
      .then((sess: { session: Session | null } | null) => {
        // Mocking AppSession structure for now to fit strict types
        // In real world, we extract this from Supabase session metadata
        if (sess?.session?.user) {
          const user: AppUser = {
            id: sess.session.user.id,
            email: sess.session.user.email,
            role: Role.ADMIN, // Defaulting to ADMIN for dev, should come from user_metadata
          };
          setSession({ user });
        }
        setLoading(false);
      });

    const { unsubscribe } = authService.subscribeToAuthChanges(
      (event, session: Session | null) => {
        if (event === AuthEvent.SIGNED_IN || event === AuthEvent.SIGNED_OUT) {
          if (session?.user) {
            const user: AppUser = {
              id: session.user.id,
              email: session.user.email,
              role: Role.ADMIN, // Defaulting to ADMIN
            };
            setSession({ user });
          } else {
            setSession(null);
          }
        }
      },
    );

    return () => unsubscribe();
  }, []);

  const user = session?.user || null;

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export useAuth moved to src/hooks/useAuth.ts
