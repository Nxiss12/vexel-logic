-- Ensure workflow_requests table has production-ready columns and indexes
CREATE TABLE IF NOT EXISTS public.workflow_requests (
  id BIGSERIAL PRIMARY KEY,
  profession TEXT,
  name TEXT,
  email TEXT,
  phone TEXT,
  zip_code TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add missing columns if table existed with fewer columns (idempotent)
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS profession TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS zip_code TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE public.workflow_requests ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Indexes useful for admin listing and filtering
CREATE INDEX IF NOT EXISTS idx_workflow_requests_created_at ON public.workflow_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_workflow_requests_email ON public.workflow_requests(email);
CREATE INDEX IF NOT EXISTS idx_workflow_requests_phone ON public.workflow_requests(phone);
CREATE INDEX IF NOT EXISTS idx_workflow_requests_profession ON public.workflow_requests(profession);
CREATE INDEX IF NOT EXISTS idx_workflow_requests_status ON public.workflow_requests(status);
