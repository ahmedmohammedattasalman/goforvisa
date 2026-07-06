-- 1. Create tables
CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    email TEXT UNIQUE NOT NULL,
    city TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.bank_info (
    partner_id UUID PRIMARY KEY REFERENCES public.partners(id) ON DELETE CASCADE,
    bank_name TEXT NOT NULL,
    holder_name TEXT NOT NULL,
    rib TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_number TEXT UNIQUE NOT NULL,
    partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    nationality TEXT NOT NULL,
    dob DATE NOT NULL,
    country TEXT NOT NULL,
    visa_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'قيد المعالجة' CHECK (status IN ('تم الإنجاز', 'قيد المعالجة', 'في انتظار البيانات', 'ملغى')),
    commission NUMERIC DEFAULT 500,
    total_fee NUMERIC DEFAULT 3000,
    paid_1st NUMERIC DEFAULT 0,
    paid_2nd NUMERIC DEFAULT 0,
    notes TEXT,
    city TEXT,
    job TEXT,
    cnss TEXT,
    prev_rejection TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.payouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
    amount NUMERIC NOT NULL CHECK (amount > 0),
    method TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'قيد المراجعة' CHECK (status IN ('تم التحويل', 'قيد المراجعة', 'مرفوض', 'تم الدفع')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('success', 'info', 'warning')),
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create functions & triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.partners (id, name, email, phone, city, company)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'name', 'New Partner'),
        new.email,
        COALESCE(new.raw_user_meta_data->>'phone', ''),
        COALESCE(new.raw_user_meta_data->>'city', ''),
        COALESCE(new.raw_user_meta_data->>'company', '')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

CREATE SEQUENCE IF NOT EXISTS public.client_file_number_seq START WITH 127;

CREATE OR REPLACE FUNCTION public.generate_file_number() 
RETURNS trigger AS $$
DECLARE
    year_val TEXT;
    seq_val TEXT;
BEGIN
    year_val := to_char(now(), 'YYYY');
    seq_val := lpad(nextval('public.client_file_number_seq')::text, 6, '0');
    new.file_number := 'GFV-' || year_val || '-' || seq_val;
    RETURN new;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_file_number ON public.clients;
CREATE TRIGGER trg_generate_file_number
    BEFORE INSERT ON public.clients
    FOR EACH ROW
    WHEN (new.file_number IS NULL)
    EXECUTE PROCEDURE public.generate_file_number();

-- 3. Enable Row-Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 3b. Create Foreign Key Indexes (Best practice for performance on JOINs and cascading deletes)
CREATE INDEX IF NOT EXISTS clients_partner_id_idx ON public.clients (partner_id);
CREATE INDEX IF NOT EXISTS payouts_partner_id_idx ON public.payouts (partner_id);
CREATE INDEX IF NOT EXISTS notifications_partner_id_idx ON public.notifications (partner_id);

-- 4. Create RLS policies
DROP POLICY IF EXISTS "partners_owner" ON public.partners;
CREATE POLICY "partners_owner" ON public.partners
    FOR ALL TO authenticated
    USING ((select auth.uid()) = id)
    WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "bank_info_owner" ON public.bank_info;
CREATE POLICY "bank_info_owner" ON public.bank_info
    FOR ALL TO authenticated
    USING ((select auth.uid()) = partner_id)
    WITH CHECK ((select auth.uid()) = partner_id);

DROP POLICY IF EXISTS "clients_owner_select" ON public.clients;
CREATE POLICY "clients_owner_select" ON public.clients
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = partner_id);

DROP POLICY IF EXISTS "clients_owner_insert" ON public.clients;
CREATE POLICY "clients_owner_insert" ON public.clients
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = partner_id);

DROP POLICY IF EXISTS "payouts_owner_select" ON public.payouts;
CREATE POLICY "payouts_owner_select" ON public.payouts
    FOR SELECT TO authenticated
    USING ((select auth.uid()) = partner_id);

DROP POLICY IF EXISTS "payouts_owner_insert" ON public.payouts;
CREATE POLICY "payouts_owner_insert" ON public.payouts
    FOR INSERT TO authenticated
    WITH CHECK ((select auth.uid()) = partner_id);

DROP POLICY IF EXISTS "notifications_owner_all" ON public.notifications;
CREATE POLICY "notifications_owner_all" ON public.notifications
    FOR ALL TO authenticated
    USING ((select auth.uid()) = partner_id)
    WITH CHECK ((select auth.uid()) = partner_id);

-- 5. Auto-confirm emails for self-hosted instances
CREATE OR REPLACE FUNCTION public.autoconfirm_email()
RETURNS trigger AS $$
BEGIN
    new.email_confirmed_at := COALESCE(new.email_confirmed_at, now());
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_autoconfirm_email ON auth.users;
CREATE TRIGGER trg_autoconfirm_email
    BEFORE INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.autoconfirm_email();
