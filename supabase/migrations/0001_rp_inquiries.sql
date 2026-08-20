-- Red Planet Global Concepts: inquiry capture.
-- Apply this once a dedicated Supabase project exists. Do not apply it to an
-- unrelated project.

create table if not exists public.rp_inquiries (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text        not null,
  organization text,
  email        text        not null,
  phone        text,
  sector       text        not null
                 check (sector in ('healthcare','agriculture','mining','construction','other')),
  message      text        not null,
  source_path  text,
  status       text        not null default 'new'
                 check (status in ('new','contacted','qualified','closed'))
);

create index if not exists rp_inquiries_created_at_idx
  on public.rp_inquiries (created_at desc);
create index if not exists rp_inquiries_sector_status_idx
  on public.rp_inquiries (sector, status);

alter table public.rp_inquiries enable row level security;

-- The public site may only append. Reading the lead pipeline requires the
-- service role, which never reaches the browser.
drop policy if exists "public can submit an inquiry" on public.rp_inquiries;
create policy "public can submit an inquiry"
  on public.rp_inquiries
  for insert
  to anon, authenticated
  with check (true);
