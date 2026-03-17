
CREATE TABLE public.fritzy_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  show_title TEXT NOT NULL,
  show_date DATE NOT NULL,
  show_time TEXT,
  show_url TEXT,
  has_fritzy BOOLEAN NOT NULL DEFAULT false,
  badge_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Allow public read access (no auth needed for viewing schedules)
ALTER TABLE public.fritzy_schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on fritzy_schedules"
  ON public.fritzy_schedules
  FOR SELECT
  TO anon, authenticated
  USING (true);
