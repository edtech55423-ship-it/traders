import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "../lib/supabase";

type AuthContextType = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Effect 1: auth state (login/logout/token refresh).
  // onAuthStateChange fires an INITIAL_SESSION event on mount with the
  // current session, so a separate getSession() call is not needed.
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Effect 2: single-device-login enforcement.
  // Only (re)subscribes when the logged-in user changes, and filters
  // at the database level so this browser only receives realtime
  // events for its OWN user's row. Requires: RLS SELECT policy on
  // active_sessions, an explicit GRANT SELECT to `authenticated`,
  // and REPLICA IDENTITY FULL on the table (since the filter column
  // `user_id` isn't the primary key).
  useEffect(() => {
    const userId = session?.user?.id;
    if (!userId) return;

    const channel = supabase
      .channel(`active-session-listener-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "active_sessions",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newSession = payload.new as {
            user_id: string;
            session_id: string;
          };

          const localSessionId = localStorage.getItem("active_session_id");

          if (localSessionId && localSessionId !== newSession.session_id) {
            localStorage.removeItem("active_session_id");
            supabase.auth.signOut().finally(() => {
              window.location.href = "/login";
            });
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [session?.user?.id]);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components, react/only-export-components
export const useAuth = () => useContext(AuthContext);
