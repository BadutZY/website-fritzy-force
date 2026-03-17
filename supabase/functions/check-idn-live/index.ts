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
    // Accept username from request body, default to jkt48_erine
    let username = 'jkt48-official';
    try {
      const body = await req.json();
      if (body?.username) {
        username = body.username;
      }
    } catch {
      // No body provided, use default
    }

    const profileUrl = `https://www.idn.app/${username}`;

    const response = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'id-ID,id;q=0.9,en;q=0.8',
      },
    });

    const html = await response.text();

    const liveIndicators = [
      'sedang live',
      'is-live',
      'live-badge',
      'live-room',
      'btn-watch-live',
      'live_stream',
      'playback_url',
      '"isLive":true',
      '"is_live":true',
      'data-live="true"',
      'class="live"',
      'status.*live',
      'LIVE</span>',
      'LIVE</div>',
      'LIVE</p>',
    ];

    const htmlLower = html.toLowerCase();
    const isLive = liveIndicators.some(indicator =>
      htmlLower.includes(indicator.toLowerCase())
    );

    let isLiveFromHomepage = false;
    try {
      const homepageRes = await fetch('https://www.idn.app/?category=jkt48', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      const homepageHtml = await homepageRes.text();
      const erineInLiveSection = homepageHtml.includes(username) &&
        (homepageHtml.includes('live/') || homepageHtml.includes('live-room'));
      if (erineInLiveSection) {
        isLiveFromHomepage = true;
      }
    } catch (e) {
      console.error('Failed to check homepage:', e);
    }

    const finalIsLive = isLive || isLiveFromHomepage;

    return new Response(
      JSON.stringify({
        is_live: finalIsLive,
        username,
        checked_at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error checking live status:', error);
    return new Response(
      JSON.stringify({
        is_live: false,
        error: 'Failed to check live status',
        checked_at: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }
});
