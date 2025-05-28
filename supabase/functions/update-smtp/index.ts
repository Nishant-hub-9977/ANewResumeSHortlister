import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
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

    // Update Supabase SMTP settings using Admin API
    const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/auth/v1/admin/config`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mailer: {
          enabled: true,
          smtp: {
            host: smtp.host,
            port: parseInt(smtp.port),
            user: smtp.username,
            pass: smtp.password,
            sender_name: smtp.senderName,
            sender_email: smtp.senderEmail,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update SMTP settings');
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