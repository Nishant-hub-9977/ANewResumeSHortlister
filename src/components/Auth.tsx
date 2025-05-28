import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const handleGuestAccess = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `guest_${Date.now()}@example.com`,
        password: 'guest123'
      });

      if (error) throw error;
      if (data.user) {
        navigate('/');
      }
    } catch (error) {
      console.error('Guest access error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or try our platform without signing up
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleGuestAccess}
            className="w-full btn btn-secondary mb-6 group"
          >
            <LogIn className="mr-2 h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            Continue as Guest
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google']}
              redirectTo="https://gleaming-babka-c99335.netlify.app/dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;