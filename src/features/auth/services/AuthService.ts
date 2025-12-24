import {
  AuthChangeEvent,
  Session,
  User,
  WeakPassword,
} from "@supabase/supabase-js";

import supabaseClient from "@/lib/supabaseClient";

export interface IAuthService {
  getSession(): Promise<{ session: Session | null }>;
  signOut(): Promise<void>;
  signInWithPassword(
    email: string,
    password: string,
  ): Promise<{
    error: Error | null;
    data: {
      user: User | null;
      session: Session | null;
      weakPassword?: WeakPassword | null;
    };
  }>;
  subscribeToAuthChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ): { unsubscribe: () => void };
}

class SupabaseAuthService implements IAuthService {
  async getSession() {
    const { data } = await supabaseClient.auth.getSession();
    return { session: data.session };
  }

  async signOut() {
    await supabaseClient.auth.signOut();
  }

  async signInWithPassword(email: string, password: string) {
    return await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
  }

  subscribeToAuthChanges(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange(callback);
    return subscription;
  }
}

export const authService = new SupabaseAuthService();
