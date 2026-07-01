const modules = [
  ["Inicio", "icon-home", true],
  ["Empresas", "icon-building"],
  ["Licitaciones", "icon-file"],
  ["Fianzas y Garantias", "icon-shield"],
  ["Cotizaciones", "icon-stamp"],
  ["Generador de Checklist", "icon-chart"],
  ["Reportes", "icon-chart"],
  ["Configuracion", "icon-settings"],
];

const empresaDocumentos = [
  ["tianguis_digital", "Tianguis Digital", true],
  ["repse", "REPSE", true],
  ["constancia_situacion_fiscal", "Constancia de situacion fiscal"],
  ["opinion_sat", "Opinion de cumplimiento SAT"],
  ["opinion_imss", "Opinion de cumplimiento IMSS"],
  ["opinion_infonavit", "Opinion de cumplimiento INFONAVIT"],
  ["caratula_banco", "Caratula de banco"],
  ["comprobante_domicilio", "Comprobante de domicilio"],
  ["sua", "SUA"],
  ["impuesto_nomina", "Impuesto sobre nomina"],
];

const declaracionesMeses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const moduleDefinitions = {
  Empresas: {
    table: "empresas",
    title: "Empresas",
    subtitle: "Datos fiscales, legales, socios, representante y reformas.",
    primary: "nombre",
    fields: [
      ["nombre", "Nombre o razon social", "text", true],
      ["rfc", "Registro Federal de Contribuyentes", "text"],
      ["personalidad_juridica", "Personalidad juridica", "select", false, ["Persona moral", "Persona fisica", "Sociedad anonima", "Sociedad de responsabilidad limitada", "Otra"]],
      ["telefono", "Telefono", "tel"],
      ["fax", "Fax", "tel"],
      ["correo", "Correo electronico", "email"],
      ["calle_numero", "Calle y numero", "text"],
      ["colonia", "Colonia", "text"],
      ["codigo_postal", "Codigo postal", "text"],
      ["municipio_delegacion", "Municipio o delegacion", "text"],
      ["entidad_federativa", "Entidad federativa", "text"],
      ["numero_escritura_constitutiva", "Numero de escritura publica constitutiva", "text"],
      ["fecha_escritura_constitutiva", "Fecha de escritura constitutiva", "date"],
      ["nombre_notario", "Nombre del notario", "text"],
      ["notaria_numero", "Notaria numero", "text"],
      ["lugar_notaria", "Lugar de la notaria", "text"],
      ["registro_publico_propiedad", "Registro publico de la propiedad", "text"],
      ["fecha_registro_publico", "Fecha de registro publico", "date"],
      ["relacion_socios", "Relacion de socios", "textarea"],
      ["objeto_social", "Descripcion del objeto social", "textarea"],
      ["representante_legal", "Representante o apoderado legal", "text"],
      ["escritura_facultades", "Escritura que acredita personalidad y facultades", "text"],
      ["notaria_facultades_numero", "Notaria numero de facultades", "text"],
      ["lugar_notaria_facultades", "Lugar de la notaria de facultades", "text"],
      ["fecha_facultades", "Fecha de facultades", "date"],
      ["notario_facultades", "Notario de facultades", "text"],
      ["reformas", "Reformas o modificaciones", "textarea"],
      ...empresaDocumentos.flatMap(([key, label, hasNumber]) => [
        ...(hasNumber ? [[`${key}_numero`, `${label} - numero o folio`, "text"]] : []),
        [`${key}_fecha`, `${label} - fecha de actualizacion`, "date"],
      ]),
      ...declaracionesMeses.map((mes) => [`declaracion_${mes}_fecha`, `Declaracion ${mes} - fecha`, "date"]),
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  Licitaciones: {
    table: "licitaciones",
    title: "Licitaciones",
    subtitle: "Registra y consulta tus procesos de licitacion.",
    primary: "nombre",
    fields: [
      ["dependencia", "Dependencia", "text"],
      ["nombre", "Nombre de licitacion", "text", true],
      ["numero", "Numero de licitacion", "text"],
      ["anio_licitacion", "Año de la licitacion", "number"],
      ["empresa_participante", "Empresa participante", "relation", false, "empresas"],
      ["fecha_publicacion", "Fecha de publicacion", "date"],
      ["fecha_visita", "Fecha de visita", "date"],
      ["hora_visita", "Hora de visita", "time"],
      ["estatus_visita", "Estatus de visita", "select", false, ["Pendiente", "Proximo a vencer", "Trabajado"]],
      ["fecha_junta_aclaraciones", "Fecha de junta de aclaraciones", "date"],
      ["hora_junta_aclaraciones", "Hora de junta de aclaraciones", "time"],
      ["estatus_junta_aclaraciones", "Estatus de junta de aclaraciones", "select", false, ["Pendiente", "Proximo a vencer", "Trabajado"]],
      ["fecha_presentacion", "Fecha de presentacion", "date"],
      ["hora_presentacion", "Hora de presentacion", "time"],
      ["estatus_presentacion", "Estatus de presentacion", "select", false, ["Pendiente", "Proximo a vencer", "Trabajado"]],
      ["fecha_fallo", "Fecha de fallo", "date"],
      ["hora_fallo", "Hora de fallo", "time"],
      ["estatus_fallo", "Estatus de fallo", "select", false, ["Pendiente", "Proximo a vencer", "Trabajado"]],
      ["estatus", "Estatus", "select", false, ["Pendiente", "En elaboracion", "Presentada", "Adjudicada", "No adjudicada", "Trabajado", "Cancelado"]],
      ["responsable", "Responsable", "text"],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  "Fianzas y Garantias": {
    table: "fianzas_garantias",
    title: "Fianzas y Garantias",
    subtitle: "Controla fianzas, garantias, polizas y fechas de vencimiento.",
    primary: "tipo",
    fields: [
      ["tipo", "Tipo de fianza o garantia", "text", true],
      ["licitacion_relacionada", "Licitacion relacionada", "relation", true, "licitaciones"],
      ["dependencia", "Dependencia", "text"],
      ["monto", "Monto", "money"],
      ["afianzadora", "Afianzadora", "text"],
      ["numero_poliza", "Numero de poliza", "text"],
      ["fecha_emision", "Fecha de emision", "date"],
      ["fecha_vencimiento", "Fecha de vencimiento", "date"],
      ["fecha_seguimiento", "Fecha de seguimiento", "date"],
      ["estatus", "Estatus", "select", false, ["Pendiente", "En tramite", "Vigente", "Proximo a vencer", "Vencido", "Liberado", "Trabajado", "Cancelado"]],
      ["archivo_pdf", "Referencia del archivo PDF", "text"],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  Cotizaciones: {
    table: "cotizaciones",
    title: "Cotizaciones",
    subtitle: "Seguimiento de solicitudes, fechas limite y envios de cotizaciones.",
    primary: "titulo",
    fields: [
      ["titulo", "Titulo o descripcion", "text", true],
      ["dependencia_solicitante", "Dependencia que solicita", "text"],
      ["empresa_participante", "Empresa", "relation", false, "empresas"],
      ["fecha_solicitud", "Fecha de solicitud", "date"],
      ["fecha_limite_envio", "Fecha limite para enviar", "date"],
      ["fecha_envio", "Fecha de envio de nosotros", "date"],
      ["fecha_seguimiento", "Fecha de seguimiento", "date"],
      ["estatus", "Estatus", "select", false, ["Pendiente", "En tramite", "Enviada", "Trabajado", "Cancelado"]],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  Liberaciones: {
    table: "liberaciones",
    title: "Liberaciones",
    subtitle: "Da seguimiento a solicitudes, acuses y liberaciones.",
    primary: "tipo",
    fields: [
      ["fianza_relacionada", "Fianza a liberar", "relation", true, "fianzas_garantias"],
      ["tipo", "Tipo de liberacion", "text"],
      ["licitacion_relacionada", "Licitacion relacionada", "text"],
      ["dependencia", "Dependencia", "text"],
      ["fecha_solicitud", "Fecha de solicitud", "date"],
      ["fecha_limite", "Fecha limite", "date"],
      ["fecha_liberacion", "Fecha de liberacion", "date"],
      ["estatus", "Estatus", "select", false, ["Pendiente", "En tramite", "Entregado", "Observado", "Liberado", "Trabajado", "Cancelado"]],
      ["oficio_solicitud", "Oficio de solicitud", "text"],
      ["acuse", "Acuse", "text"],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  Pendientes: {
    table: "pendientes",
    title: "Pendientes",
    subtitle: "Captura tareas, prioridades, responsables y fechas limite.",
    primary: "titulo",
    fields: [
      ["titulo", "Titulo del pendiente", "text", true],
      ["licitacion_relacionada", "Licitacion relacionada", "text"],
      ["dependencia", "Dependencia", "text"],
      ["tipo_tramite", "Tipo de tramite", "text"],
      ["prioridad", "Prioridad", "select", false, ["Alta", "Media", "Baja"]],
      ["fecha_limite", "Fecha limite", "date"],
      ["responsable", "Responsable", "text"],
      ["estatus", "Estatus", "select", false, ["Pendiente", "En tramite", "Entregado", "Observado", "Cancelado"]],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  Dependencias: {
    table: "dependencias",
    title: "Dependencias",
    subtitle: "Directorio de dependencias, areas y contactos.",
    primary: "nombre",
    fields: [
      ["nombre", "Nombre de dependencia", "text", true],
      ["area", "Area", "text"],
      ["contacto", "Contacto", "text"],
      ["telefono", "Telefono", "tel"],
      ["correo", "Correo", "email"],
      ["direccion", "Direccion", "text"],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  Archivos: {
    table: "archivos",
    title: "Archivos",
    subtitle: "Registra documentos y su relacion con licitaciones.",
    primary: "nombre",
    fields: [
      ["nombre", "Nombre de archivo", "text", true],
      ["tipo_documento", "Tipo de documento", "text"],
      ["licitacion_relacionada", "Licitacion relacionada", "text"],
      ["dependencia", "Dependencia", "text"],
      ["fecha_carga", "Fecha de carga", "date"],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
  "Generador de Checklist": {
    table: "checklists",
    title: "Generador de Checklist",
    subtitle: "Genera y guarda checklist legal-administrativo, tecnico y economico por licitacion.",
    primary: "nombre",
    fields: [
      ["nombre", "Nombre del checklist", "text", true],
      ["licitacion_relacionada", "Licitacion relacionada", "relation", true, "licitaciones"],
      ["empresa_participante", "Empresa", "relation", false, "empresas"],
      ["texto_base", "Pega aqui el texto de requisitos", "textarea"],
      ["ck_la", "CK LA - Legal y Administrativa", "textarea"],
      ["ck_t", "CK T - Propuesta Tecnica", "textarea"],
      ["ck_e", "CK E - Propuesta Economica", "textarea"],
      ["estatus", "Estatus", "select", false, ["Pendiente", "En tramite", "Trabajado", "Cancelado"]],
      ["observaciones", "Observaciones", "textarea"],
    ],
  },
};

delete moduleDefinitions.Dependencias;

const tableNames = Object.values(moduleDefinitions).map((item) => item.table);
const localKey = "controlLicitacionesFianzasData";
const maxInlinePdfSize = 750 * 1024;
const tableSelects = {
  empresas: [
    "id",
    "nombre",
    "rfc",
    "personalidad_juridica",
    "telefono",
    "fax",
    "correo",
    "calle_numero",
    "colonia",
    "codigo_postal",
    "municipio_delegacion",
    "entidad_federativa",
    "numero_escritura_constitutiva",
    "fecha_escritura_constitutiva",
    "nombre_notario",
    "notaria_numero",
    "lugar_notaria",
    "registro_publico_propiedad",
    "fecha_registro_publico",
    "relacion_socios",
    "objeto_social",
    "representante_legal",
    "escritura_facultades",
    "notaria_facultades_numero",
    "lugar_notaria_facultades",
    "fecha_facultades",
    "notario_facultades",
    "reformas",
    "observaciones",
    ...empresaDocumentos.flatMap(([key, , hasNumber]) => [...(hasNumber ? [`${key}_numero`] : []), `${key}_fecha`]),
    ...declaracionesMeses.map((mes) => `declaracion_${mes}_fecha`),
    "created_at",
    "updated_at",
  ].join(","),
  licitaciones:
    "id,dependencia,nombre,numero,anio_licitacion,empresa_participante,fecha_publicacion,fecha_visita,hora_visita,estatus_visita,fecha_junta_aclaraciones,hora_junta_aclaraciones,estatus_junta_aclaraciones,fecha_presentacion,hora_presentacion,estatus_presentacion,fecha_fallo,hora_fallo,estatus_fallo,estatus,responsable,observaciones,created_at,updated_at",
  fianzas_garantias: "id,tipo,licitacion_relacionada,dependencia,monto,afianzadora,numero_poliza,fecha_emision,fecha_vencimiento,fecha_seguimiento,estatus,archivo_pdf,observaciones,created_at,updated_at",
  liberaciones: "id,tipo,fianza_relacionada,licitacion_relacionada,dependencia,fecha_solicitud,fecha_limite,fecha_liberacion,estatus,oficio_solicitud,acuse,observaciones,created_at,updated_at",
  cotizaciones: "id,titulo,dependencia_solicitante,empresa_participante,fecha_solicitud,fecha_limite_envio,fecha_envio,fecha_seguimiento,estatus,observaciones,created_at,updated_at",
};
const statusColors = {
  Pendiente: "#ff4747",
  "En tramite": "#ff8516",
  Entregado: "#4fc768",
  Observado: "#ffc31f",
  Vigente: "#4fc768",
  "Proximo a vencer": "#ff8516",
  Vencido: "#ff4747",
  Liberado: "#3d8bff",
  Trabajado: "#8a94a6",
  Cancelado: "#a9b5c8",
  "En elaboracion": "#3d8bff",
  Presentada: "#2fb6b1",
  Adjudicada: "#4fc768",
  "No adjudicada": "#ff8516",
};

let activeModule = "Inicio";
let store = createEmptyStore();
let syncMode = "local";
let editingState = null;
let calendarDate = new Date();
let quoteCalendarDate = new Date();

function getModuleFromHash() {
  const requested = decodeURIComponent((window.location.hash || "").replace("#", ""));
  return modules.some(([label]) => label === requested) ? requested : "Inicio";
}

function activateModule(moduleName, shouldUpdateHash = true) {
  activeModule = moduleName;
  editingState = null;
  if (shouldUpdateHash) {
    const nextHash = moduleName === "Inicio" ? "#" : `#${encodeURIComponent(moduleName)}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, "", nextHash);
    }
  }
  renderApp();
}

function createEmptyStore() {
  return Object.fromEntries(tableNames.map((name) => [name, []]));
}

function icon(id) {
  return `<svg aria-hidden="true"><use href="#${id}"></use></svg>`;
}

function getSupabaseConfig() {
  const config = window.SUPABASE_CONFIG || {};
  const cleanUrl = (config.url || "").replace(/\/$/, "").replace(/\/rest\/v1$/, "");
  return {
    url: cleanUrl,
    anonKey: config.anonKey || "",
  };
}

function supabaseReady() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey);
}

function getTableSelect(table) {
  return tableSelects[table] || "*";
}

async function supabaseRequest(table, options = {}) {
  const config = getSupabaseConfig();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const response = await fetch(`${config.url}/rest/v1/${table}${options.query || ""}`, {
    method: options.method || "GET",
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      "Content-Type": "application/json",
      Prefer: options.prefer || "return=representation",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function loadLocalStore() {
  try {
    const saved = JSON.parse(localStorage.getItem(localKey) || "null");
    store = { ...createEmptyStore(), ...(saved || {}) };
    localStorage.setItem(localKey, JSON.stringify(stripLargeFilesFromStore(store)));
  } catch (error) {
    console.error(error);
    store = createEmptyStore();
  }
}

function saveLocalStore() {
  try {
    localStorage.setItem(localKey, JSON.stringify(stripLargeFilesFromStore(store)));
  } catch (error) {
    console.error(error);
  }
}

function stripLargeFilesFromStore(sourceStore) {
  return Object.fromEntries(
    Object.entries(sourceStore).map(([table, rows]) => [
      table,
      (rows || []).map((row) =>
        Object.fromEntries(
          Object.entries(row).filter(([key, value]) => {
            if (typeof value !== "string") return true;
            if (value.startsWith("data:application/pdf")) return false;
            if (key.endsWith("_pdf") || key === "archivo_pdf" || key === "oficio_solicitud" || key === "acuse") return false;
            return true;
          }),
        ),
      ),
    ]),
  );
}

async function loadStore() {
  loadLocalStore();
  const localStore = structuredClone(store);

  if (!supabaseReady()) {
    syncMode = "local";
    return;
  }

  try {
    const entries = await Promise.all(
      tableNames.map(async (table) => {
        try {
          return [table, await supabaseRequest(table, { query: `?select=${getTableSelect(table)}&order=created_at.desc` })];
        } catch (error) {
          console.error(error);
          return [table, localStore[table] || []];
        }
      }),
    );
    const remoteStore = Object.fromEntries(entries);
    store = await mergeLocalIntoSupabase(localStore, remoteStore);
    saveLocalStore();
    syncMode = "supabase";
  } catch (error) {
    console.error(error);
    syncMode = "local";
  }
}

async function mergeLocalIntoSupabase(localStore, remoteStore) {
  const mergedStore = { ...createEmptyStore(), ...remoteStore };

  for (const table of tableNames) {
    const remoteIds = new Set((remoteStore[table] || []).map((item) => item.id));
    const localOnly = (localStore[table] || []).filter((item) => item.id && !remoteIds.has(item.id));

    for (const item of localOnly) {
      try {
        const [saved] = await supabaseRequest(table, { method: "POST", body: item });
        mergedStore[table] = [saved, ...(mergedStore[table] || [])];
      } catch (error) {
        console.error(error);
        mergedStore[table] = [item, ...(mergedStore[table] || [])];
      }
    }
  }

  return mergedStore;
}

function prepareRecord(table, record) {
  const cleanRecord = Object.fromEntries(Object.entries(record).filter(([, value]) => value !== ""));

  if (editingState?.id) {
    const current = store[table]?.find((item) => item.id === editingState.id);
    if (current) {
      for (const [key, value] of Object.entries(current)) {
        if ((key.endsWith("_pdf") || key === "archivo_pdf" || key === "oficio_solicitud" || key === "acuse") && !cleanRecord[key] && value) {
          cleanRecord[key] = value;
          if (current[`${key}_nombre`]) cleanRecord[`${key}_nombre`] = current[`${key}_nombre`];
        }
      }
    }
  }

  if (table === "fianzas_garantias" && cleanRecord.monto) {
    const rawAmount = String(cleanRecord.monto).replace(/,/g, "").replace(/[^0-9.-]/g, "");
    cleanRecord.monto = Number(rawAmount || 0).toFixed(2);
  }

  if (table === "liberaciones" && cleanRecord.fianza_relacionada) {
    const fianza = store.fianzas_garantias.find((item) => item.id === cleanRecord.fianza_relacionada || item.tipo === cleanRecord.fianza_relacionada);
    if (fianza) {
      cleanRecord.fianza_relacionada = fianza.tipo;
      cleanRecord.licitacion_relacionada = cleanRecord.licitacion_relacionada || fianza.licitacion_relacionada || "";
      cleanRecord.dependencia = cleanRecord.dependencia || fianza.dependencia || "";
      cleanRecord.tipo = cleanRecord.tipo || `Liberacion de ${fianza.tipo}`;
    }
  }

  return cleanRecord;
}

async function collectFormRecord(formElement) {
  const form = new FormData(formElement);
  const record = {};

  for (const [name, value] of form.entries()) {
    if (value instanceof File) {
      if (value.name && value.size > 0) {
        if (value.size > maxInlinePdfSize) {
          throw new Error(`El PDF "${value.name}" pesa mas de 750 KB. Para no trabar el sistema, sube un PDF mas ligero o lo pasamos a almacenamiento formal.`);
        }
        record[name] = await fileToDataUrl(value);
        record[`${name}_nombre`] = value.name;
      }
      continue;
    }
    record[name] = value;
  }

  return record;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function saveRecord(table, record) {
  const cleanRecord = prepareRecord(table, record);

  if (supabaseReady()) {
    try {
      const [saved] = await supabaseRequest(table, { method: "POST", body: cleanRecord });
      if (!saved) throw new Error("Supabase no regreso el registro guardado.");
      store[table] = [saved, ...store[table]];
      saveLocalStore();
      syncMode = "supabase";
      return;
    } catch (error) {
      console.error(error);
      syncMode = "local";
      store[table] = [{ ...cleanRecord, id: crypto.randomUUID(), created_at: new Date().toISOString() }, ...store[table]];
      saveLocalStore();
      throw new Error("No quedo guardado en Supabase. Lo deje como respaldo local temporal; antes de seguir capturando hay que revisar la tabla y volver a guardar.");
    }
  }

  store[table] = [{ ...cleanRecord, id: crypto.randomUUID(), created_at: new Date().toISOString() }, ...store[table]];
  saveLocalStore();
}

async function updateRecord(table, id, record) {
  const cleanRecord = prepareRecord(table, record);

  if (supabaseReady()) {
    try {
      const [saved] = await supabaseRequest(table, { method: "PATCH", query: `?id=eq.${id}`, body: cleanRecord });
      if (!saved) throw new Error("Supabase no encontro el registro para actualizar.");
      store[table] = store[table].map((item) => (item.id === id ? saved : item));
      saveLocalStore();
      syncMode = "supabase";
      return;
    } catch (error) {
      console.error(error);
      syncMode = "local";
      store[table] = store[table].map((item) => (item.id === id ? { ...item, ...cleanRecord, updated_at: new Date().toISOString() } : item));
      saveLocalStore();
      throw new Error("No se actualizo en Supabase. Conserve el cambio como respaldo local temporal; antes de seguir capturando hay que revisar la conexion.");
    }
  }

  store[table] = store[table].map((item) => (item.id === id ? { ...item, ...cleanRecord, updated_at: new Date().toISOString() } : item));
  saveLocalStore();
}

async function deleteRecord(table, id) {
  if (supabaseReady() && !id.startsWith("local-")) {
    try {
      await supabaseRequest(table, { method: "DELETE", query: `?id=eq.${id}`, prefer: "return=minimal" });
    } catch (error) {
      console.error(error);
    }
  }

  store[table] = store[table].filter((item) => item.id !== id);
  saveLocalStore();
}

function renderNav() {
  const nav = document.querySelector("#moduleNav");
  nav.innerHTML = modules
    .map(([label, iconId]) => `<a class="nav-item ${label === activeModule ? "active" : ""}" href="${label === "Inicio" ? "#" : `#${encodeURIComponent(label)}`}" data-module="${label}">${icon(iconId)}<span>${label}</span></a>`)
    .join("");

  nav.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      activateModule(item.dataset.module);
    });
  });
}

function renderApp() {
  renderNav();

  if (activeModule === "Inicio") {
    renderDashboard();
    return;
  }

  if (activeModule === "Reportes") {
    renderReports();
    return;
  }

  if (activeModule === "Configuracion") {
    renderSettings();
    return;
  }

  renderModule(activeModule);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: "numeric" }).format(date).replace(".", "");
}

function daysUntil(value) {
  if (!value) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(`${value}T00:00:00`);
  return Math.ceil((target - today) / 86400000);
}

function getKpis() {
  const licitacionesActivas = store.licitaciones.filter((item) => !["Cancelado", "No adjudicada"].includes(item.estatus)).length;
  const fianzasVigentes = store.fianzas_garantias.filter((item) => item.estatus === "Vigente").length;
  const cotizacionesPendientes = store.cotizaciones.filter((item) => ["Pendiente", "En tramite"].includes(item.estatus)).length;
  const dueSources = getDueRecords();
  const proximos = dueSources.filter((item) => {
    const left = daysUntil(item.fecha_vencimiento || item.fecha_limite);
    return left !== null && left >= 0 && left <= 30;
  }).length;
  const vencidos = dueSources.filter((item) => {
    const left = daysUntil(item.fecha_vencimiento || item.fecha_limite);
    return left !== null && left < 0;
  }).length;

  return [
    { title: "Licitaciones activas", value: licitacionesActivas, icon: "icon-file", color: "#3d8bff", module: "Licitaciones" },
    { title: "Fianzas vigentes", value: fianzasVigentes, icon: "icon-shield", color: "#4fc768", module: "Fianzas y Garantias" },
    { title: "Cotizaciones pendientes", value: cotizacionesPendientes, icon: "icon-stamp", color: "#ff8516", module: "Cotizaciones" },
    { title: "Proximos a vencer", value: proximos, icon: "icon-alert", color: "#ffc31f", module: "Reportes" },
    { title: "Vencidos / atrasados", value: vencidos, icon: "icon-clock", color: "#ff4747", module: "Reportes" },
  ];
}

function renderDashboard() {
  document.querySelector("h1").textContent = "¡Bienvenida, Laura!";
  document.querySelector(".topbar p").textContent = "Aqui tienes el resumen general de tus pendientes y licitaciones.";
  document.querySelector("#notificationCount").textContent = getKpis()[4].value;

  document.querySelector("#viewRoot").innerHTML = `
    <section class="urgent-ribbon" id="urgentRibbon"></section>
    <section class="kpi-grid" id="kpiGrid" aria-label="Resumen general"></section>
    <section class="content-grid">
      <div class="left-stack">
        <article class="panel urgent-panel">
          <div class="panel-header"><h2>${icon("icon-flag")}Estatus pendientes</h2></div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Prioridad</th>
                  <th>Pendiente</th>
                  <th>Licitacion relacionada</th>
                  <th>Empresa</th>
                  <th>Fecha de seguimiento</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody id="urgentRows"></tbody>
            </table>
          </div>
          <a class="panel-link" href="#" data-go="Reportes">Ver reporte ${icon("icon-chevron")}</a>
        </article>
      </div>
      <aside class="right-stack">
        <article class="panel calendar-panel">
          <div class="panel-header split">
            <h2>${icon("icon-calendar")}Calendario de Eventos</h2>
            <div class="calendar-arrows">
              <button class="icon-button compact" type="button" data-main-month="-1" aria-label="Mes anterior">${icon("icon-chevron")}</button>
              <button class="icon-button compact" type="button" data-main-month="1" aria-label="Mes siguiente">${icon("icon-chevron")}</button>
            </div>
          </div>
          <p class="calendar-month" id="mainCalendarMonth"></p>
          <div class="calendar" id="calendarGrid"></div>
          <div class="calendar-legend">
            <span><i class="dot red"></i>Vencidos</span>
            <span><i class="dot orange"></i>Proximos a vencer</span>
            <span><i class="dot green"></i>Pendientes</span>
            <span><i class="dot grey"></i>Trabajado</span>
          </div>
        </article>
        <article class="panel calendar-panel quote-calendar-panel">
          <div class="panel-header split">
            <h2>${icon("icon-calendar")}Calendario de Cotizaciones</h2>
            <div class="calendar-arrows quote-arrows">
              <button class="icon-button compact" type="button" data-quote-month="-1" aria-label="Mes anterior">${icon("icon-chevron")}</button>
              <button class="icon-button compact" type="button" data-quote-month="1" aria-label="Mes siguiente">${icon("icon-chevron")}</button>
            </div>
          </div>
          <p class="calendar-month" id="quoteCalendarMonth"></p>
          <div class="calendar" id="quoteCalendarGrid"></div>
        </article>
        <article class="panel due-panel">
          <h2>${icon("icon-clock")}Proximos a vencer</h2>
          <div id="dueList"></div>
          <a class="panel-link" href="#" data-go="Reportes">Ver todos ${icon("icon-chevron")}</a>
        </article>
      </aside>
    </section>
    <div class="event-modal" id="eventModal" hidden>
      <div class="event-modal-card">
        <button class="icon-button compact" type="button" id="closeEventModal" aria-label="Cerrar">×</button>
        <h2 id="eventModalTitle"></h2>
        <p id="eventModalBody"></p>
      </div>
    </div>
  `;

  renderUrgentRibbon();
  renderKpis();
  renderUrgentRows();
  renderCalendar();
  renderQuoteCalendar();
  renderDueList();
  bindDashboardLinks();
  bindCalendarEvents();
  bindCalendarNavigation();
}

function renderKpis() {
  document.querySelector("#kpiGrid").innerHTML = getKpis()
    .map(
      (item) => `
        <article class="kpi-card" style="--color:${item.color}; --glow:${item.color}" data-go="${item.module}" role="button" tabindex="0">
          <div class="kpi-icon">${icon(item.icon)}</div>
          <div>
            <strong>${item.value}</strong>
            <p>${item.title}</p>
          </div>
          <span class="kpi-action">Ver todas ${icon("icon-chevron")}</span>
        </article>
      `,
    )
    .join("");
}

function renderUrgentRows() {
  const rows = getDueRecords()
    .filter((item) => ["Pendiente", "Proximo a vencer", "Vencido", "En tramite", "Observado"].includes(item.estatus || "Pendiente"))
    .sort((a, b) => getUrgentSortDate(a).localeCompare(getUrgentSortDate(b)))
    .slice(0, 5);

  document.querySelector("#urgentRows").innerHTML = rows.length
    ? rows
        .map((item, index) => {
          const displayDate = getUrgentDisplayDate(item);
          const priorityClass = daysUntil(displayDate) <= 7 ? "alta" : "media";
          const left = daysUntil(displayDate);
          const dateClass = left < 0 ? "date-red" : left <= 7 ? "date-orange" : "date-yellow";
          const bid = getRelatedBid(item);
          const company = item.empresa_participante || bid?.empresa_participante || "";
          const bidLabel = getUrgentBidLabel(item);
          return `
            <tr class="clickable-row" data-urgent-index="${index}" role="button" tabindex="0">
              <td><span class="pill ${priorityClass}">${left < 0 ? "Vencido" : left <= 7 ? "Alta" : "Media"}</span></td>
              <td>${escapeHtml(item.titulo || "")}</td>
              <td class="wide-cell">${escapeHtml(bidLabel)}</td>
              <td>${escapeHtml(company || "Sin capturar")}</td>
              <td class="${dateClass}">${displayDate ? formatDate(displayDate) : "Sin fecha"}</td>
              <td><span class="status" style="--status-color:${statusColors[item.estatus] || "#a9b5c8"}">${item.estatus || "Pendiente"}</span></td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="6"><div class="empty-state small">Sin eventos pendientes o proximos.</div></td></tr>`;

  bindUrgentRows(rows);
}

function getUrgentDisplayDate(item) {
  return item.fecha_seguimiento || (item.event_type === "seguimiento_fianza" ? item.fecha_limite : "") || "";
}

function getUrgentSortDate(item) {
  return getUrgentDisplayDate(item) || item.fecha_limite || item.fecha_vencimiento || "9999-12-31";
}

function getUrgentBidLabel(item) {
  const bid = getRelatedBid(item);
  return getBidDisplayName(bid) || item.licitacion_relacionada || "";
}

function bindUrgentRows(rows) {
  document.querySelectorAll("[data-urgent-index]").forEach((row) => {
    const open = () => showUrgentDetail(rows[Number(row.dataset.urgentIndex)]);
    row.addEventListener("click", open);
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function showUrgentDetail(item) {
  if (!item) return;

  const modal = document.querySelector("#eventModal");
  const title = document.querySelector("#eventModalTitle");
  const body = document.querySelector("#eventModalBody");
  const bid = getRelatedBid(item);
  const company = item.empresa_participante || bid?.empresa_participante || "";
  const displayDate = getUrgentDisplayDate(item);

  title.textContent = item.titulo || "Detalle del pendiente";
  body.innerHTML = `
    <strong>Licitacion relacionada</strong><span>${escapeHtml(getUrgentBidLabel(item) || "Sin capturar")}</span>
    <strong>Empresa</strong><span>${escapeHtml(company || "Sin capturar")}</span>
    <strong>Dependencia</strong><span>${escapeHtml(item.dependencia || bid?.dependencia || "Sin capturar")}</span>
    <strong>Fecha de seguimiento</strong><span>${displayDate ? formatDate(displayDate) : "Sin fecha"}</span>
    <strong>Estatus</strong><span>${escapeHtml(item.estatus || "Pendiente")}</span>
    ${item.afianzadora ? `<strong>Afianzadora</strong><span>${escapeHtml(item.afianzadora)}</span>` : ""}
  `;
  modal.hidden = false;
}

function renderCalendar() {
  const grid = document.querySelector("#calendarGrid");
  const monthLabel = document.querySelector("#mainCalendarMonth");
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  monthLabel.textContent = new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(calendarDate);
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const events = getDueRecords();
  const marks = events.reduce((acc, item) => {
    const value = item.fecha_vencimiento || item.fecha_limite;
    if (!value) return acc;
    const date = new Date(`${value}T00:00:00`);
    if (date.getFullYear() !== year || date.getMonth() !== month) return acc;
    const left = daysUntil(value);
    acc[date.getDate()] = getEventColor(item, left);
    return acc;
  }, {});

  const blanks = Array.from({ length: firstDay }, () => `<button class="muted"></button>`);
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const marked = marks[day];
    const dayEvents = events.filter((item) => {
      const value = item.fecha_vencimiento || item.fecha_limite;
      if (!value) return false;
      const date = new Date(`${value}T00:00:00`);
      return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    });
    return `<button class="${marked ? "marked" : ""}" data-day="${day}" style="${marked ? `--mark:${marked}` : ""}">${day}${dayEvents.length ? `<small>${dayEvents.length}</small>` : ""}</button>`;
  });

  grid.innerHTML = [...weekDays.map((day) => `<span>${day}</span>`), ...blanks, ...days].join("");
}

function renderQuoteCalendar() {
  const grid = document.querySelector("#quoteCalendarGrid");
  const monthLabel = document.querySelector("#quoteCalendarMonth");
  const year = quoteCalendarDate.getFullYear();
  const month = quoteCalendarDate.getMonth();
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const events = getQuoteEvents();
  monthLabel.textContent = new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(quoteCalendarDate);

  const blanks = Array.from({ length: firstDay }, () => `<button class="muted"></button>`);
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const dayEvents = events.filter((item) => {
      const date = new Date(`${item.fecha_limite}T00:00:00`);
      return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
    });
    const color = dayEvents.some((item) => item.estatus === "Trabajado" || item.estatus === "Enviada") ? "#8a94a6" : dayEvents.length ? "#ff8516" : "";
    return `<button class="${color ? "marked" : ""}" data-quote-day="${day}" style="${color ? `--mark:${color}` : ""}">${day}${dayEvents.length ? `<small>${dayEvents.length}</small>` : ""}</button>`;
  });

  grid.innerHTML = [...weekDays.map((day) => `<span>${day}</span>`), ...blanks, ...days].join("");
}

function getDueRecords() {
  return [
    ...store.licitaciones.flatMap((item) => getBidEvents(item)),
    ...store.empresas.flatMap((item) => getCompanyDocumentEvents(item)),
    ...store.fianzas_garantias.flatMap((item) => getBondEvents(item)),
  ];
}

function getBondEvents(item) {
  const events = [];
  if (item.fecha_vencimiento) {
    events.push({ ...item, titulo: `Vencimiento: ${item.tipo}`, fecha_limite: item.fecha_vencimiento });
  }
  if (item.fecha_seguimiento) {
    events.push({ ...item, titulo: `Seguimiento: ${item.tipo}`, fecha_limite: item.fecha_seguimiento, event_type: "seguimiento_fianza" });
  }
  return events;
}

function getQuoteEvents() {
  return store.cotizaciones
    .filter((item) => item.fecha_limite_envio || item.fecha_envio || item.fecha_seguimiento)
    .flatMap((item) => {
      const events = [];
      if (item.fecha_limite_envio) events.push({ ...item, titulo: `Limite: ${item.titulo}`, fecha_limite: item.fecha_limite_envio });
      if (item.fecha_envio) events.push({ ...item, titulo: `Enviada: ${item.titulo}`, fecha_limite: item.fecha_envio, estatus: "Enviada" });
      if (item.fecha_seguimiento) events.push({ ...item, titulo: `Seguimiento: ${item.titulo}`, fecha_limite: item.fecha_seguimiento, estatus: item.estatus || "En tramite" });
      return events;
    });
}

function getCompanyDocumentEvents(item) {
  return empresaDocumentos
    .filter(([key]) => item[`${key}_fecha`])
    .map(([key, label]) => {
      const next = new Date(`${item[`${key}_fecha`]}T00:00:00`);
      next.setDate(next.getDate() + 15);
      return {
        id: `${item.id}-${key}`,
        titulo: `Actualizar ${label}: ${item.nombre}`,
        licitacion_relacionada: item.nombre,
        fecha_limite: next.toISOString().slice(0, 10),
        estatus: "Proximo a vencer",
        event_type: "empresa_documento",
      };
    });
}

function renderUrgentRibbon() {
  const ribbon = document.querySelector("#urgentRibbon");
  const alerts = getCompanyDocumentEventsFromAll()
    .filter((item) => {
      const left = daysUntil(item.fecha_limite);
      return left !== null && left <= 5;
    })
    .slice(0, 6);

  ribbon.innerHTML = alerts.length
    ? alerts.map((item) => `<span>${escapeHtml(item.titulo)} · ${formatDate(item.fecha_limite)}</span>`).join("")
    : `<span>Sin avisos urgentes de documentos empresariales.</span>`;
}

function getCompanyDocumentEventsFromAll() {
  return store.empresas.flatMap((item) => getCompanyDocumentEvents(item));
}

function getEventColor(item, left = daysUntil(item.fecha_vencimiento || item.fecha_limite)) {
  if (item.estatus === "Trabajado" || item.estatus === "Liberado" || item.estatus === "Entregado") return "#8a94a6";
  if (left < 0) return "#ff4747";
  if (left <= 30) return "#ff8516";
  return "#4fc768";
}

function getBidEvents(item) {
  if (["Adjudicada", "Trabajado", "Cancelado", "No adjudicada"].includes(item.estatus)) {
    return [];
  }

  return [
    ["Visita", item.fecha_visita, item.hora_visita, item.estatus_visita],
    ["Junta de aclaraciones", item.fecha_junta_aclaraciones, item.hora_junta_aclaraciones, item.estatus_junta_aclaraciones],
    ["Presentacion", item.fecha_presentacion, item.hora_presentacion, item.estatus_presentacion],
    ["Fallo", item.fecha_fallo, item.hora_fallo, item.estatus_fallo],
  ]
    .filter(([, date]) => date)
    .filter(([, , , eventStatus]) => !["Trabajado", "Cancelado", "No aplica"].includes(eventStatus))
    .map(([label, date, time, eventStatus]) => ({
      id: `${item.id}-${label}`,
      titulo: `${label}: ${item.nombre}`,
      licitacion_relacionada: getBidDisplayName(item),
      empresa_participante: item.empresa_participante,
      dependencia: item.dependencia,
      fecha_limite: date,
      hora_limite: time,
      estatus: eventStatus || "Pendiente",
      event_type: "licitacion",
    }));
}

function renderDueList() {
  const due = getDueRecords()
    .filter((item) => {
      const left = daysUntil(item.fecha_vencimiento || item.fecha_limite);
      return left !== null && left >= 0 && left <= 30;
    })
    .sort((a, b) => (a.fecha_vencimiento || a.fecha_limite || "").localeCompare(b.fecha_vencimiento || b.fecha_limite || ""))
    .slice(0, 3);

  document.querySelector("#dueList").innerHTML = due.length
    ? due
        .map((item) => {
          const value = item.fecha_vencimiento || item.fecha_limite;
          const date = new Date(`${value}T00:00:00`);
          return `
            <div class="due-item" style="--dot:#ff8516">
              <i></i>
              <div>
                <strong>${item.titulo || item.tipo || "Vencimiento"}</strong>
                <span>${item.hora_limite ? `${item.hora_limite} · ` : ""}${item.licitacion_relacionada || item.dependencia || "Sin relacion"}</span>
              </div>
              <div class="date-box">${date.getDate()}<small>${date.toLocaleDateString("es-MX", { month: "short" }).replace(".", "").toUpperCase()}</small></div>
            </div>
          `;
        })
        .join("")
    : `<div class="empty-state small">Sin vencimientos proximos.</div>`;
}

function renderDocuments() {
  const docs = store.archivos.slice(0, 3);
  document.querySelector("#documentList").innerHTML = docs.length
    ? docs
        .map(
          (item) => `
            <div class="doc-item">
              <div class="pdf-icon">PDF</div>
              <div>
                <strong>${item.nombre}</strong>
                <span>${item.licitacion_relacionada || item.dependencia || "Sin relacion"}</span>
              </div>
              <div class="doc-meta">${formatDate(item.fecha_carga)}<b>${item.tipo_documento || "PDF"}</b></div>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state small">Aun no hay documentos registrados.</div>`;
}

function countBy(items, statuses) {
  const total = items.length;
  return statuses.map((status) => {
    const count = items.filter((item) => item.estatus === status).length;
    const pct = total ? Math.round((count / total) * 100) : 0;
    return [status, `${count} (${pct}%)`, statusColors[status] || "#a9b5c8"];
  });
}

function renderLegends() {
  const bids = countBy(store.licitaciones, ["En elaboracion", "Presentada", "Adjudicada", "No adjudicada"]);
  const docs = countBy([...store.fianzas_garantias, ...store.liberaciones, ...store.pendientes], ["Pendiente", "En tramite", "Vigente", "Liberado"]);
  document.querySelector("#bidsDonut span").innerHTML = `${store.licitaciones.length}<small>Total</small>`;
  document.querySelector("#docsDonut span").innerHTML = `${docs.reduce((sum, item) => sum + Number(item[1].split(" ")[0]), 0)}<small>Total</small>`;
  renderLegend("#bidLegend", bids);
  renderLegend("#docLegend", docs);
}

function renderLegend(targetId, rows) {
  document.querySelector(targetId).innerHTML = rows
    .map(([label, value, color]) => `<div class="legend-row" style="--dot:${color}"><i></i><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function bindDashboardLinks() {
  document.querySelectorAll("[data-go]").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      activateModule(item.dataset.go);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activateModule(item.dataset.go);
      }
    });
  });
}

function bindCalendarEvents() {
  const modal = document.querySelector("#eventModal");
  const close = document.querySelector("#closeEventModal");
  const title = document.querySelector("#eventModalTitle");
  const body = document.querySelector("#eventModalBody");
  const events = getDueRecords();
  const today = new Date();

  document.querySelectorAll("#calendarGrid [data-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const day = Number(button.dataset.day);
      const dayEvents = events.filter((item) => {
        const value = item.fecha_vencimiento || item.fecha_limite;
        if (!value) return false;
        const date = new Date(`${value}T00:00:00`);
        return date.getFullYear() === calendarDate.getFullYear() && date.getMonth() === calendarDate.getMonth() && date.getDate() === day;
      });
      if (!dayEvents.length) return;
      title.textContent = `Eventos del ${day}`;
      body.innerHTML = dayEvents
        .map((item) => `<strong>${escapeHtml(item.titulo || "Evento")}</strong><span>${escapeHtml(item.hora_limite ? `${item.hora_limite} · ` : "")}${escapeHtml(item.licitacion_relacionada || item.dependencia || item.estatus || "")}</span>`)
        .join("");
      modal.hidden = false;
    });
  });

  close?.addEventListener("click", () => {
    modal.hidden = true;
  });

  document.querySelectorAll("#quoteCalendarGrid [data-quote-day]").forEach((button) => {
    button.addEventListener("click", () => {
      const day = Number(button.dataset.quoteDay);
      const dayEvents = getQuoteEvents().filter((item) => {
        const date = new Date(`${item.fecha_limite}T00:00:00`);
        return date.getFullYear() === quoteCalendarDate.getFullYear() && date.getMonth() === quoteCalendarDate.getMonth() && date.getDate() === day;
      });
      if (!dayEvents.length) return;
      title.textContent = `Cotizaciones del ${day}`;
      body.innerHTML = dayEvents
        .map((item) => `<strong>${escapeHtml(item.titulo || "Cotizacion")}</strong><span>${escapeHtml(item.dependencia_solicitante || "")}${item.empresa_participante ? ` · ${escapeHtml(item.empresa_participante)}` : ""}</span>`)
        .join("");
      modal.hidden = false;
    });
  });
}

function bindCalendarNavigation() {
  document.querySelectorAll("[data-main-month]").forEach((button) => {
    button.addEventListener("click", () => {
      calendarDate.setMonth(calendarDate.getMonth() + Number(button.dataset.mainMonth));
      renderCalendar();
      bindCalendarEvents();
    });
  });

  document.querySelectorAll("[data-quote-month]").forEach((button) => {
    button.addEventListener("click", () => {
      quoteCalendarDate.setMonth(quoteCalendarDate.getMonth() + Number(button.dataset.quoteMonth));
      renderQuoteCalendar();
      bindCalendarEvents();
    });
  });
}

function renderModule(moduleName) {
  const definition = moduleDefinitions[moduleName];
  const rows = getModuleRows(definition);
  const editingRecord = editingState?.module === moduleName ? rows.find((item) => item.id === editingState.id) : null;
  document.querySelector("h1").textContent = definition.title;
  document.querySelector(".topbar p").textContent = definition.subtitle;

  document.querySelector("#viewRoot").innerHTML = `
    <section class="module-grid">
      <article class="panel form-panel">
        <div class="panel-header split">
          <h2>${editingRecord ? "Editar registro" : "Nuevo registro"}</h2>
          ${editingRecord ? `<button class="text-button neutral" type="button" id="cancelEdit">Cancelar</button>` : ""}
        </div>
        <form id="recordForm" class="record-form">
          ${definition.fields.map((field) => renderField(field, editingRecord, definition)).join("")}
          <button class="primary-button" type="submit">${editingRecord ? "Actualizar registro" : "Guardar registro"}</button>
        </form>
      </article>
      <article class="panel records-panel">
        <div class="panel-header split">
          <h2>Registros (${rows.length})</h2>
          <span class="sync-badge">${syncMode === "supabase" ? "Supabase conectado" : "Guardado local"}</span>
        </div>
        <div class="records-list">
          ${rows.length ? rows.map((record) => renderRecord(record, definition)).join("") : `<div class="empty-state">Este modulo esta en ceros. Captura el primer registro para empezar a trabajar.</div>`}
        </div>
      </article>
    </section>
  `;

  document.querySelector("#recordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    let record;
    try {
      record = await collectFormRecord(event.currentTarget);
      if (editingRecord) {
        await updateRecord(definition.table, editingRecord.id, record);
        editingState = null;
      } else {
        await saveRecord(definition.table, record);
      }
    } catch (error) {
      alert(error.message || "No se pudo guardar el registro.");
      return;
    }
    renderModule(moduleName);
  });

  document.querySelector("#cancelEdit")?.addEventListener("click", () => {
    editingState = null;
    renderModule(moduleName);
  });

  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => {
      editingState = { module: moduleName, id: button.dataset.edit };
      renderModule(moduleName);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteRecord(definition.table, button.dataset.delete);
      if (editingState?.id === button.dataset.delete) {
        editingState = null;
      }
      renderModule(moduleName);
    });
  });

  if (moduleName === "Generador de Checklist") {
    bindChecklistGenerator();
  }
}

function getModuleRows(definition) {
  const rows = [...(store[definition.table] || [])];
  if (definition.table !== "licitaciones") {
    return rows;
  }

  return rows.sort((a, b) => {
    const yearDiff = getBidYear(b) - getBidYear(a);
    if (yearDiff) return yearDiff;
    return String(b.created_at || "").localeCompare(String(a.created_at || ""));
  });
}

function getBidYear(record) {
  const explicitYear = Number(record.anio_licitacion);
  if (explicitYear) return explicitYear;

  const dateValue = record.fecha_publicacion || record.fecha_presentacion || record.fecha_fallo || record.created_at;
  if (!dateValue) return 0;

  const year = new Date(`${String(dateValue).slice(0, 10)}T00:00:00`).getFullYear();
  return Number.isNaN(year) ? 0 : year;
}

function renderField([name, label, type, required, options], record = {}, definition = {}) {
  const value = record?.[name] || "";

  if (type === "textarea") {
    return `<label class="field full"><span>${label}</span><textarea name="${name}" rows="3">${escapeHtml(value)}</textarea></label>`;
  }

  if (type === "file") {
    const fileName = record?.[`${name}_nombre`];
    const existing = value
      ? `<a class="file-link" href="${escapeHtml(value)}" download="${escapeHtml(fileName || "documento.pdf")}" target="_blank" rel="noopener">${escapeHtml(fileName || "Descargar PDF cargado")}</a>`
      : fileName
        ? `<span class="file-link muted-file">PDF guardado: ${escapeHtml(fileName)}</span>`
        : "";
    return `<label class="field"><span>${label}</span><input name="${name}" type="file" accept="application/pdf" />${existing}</label>`;
  }

  if (type === "select" || type === "relation") {
    const relationOptions = type === "relation" ? getRelationOptions(options, record, definition) : options.map((option) => [option, option]);
    return `
      <label class="field">
        <span>${label}</span>
        <select name="${name}" ${required ? "required" : ""}>
          ${type === "relation" ? `<option value="">Selecciona una opcion</option>` : ""}
          ${relationOptions.map(([optionValue, optionLabel]) => `<option value="${escapeHtml(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(optionLabel)}</option>`).join("")}
        </select>
      </label>
    `;
  }

  if (type === "money") {
    return `<label class="field"><span>${label}</span><input class="money-input" name="${name}" type="text" inputmode="decimal" autocomplete="off" placeholder="0.00" value="${escapeHtml(value)}" ${required ? "required" : ""} /></label>`;
  }

  return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? "required" : ""} /></label>`;
}

function bindChecklistGenerator() {
  const textArea = document.querySelector('[name="texto_base"]');
  if (!textArea) return;

  const generate = () => {
    const generated = generateChecklistSections(textArea.value);
    for (const [name, value] of Object.entries(generated)) {
      const target = document.querySelector(`[name="${name}"]`);
      if (target && !target.value.trim()) target.value = value;
    }
  };

  textArea.addEventListener("blur", generate);
}

function generateChecklistSections(text) {
  const lines = text
    .split(/\r?\n|;|•|-/)
    .map((line) => line.trim())
    .filter(Boolean);

  const buckets = { ck_la: [], ck_t: [], ck_e: [] };
  const legalWords = /acta|poder|rfc|sat|imss|infonavit|identificacion|domicilio|repse|legal|administrativa|opinion|constancia|banco/i;
  const technicalWords = /tecnica|catalogo|ficha|equipo|experiencia|programa|personal|procedimiento|memoria|calidad|seguridad/i;
  const economicWords = /economica|precio|presupuesto|cotizacion|monto|propuesta economica|analisis|costos|unitario|financ/i;

  for (const line of lines) {
    if (economicWords.test(line)) buckets.ck_e.push(line);
    else if (technicalWords.test(line)) buckets.ck_t.push(line);
    else if (legalWords.test(line)) buckets.ck_la.push(line);
    else buckets.ck_la.push(line);
  }

  return Object.fromEntries(Object.entries(buckets).map(([key, items]) => [key, items.map((item) => `☐ ${item}`).join("\n")]));
}

function getRelationOptions(table, record, definition) {
  if (table === "empresas") {
    const options = store.empresas.map((item) => [item.nombre, `${item.nombre}${item.rfc ? ` · ${item.rfc}` : ""}`]);
    if (record?.empresa_participante && !options.some(([value]) => value === record.empresa_participante)) {
      options.unshift([record.empresa_participante, record.empresa_participante]);
    }
    return options;
  }

  if (table === "licitaciones") {
    const options = store.licitaciones.map((item) => [item.id, getBidDisplayName(item)]);
    if (record?.licitacion_relacionada && !options.some(([value]) => value === record.licitacion_relacionada)) {
      const bid = getRelatedBid(record);
      options.unshift([record.licitacion_relacionada, getBidDisplayName(bid) || record.licitacion_relacionada]);
    }
    return options;
  }

  if (table === "fianzas_garantias") {
    const options = store.fianzas_garantias
      .filter((item) => !["Liberado", "Cancelado"].includes(item.estatus))
      .map((item) => [item.id, `${item.tipo}${item.licitacion_relacionada ? ` · ${item.licitacion_relacionada}` : ""}`]);
    if (record?.fianza_relacionada && !options.some(([, label]) => label.startsWith(record.fianza_relacionada))) {
      options.unshift([record.fianza_relacionada, record.fianza_relacionada]);
    }
    return options;
  }

  return [];
}

function renderRecord(record, definition) {
  const title = record[definition.primary] || "Sin titulo";
  const status = record.estatus || record.prioridad || record.tipo_documento || "Registrado";
  const details = getRecordDetails(record, definition);
  return `
    <div class="record-card">
      <div>
        <strong class="record-title">${escapeHtml(title)}</strong>
        <div class="record-details">
          ${details.map(([label, value, wide]) => `<span class="${wide ? "detail-wide" : ""}"><b>${label}</b>${escapeHtml(value || "Sin capturar")}</span>`).join("")}
        </div>
      </div>
      <span class="status" style="--status-color:${statusColors[status] || "#a9b5c8"}">${status}</span>
      <div class="record-actions">
        <button class="text-button neutral" type="button" data-edit="${record.id}">Editar</button>
        <button class="text-button" type="button" data-delete="${record.id}">Eliminar</button>
      </div>
    </div>
  `;
}

function getRelatedBid(record) {
  const rawRelated = record.licitacion_relacionada || "";
  const related = normalizeText(rawRelated);
  if (!related) return null;

  const exactId = store.licitaciones.find((item) => item.id === rawRelated);
  if (exactId) return exactId;

  const relatedNumber = extractBidNumber(rawRelated);
  if (relatedNumber) {
    const byNumber = store.licitaciones.find((item) => normalizeText(item.numero || "") === relatedNumber);
    if (byNumber) return byNumber;
  }

  const exact = store.licitaciones.find((item) => {
    const name = normalizeText(item.nombre || "");
    const number = normalizeText(item.numero || "");
    const full = normalizeText(getBidDisplayName(item));
    return name === related || number === related || full === related;
  });
  if (exact) return exact;

  return store.licitaciones.find((item) => {
    const name = normalizeText(item.nombre || "");
    return name && related.includes(name);
  });
}

function getBidDisplayName(record) {
  if (!record) return "";
  return [record.nombre, record.numero].filter(Boolean).join(" - ");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function extractBidNumber(value) {
  const text = String(value || "");
  const candidates = store.licitaciones
    .map((item) => item.numero)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  const found = candidates.find((number) => normalizeText(text).includes(normalizeText(number)));
  return found ? normalizeText(found) : "";
}

function getRecordDetails(record, definition) {
  if (definition.table === "licitaciones") {
    return [
      ["Año", record.anio_licitacion || getBidYear(record) || ""],
      ["Numero", record.numero],
      ["Dependencia", record.dependencia],
      ["Empresa", record.empresa_participante],
    ];
  }

  if (definition.table === "fianzas_garantias") {
    const bid = getRelatedBid(record);
    return [
      ["Licitacion", getBidDisplayName(bid) || record.licitacion_relacionada, true],
      ["Dependencia", record.dependencia || bid?.dependencia],
      ["Empresa", bid?.empresa_participante],
      ["Afianzadora", record.afianzadora],
    ];
  }

  if (definition.table === "cotizaciones") {
    return [
      ["Dependencia", record.dependencia_solicitante],
      ["Empresa", record.empresa_participante],
      ["Seguimiento", record.fecha_seguimiento ? formatDate(record.fecha_seguimiento) : ""],
    ];
  }

  return [["Relacion", getRecordMeta(record, definition)]];
}

function getRecordMeta(record, definition) {
  if (definition.table === "empresas") {
    return [record.rfc, record.personalidad_juridica, record.correo].filter(Boolean).join(" · ") || "Sin datos fiscales";
  }

  if (definition.table === "fianzas_garantias") {
    return [record.licitacion_relacionada, record.monto ? formatCurrency(record.monto) : "", record.fecha_vencimiento ? `Vence ${formatDate(record.fecha_vencimiento)}` : ""].filter(Boolean).join(" · ") || "Sin relacion";
  }

  return record.licitacion_relacionada || record.dependencia || record.tipo_documento || record.numero || "Sin relacion";
}

function formatCurrency(value) {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderBidSchedule(record) {
  const items = [
    ["Visita", record.fecha_visita, record.hora_visita, record.estatus_visita],
    ["Junta", record.fecha_junta_aclaraciones, record.hora_junta_aclaraciones, record.estatus_junta_aclaraciones],
    ["Presentacion", record.fecha_presentacion, record.hora_presentacion, record.estatus_presentacion],
    ["Fallo", record.fecha_fallo, record.hora_fallo, record.estatus_fallo],
  ].filter(([, date, time]) => date || time);

  if (!items.length) {
    return "";
  }

  return `
    <div class="schedule-strip">
      ${items
        .map(
          ([label, date, time, eventStatus]) => `
            <span>
              <b>${label}</b>
              ${date ? formatDate(date) : "Sin fecha"}${time ? ` · ${time}` : ""}${eventStatus ? ` · ${eventStatus}` : ""}
            </span>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderReports() {
  document.querySelector("h1").textContent = "Reportes";
  document.querySelector(".topbar p").textContent = "Resumen general con informacion capturada.";
  const totals = Object.entries(moduleDefinitions).map(([name, definition]) => [name, store[definition.table].length]);
  document.querySelector("#viewRoot").innerHTML = `
    <section class="reports-grid">
      ${totals.map(([name, total]) => `<article class="panel report-tile"><span>${name}</span><strong>${total}</strong></article>`).join("")}
    </section>
  `;
}

function renderSettings() {
  const config = getSupabaseConfig();
  document.querySelector("h1").textContent = "Configuracion";
  document.querySelector(".topbar p").textContent = "Estado de conexion y preparacion para publicar.";
  document.querySelector("#viewRoot").innerHTML = `
    <section class="module-grid">
      <article class="panel">
        <h2>Conexion de datos</h2>
        <div class="settings-list">
          <div><span>Supabase URL</span><strong>${config.url ? "Configurada" : "Pendiente"}</strong></div>
          <div><span>Supabase anon key</span><strong>${config.anonKey ? "Configurada" : "Pendiente"}</strong></div>
          <div><span>Modo actual</span><strong>${syncMode === "supabase" ? "Guardando en Supabase" : "Guardando localmente"}</strong></div>
        </div>
      </article>
      <article class="panel">
        <h2>Siguientes conexiones</h2>
        <div class="empty-state">Para trabajar en equipo y publicarlo: subir a GitHub, conectar Vercel y pegar las llaves de Supabase en supabase-config.js.</div>
      </article>
      <article class="panel">
        <h2>Respaldo local</h2>
        <div class="settings-list">
          <div><span>Datos locales detectados</span><strong id="localBackupStatus">Revisando...</strong></div>
        </div>
        <button class="primary-button backup-button" type="button" id="downloadLocalBackup">Descargar respaldo local</button>
      </article>
    </section>
  `;

  const localRaw = localStorage.getItem(localKey);
  const status = document.querySelector("#localBackupStatus");
  status.textContent = localRaw ? "Si" : "No";

  document.querySelector("#downloadLocalBackup").addEventListener("click", () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      origin: location.origin,
      data: localRaw ? JSON.parse(localRaw) : createEmptyStore(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "respaldo-control-licitaciones.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });
}

window.addEventListener("hashchange", () => {
  const nextModule = getModuleFromHash();
  if (nextModule !== activeModule) {
    activeModule = nextModule;
    editingState = null;
    renderApp();
  }
});

activeModule = getModuleFromHash();
loadStore().then(renderApp);
