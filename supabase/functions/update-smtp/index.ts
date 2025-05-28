import { serve } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { smtp } = await req.json();

    // Validate SMTP settings
    if (!smtp.host || !smtp.port || !smtp.username || !smtp.password || !smtp.senderEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required SMTP settings' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate port number
    const port = parseInt(smtp.port);
    if (isNaN(port) || port < 1 || port > 65535) {
      return new Response(
        JSON.stringify({ error: 'Invalid SMTP port number' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(smtp.senderEmail)) {
      return new Response(
        JSON.stringify({ error: 'Invalid sender email format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update Supabase SMTP settings using Admin API
    const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/auth/v1/admin/config`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'apikey': Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mailer: {
          enabled: true,
          smtp: {
            host: smtp.host,
            port: port,
            user: smtp.username,
            pass: smtp.password,
            sender_name: smtp.senderName || 'Resume Shortlister',
            sender_email: smtp.senderEmail,
            secure: port === 465,
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to update SMTP settings: ${error}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});