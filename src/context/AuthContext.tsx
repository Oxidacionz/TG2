import React, { createContext, useContext, useEffect, useState } from "react";
import { AppSession, AppUser, Role } from "../types";
import { authService } from "../services/AuthService";
import { AuthEvent } from "../types/enums";

interface AuthContextType {
  user: AppUser | null;
  session: AppSession | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useState<AppSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    authService.getSession().then((sess: any) => {
      // Mocking AppSession structure for now to fit strict types
      // In real world, we extract this from Supabase session metadata
      if (sess?.session?.user) {
        const user = {
          id: sess.session.user.id,
          email: sess.session.user.email,
          role: Role.ADMIN, // Defaulting to ADMIN for dev, should come from user_metadata
        };
        setSession({ user });
      }
      setLoading(false);
    });

    const { unsubscribe } = authService.subscribeToAuthChanges(
      (event, session: any) => {
        if (event === AuthEvent.SIGNED_IN || event === AuthEvent.SIGNED_OUT) {
          if (session?.user) {
            const user = {
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

export const useAuth = () => useContext(AuthContext);
