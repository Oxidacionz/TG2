import { Session } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

import { AppSession, AppUser, Role } from "@/types";
import { AuthEvent } from "@/types/enums";

import { authService } from "../services/AuthService";
import { AuthContext } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
  const { children } = props;
  const [session, setSession] = useState<AppSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getSession()
      .then((sess: { session: Session | null } | null) => {
        if (sess?.session?.user) {
          const user: AppUser = {
            id: sess.session.user.id,
            email: sess.session.user.email,
            role: Role.ADMIN,
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
              role: Role.ADMIN,
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
