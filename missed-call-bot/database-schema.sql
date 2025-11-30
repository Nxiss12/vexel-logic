-- Vexel Logic Missed Call Bot - Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Table: missed_calls
CREATE TABLE IF NOT EXISTS public.missed_calls (
    id BIGSERIAL PRIMARY KEY,
    call_sid TEXT UNIQUE NOT NULL,
    customer_phone TEXT NOT NULL,
    business_phone TEXT NOT NULL,
    call_status TEXT NOT NULL,
    sms_sent BOOLEAN DEFAULT FALSE,
    sms_sid TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Table: customer_responses
CREATE TABLE IF NOT EXISTS public.customer_responses (
    id BIGSERIAL PRIMARY KEY,
    customer_phone TEXT NOT NULL,
    message TEXT NOT NULL,
    message_sid TEXT UNIQUE NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_missed_calls_timestamp ON public.missed_calls(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_missed_calls_phone ON public.missed_calls(customer_phone);
CREATE INDEX IF NOT EXISTS idx_responses_timestamp ON public.customer_responses(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_responses_phone ON public.customer_responses(customer_phone);

-- Enable Row Level Security (RLS) - OPTIONAL
-- ALTER TABLE public.missed_calls ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.customer_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this later)
-- CREATE POLICY "Allow all operations" ON public.missed_calls FOR ALL USING (true);
-- CREATE POLICY "Allow all operations" ON public.customer_responses FOR ALL USING (true);

-- Grant permissions to anon key (Supabase default)
GRANT ALL ON public.missed_calls TO anon, authenticated;
GRANT ALL ON public.customer_responses TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE missed_calls_id_seq TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE customer_responses_id_seq TO anon, authenticated;

