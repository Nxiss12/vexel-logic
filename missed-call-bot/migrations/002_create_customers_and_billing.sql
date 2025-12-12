-- Create customers table
CREATE TABLE IF NOT EXISTS public.customers (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    stripe_customer_id TEXT,
    subscription_active BOOLEAN DEFAULT FALSE,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create billing events
CREATE TABLE IF NOT EXISTS public.billing_events (
    id BIGSERIAL PRIMARY KEY,
    stripe_event_id TEXT UNIQUE,
    type TEXT,
    payload JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

GRANT ALL ON public.customers TO anon, authenticated;
GRANT ALL ON public.billing_events TO anon, authenticated;
