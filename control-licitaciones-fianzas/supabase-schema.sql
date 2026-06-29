create extension if not exists pgcrypto;

create table if not exists dependencias (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  area text,
  contacto text,
  telefono text,
  correo text,
  direccion text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists licitaciones (
  id uuid primary key default gen_random_uuid(),
  dependencia text,
  nombre text not null,
  numero text,
  empresa_participante text,
  fecha_publicacion date,
  fecha_junta_aclaraciones date,
  fecha_presentacion date,
  fecha_fallo date,
  estatus text default 'En elaboracion',
  responsable text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists fianzas_garantias (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  licitacion_relacionada text,
  dependencia text,
  monto numeric(14, 2),
  afianzadora text,
  numero_poliza text,
  fecha_emision date,
  fecha_vencimiento date,
  estatus text default 'Vigente',
  archivo_pdf text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists liberaciones (
  id uuid primary key default gen_random_uuid(),
  tipo text not null,
  fianza_relacionada text,
  licitacion_relacionada text,
  dependencia text,
  fecha_solicitud date,
  fecha_limite date,
  fecha_liberacion date,
  estatus text default 'Pendiente',
  oficio_solicitud text,
  acuse text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists pendientes (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  licitacion_relacionada text,
  dependencia text,
  tipo_tramite text,
  prioridad text default 'Media',
  fecha_limite date,
  responsable text,
  estatus text default 'Pendiente',
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists archivos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  tipo_documento text,
  licitacion_relacionada text,
  dependencia text,
  fecha_carga date default current_date,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_dependencias_updated_at on dependencias;
create trigger set_dependencias_updated_at before update on dependencias for each row execute function set_updated_at();

drop trigger if exists set_licitaciones_updated_at on licitaciones;
create trigger set_licitaciones_updated_at before update on licitaciones for each row execute function set_updated_at();

drop trigger if exists set_fianzas_garantias_updated_at on fianzas_garantias;
create trigger set_fianzas_garantias_updated_at before update on fianzas_garantias for each row execute function set_updated_at();

drop trigger if exists set_liberaciones_updated_at on liberaciones;
create trigger set_liberaciones_updated_at before update on liberaciones for each row execute function set_updated_at();

drop trigger if exists set_pendientes_updated_at on pendientes;
create trigger set_pendientes_updated_at before update on pendientes for each row execute function set_updated_at();

drop trigger if exists set_archivos_updated_at on archivos;
create trigger set_archivos_updated_at before update on archivos for each row execute function set_updated_at();

alter table dependencias enable row level security;
alter table licitaciones enable row level security;
alter table fianzas_garantias enable row level security;
alter table liberaciones enable row level security;
alter table pendientes enable row level security;
alter table archivos enable row level security;

create policy "Acceso publico temporal dependencias" on dependencias for all using (true) with check (true);
create policy "Acceso publico temporal licitaciones" on licitaciones for all using (true) with check (true);
create policy "Acceso publico temporal fianzas" on fianzas_garantias for all using (true) with check (true);
create policy "Acceso publico temporal liberaciones" on liberaciones for all using (true) with check (true);
create policy "Acceso publico temporal pendientes" on pendientes for all using (true) with check (true);
create policy "Acceso publico temporal archivos" on archivos for all using (true) with check (true);
