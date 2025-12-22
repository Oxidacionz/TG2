import { supabase } from "@/lib/supabaseClient";
import { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

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

export const authService = new SupabaseAuthService();
