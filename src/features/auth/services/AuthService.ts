import { supabase } from "@/lib/supabaseClient";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

// Abstraction (Interface)
export interface IAuthService {
  getSession(): Promise<{ session: Session | null }>;
  signOut(): Promise<void>;
  signInWithPassword(
    email: string,
    password: string,
  ): Promise<{
    error: Error | null;
    data: { user: User; session: Session } | null;
  }>;
  subscribeToAuthChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ): { unsubscribe: () => void };
}

// Low-level Module (Implementation)
class SupabaseAuthService implements IAuthService {
  async getSession() {
    const { data } = await supabase.auth.getSession();
    return { session: data.session };
  }

  async signOut() {
    await supabase.auth.signOut();
  }

  async signInWithPassword(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  subscribeToAuthChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(callback);
    return subscription;
  }
}

// Dependency Injection (Singleton for now)
export const authService = new SupabaseAuthService();
