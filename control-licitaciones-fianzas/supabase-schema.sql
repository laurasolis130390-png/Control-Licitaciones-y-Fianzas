create extension if not exists pgcrypto;

create table if not exists empresas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  rfc text,
  personalidad_juridica text,
  telefono text,
  fax text,
  correo text,
  calle_numero text,
  colonia text,
  codigo_postal text,
  municipio_delegacion text,
  entidad_federativa text,
  numero_escritura_constitutiva text,
  fecha_escritura_constitutiva date,
  nombre_notario text,
  notaria_numero text,
  lugar_notaria text,
  registro_publico_propiedad text,
  fecha_registro_publico date,
  relacion_socios text,
  objeto_social text,
  representante_legal text,
  escritura_facultades text,
  notaria_facultades_numero text,
  lugar_notaria_facultades text,
  fecha_facultades date,
  notario_facultades text,
  reformas text,
  observaciones text,
  tianguis_digital_numero text,
  tianguis_digital_pdf text,
  tianguis_digital_pdf_nombre text,
  tianguis_digital_fecha date,
  repse_numero text,
  repse_pdf text,
  repse_pdf_nombre text,
  repse_fecha date,
  constancia_situacion_fiscal_numero text,
  constancia_situacion_fiscal_pdf text,
  constancia_situacion_fiscal_pdf_nombre text,
  constancia_situacion_fiscal_fecha date,
  opinion_sat_numero text,
  opinion_sat_pdf text,
  opinion_sat_pdf_nombre text,
  opinion_sat_fecha date,
  opinion_imss_numero text,
  opinion_imss_pdf text,
  opinion_imss_pdf_nombre text,
  opinion_imss_fecha date,
  opinion_infonavit_numero text,
  opinion_infonavit_pdf text,
  opinion_infonavit_pdf_nombre text,
  opinion_infonavit_fecha date,
  caratula_banco_numero text,
  caratula_banco_pdf text,
  caratula_banco_pdf_nombre text,
  caratula_banco_fecha date,
  comprobante_domicilio_numero text,
  comprobante_domicilio_pdf text,
  comprobante_domicilio_pdf_nombre text,
  comprobante_domicilio_fecha date,
  sua_fecha date,
  impuesto_nomina_fecha date,
  declaracion_enero_fecha date,
  declaracion_febrero_fecha date,
  declaracion_marzo_fecha date,
  declaracion_abril_fecha date,
  declaracion_mayo_fecha date,
  declaracion_junio_fecha date,
  declaracion_julio_fecha date,
  declaracion_agosto_fecha date,
  declaracion_septiembre_fecha date,
  declaracion_octubre_fecha date,
  declaracion_noviembre_fecha date,
  declaracion_diciembre_fecha date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table empresas add column if not exists tianguis_digital_numero text;
alter table empresas add column if not exists tianguis_digital_pdf text;
alter table empresas add column if not exists tianguis_digital_pdf_nombre text;
alter table empresas add column if not exists tianguis_digital_fecha date;
alter table empresas add column if not exists repse_numero text;
alter table empresas add column if not exists repse_pdf text;
alter table empresas add column if not exists repse_pdf_nombre text;
alter table empresas add column if not exists repse_fecha date;
alter table empresas add column if not exists constancia_situacion_fiscal_numero text;
alter table empresas add column if not exists constancia_situacion_fiscal_pdf text;
alter table empresas add column if not exists constancia_situacion_fiscal_pdf_nombre text;
alter table empresas add column if not exists constancia_situacion_fiscal_fecha date;
alter table empresas add column if not exists opinion_sat_numero text;
alter table empresas add column if not exists opinion_sat_pdf text;
alter table empresas add column if not exists opinion_sat_pdf_nombre text;
alter table empresas add column if not exists opinion_sat_fecha date;
alter table empresas add column if not exists opinion_imss_numero text;
alter table empresas add column if not exists opinion_imss_pdf text;
alter table empresas add column if not exists opinion_imss_pdf_nombre text;
alter table empresas add column if not exists opinion_imss_fecha date;
alter table empresas add column if not exists opinion_infonavit_numero text;
alter table empresas add column if not exists opinion_infonavit_pdf text;
alter table empresas add column if not exists opinion_infonavit_pdf_nombre text;
alter table empresas add column if not exists opinion_infonavit_fecha date;
alter table empresas add column if not exists caratula_banco_numero text;
alter table empresas add column if not exists caratula_banco_pdf text;
alter table empresas add column if not exists caratula_banco_pdf_nombre text;
alter table empresas add column if not exists caratula_banco_fecha date;
alter table empresas add column if not exists comprobante_domicilio_numero text;
alter table empresas add column if not exists comprobante_domicilio_pdf text;
alter table empresas add column if not exists comprobante_domicilio_pdf_nombre text;
alter table empresas add column if not exists comprobante_domicilio_fecha date;
alter table empresas add column if not exists sua_fecha date;
alter table empresas add column if not exists impuesto_nomina_fecha date;
alter table empresas add column if not exists declaracion_enero_fecha date;
alter table empresas add column if not exists declaracion_febrero_fecha date;
alter table empresas add column if not exists declaracion_marzo_fecha date;
alter table empresas add column if not exists declaracion_abril_fecha date;
alter table empresas add column if not exists declaracion_mayo_fecha date;
alter table empresas add column if not exists declaracion_junio_fecha date;
alter table empresas add column if not exists declaracion_julio_fecha date;
alter table empresas add column if not exists declaracion_agosto_fecha date;
alter table empresas add column if not exists declaracion_septiembre_fecha date;
alter table empresas add column if not exists declaracion_octubre_fecha date;
alter table empresas add column if not exists declaracion_noviembre_fecha date;
alter table empresas add column if not exists declaracion_diciembre_fecha date;

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
  fecha_visita date,
  hora_visita time,
  estatus_visita text default 'Pendiente',
  fecha_junta_aclaraciones date,
  hora_junta_aclaraciones time,
  estatus_junta_aclaraciones text default 'Pendiente',
  fecha_presentacion date,
  hora_presentacion time,
  estatus_presentacion text default 'Pendiente',
  fecha_fallo date,
  hora_fallo time,
  estatus_fallo text default 'Pendiente',
  estatus text default 'En elaboracion',
  responsable text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table licitaciones add column if not exists fecha_visita date;
alter table licitaciones add column if not exists hora_visita time;
alter table licitaciones add column if not exists estatus_visita text default 'Pendiente';
alter table licitaciones add column if not exists hora_junta_aclaraciones time;
alter table licitaciones add column if not exists estatus_junta_aclaraciones text default 'Pendiente';
alter table licitaciones add column if not exists hora_presentacion time;
alter table licitaciones add column if not exists estatus_presentacion text default 'Pendiente';
alter table licitaciones add column if not exists hora_fallo time;
alter table licitaciones add column if not exists estatus_fallo text default 'Pendiente';

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
  fecha_seguimiento date,
  estatus text default 'Pendiente',
  archivo_pdf text,
  archivo_pdf_nombre text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table fianzas_garantias add column if not exists archivo_pdf_nombre text;
alter table fianzas_garantias add column if not exists fecha_seguimiento date;

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
  oficio_solicitud_nombre text,
  acuse text,
  acuse_nombre text,
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table liberaciones add column if not exists oficio_solicitud_nombre text;
alter table liberaciones add column if not exists acuse_nombre text;

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

create table if not exists checklists (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  licitacion_relacionada text,
  empresa_participante text,
  texto_base text,
  ck_la text,
  ck_t text,
  ck_e text,
  estatus text default 'Pendiente',
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cotizaciones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  dependencia_solicitante text,
  empresa_participante text,
  fecha_solicitud date,
  fecha_limite_envio date,
  fecha_envio date,
  fecha_seguimiento date,
  estatus text default 'Pendiente',
  observaciones text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table cotizaciones add column if not exists fecha_seguimiento date;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_empresas_updated_at on empresas;
create trigger set_empresas_updated_at before update on empresas for each row execute function set_updated_at();

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

drop trigger if exists set_checklists_updated_at on checklists;
create trigger set_checklists_updated_at before update on checklists for each row execute function set_updated_at();

drop trigger if exists set_cotizaciones_updated_at on cotizaciones;
create trigger set_cotizaciones_updated_at before update on cotizaciones for each row execute function set_updated_at();

alter table empresas enable row level security;
alter table dependencias enable row level security;
alter table licitaciones enable row level security;
alter table fianzas_garantias enable row level security;
alter table liberaciones enable row level security;
alter table pendientes enable row level security;
alter table archivos enable row level security;
alter table checklists enable row level security;
alter table cotizaciones enable row level security;

drop policy if exists "Acceso publico temporal empresas" on empresas;
drop policy if exists "Acceso publico temporal dependencias" on dependencias;
drop policy if exists "Acceso publico temporal licitaciones" on licitaciones;
drop policy if exists "Acceso publico temporal fianzas" on fianzas_garantias;
drop policy if exists "Acceso publico temporal liberaciones" on liberaciones;
drop policy if exists "Acceso publico temporal pendientes" on pendientes;
drop policy if exists "Acceso publico temporal archivos" on archivos;
drop policy if exists "Acceso publico temporal checklists" on checklists;
drop policy if exists "Acceso publico temporal cotizaciones" on cotizaciones;

create policy "Acceso publico temporal empresas" on empresas for all using (true) with check (true);
create policy "Acceso publico temporal dependencias" on dependencias for all using (true) with check (true);
create policy "Acceso publico temporal licitaciones" on licitaciones for all using (true) with check (true);
create policy "Acceso publico temporal fianzas" on fianzas_garantias for all using (true) with check (true);
create policy "Acceso publico temporal liberaciones" on liberaciones for all using (true) with check (true);
create policy "Acceso publico temporal pendientes" on pendientes for all using (true) with check (true);
create policy "Acceso publico temporal archivos" on archivos for all using (true) with check (true);
create policy "Acceso publico temporal checklists" on checklists for all using (true) with check (true);
create policy "Acceso publico temporal cotizaciones" on cotizaciones for all using (true) with check (true);
