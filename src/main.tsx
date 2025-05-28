import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import posthog from 'posthog-js';
import { supabase } from './lib/supabase';
import App from './App.tsx';
import './index.css';

// Initialize PostHog only if API key is available
const posthogKey = import.meta.env.VITE_POSTHOG_KEY;
if (posthogKey) {
  posthog.init(posthogKey, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.DEV) posthog.opt_out_capturing();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>
);