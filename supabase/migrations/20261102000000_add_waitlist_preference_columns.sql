alter table public.waitlist
  add column if not exists wallet_security boolean not null default false,
  add column if not exists defi_positions boolean not null default false,
  add column if not exists wallet_exposure boolean not null default false,
  add column if not exists protocol_contract_risk boolean not null default false,
  add column if not exists other text;
