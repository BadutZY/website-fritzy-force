import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let roomUrlKey = 'JKT48_Erine';
    try {
      const body = await req.json();
      if (body?.room_url_key) {
        roomUrlKey = body.room_url_key;
      }
    } catch {
      // No body provided, use default
    }

    const apiUrl = `https://www.showroom-live.com/api/room/status?room_url_key=${encodeURIComponent(roomUrlKey)}`;

    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();

    const isLive = data?.is_live === true || data?.live_status === 2;

    return new Response(
      JSON.stringify({
        is_live: isLive,
        room_url_key: roomUrlKey,
        room_name: data?.room_name ?? null,
        started_at: data?.started_at ?? null,
        image: data?.image_s ?? null,
        checked_at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error checking Showroom live status:', error);
    return new Response(
      JSON.stringify({
        is_live: false,
        error: 'Failed to check Showroom live status',
        checked_at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }
});
