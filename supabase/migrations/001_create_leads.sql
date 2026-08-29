create extension if not exists "pgcrypto";

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 80),
  email text not null check (char_length(trim(email)) between 3 and 160),
  company text not null check (char_length(trim(company)) between 2 and 120),
  message text not null check (char_length(trim(message)) between 10 and 1000),
  status text not null default 'New'
    check (status in ('New', 'Contacted', 'Qualified', 'Lost')),
  note text check (note is null or char_length(trim(note)) <= 1000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index leads_name_lower_idx on public.leads (lower(name));
create index leads_company_lower_idx on public.leads (lower(company));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_leads_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.leads enable row level security;

-- Assessment-only policies: the dashboard is intentionally public because
-- authentication is out of scope. Replace these with authenticated policies
-- before using this schema for real customer data.
create policy "Anyone can submit a demo request"
on public.leads for insert
to anon
with check (true);

create policy "Public dashboard can read leads"
on public.leads for select
to anon
using (true);

create policy "Public dashboard can update leads"
on public.leads for update
to anon
using (true)
with check (true);

create policy "Public dashboard can delete leads"
on public.leads for delete
to anon
using (true);
