import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});

// Guest session management
const GUEST_KEY = 'guest_session';

interface GuestSession {
  email: string;
  password: string;
  createdAt: number;
}

export const getStoredGuestSession = (): GuestSession | null => {
  const stored = localStorage.getItem(GUEST_KEY);
  if (!stored) return null;
  
  try {
    const session = JSON.parse(stored) as GuestSession;
    // Check if session is less than 24 hours old
    if (Date.now() - session.createdAt < 24 * 60 * 60 * 1000) {
      return session;
    }
    // Clear expired session
    localStorage.removeItem(GUEST_KEY);
    return null;
  } catch {
    return null;
  }
};

export const storeGuestSession = (email: string, password: string) => {
  const session: GuestSession = {
    email,
    password,
    createdAt: Date.now()
  };
  localStorage.setItem(GUEST_KEY, JSON.stringify(session));
};

export const clearGuestSession = () => {
  localStorage.removeItem(GUEST_KEY);
};