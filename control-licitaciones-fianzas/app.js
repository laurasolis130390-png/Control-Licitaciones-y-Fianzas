const modules = [
  ["Inicio", "icon-home", true],
  ["Licitaciones", "icon-file"],
  ["Fianzas y Garantias", "icon-shield"],
  ["Liberaciones", "icon-stamp"],
  ["Pendientes", "icon-file"],
  ["Archivos", "icon-folder"],
  ["Reportes", "icon-chart"],
  ["Configuracion", "icon-settings"],
];

const moduleDefinitions = {
  Licitaciones: {
    table: "licitaciones",
    title: "Licitaciones",
    subtitle: "Registra y consulta tus procesos de licitacion.",
    primary: "nombre",
    fields: [
      ["dependencia", "Dependencia", "text"],
      ["nombre", "Nombre de licitacion", "text", true],
      ["numero", "Numero de licitacion", "text"],
      ["empresa_participante", "Empresa participante", "text"],
      ["fecha_publicacion", "Fecha de publicacion", "date"],
      ["fecha_visita", "Fecha de visita", "date"],
      ["hora_visita", "Hora de visita", "time"],
      ["fecha_junta_aclaraciones", "Fecha de junta de aclaraciones", "date"],
      ["hora_junta_aclaraciones", "Hora de junta de aclaraciones", "time"],
      ["fecha_presentacion", "Fecha de presentacion", "date"],
      ["hora_presentacion", "Hora de presentacion", "time"],
      ["fecha_fallo", "Fecha de fallo", "date"],
      ["hora_fallo", "Hora de fallo", "time"],
      ["estatus", "Estatus", "select", false, ["En elaboracion", "Presentada", "Adjudicada", "No adjudicada", "Cancelado"]],
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
      ["monto", "Monto", "number"],
      ["afianzadora", "Afianzadora", "text"],
      ["numero_poliza", "Numero de poliza", "text"],
      ["fecha_emision", "Fecha de emision", "date"],
      ["fecha_vencimiento", "Fecha de vencimiento", "date"],
      ["estatus", "Estatus", "select", false, ["Vigente", "Proximo a vencer", "Vencido", "Liberado", "Cancelado"]],
      ["archivo_pdf", "Archivo PDF", "text"],
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
      ["estatus", "Estatus", "select", false, ["Pendiente", "En tramite", "Entregado", "Observado", "Liberado", "Cancelado"]],
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
};

delete moduleDefinitions.Dependencias;

const tableNames = Object.values(moduleDefinitions).map((item) => item.table);
const localKey = "controlLicitacionesFianzasData";
const statusColors = {
  Pendiente: "#ff4747",
  "En tramite": "#ff8516",
  Entregado: "#4fc768",
  Observado: "#ffc31f",
  Vigente: "#4fc768",
  "Proximo a vencer": "#ff8516",
  Vencido: "#ff4747",
  Liberado: "#3d8bff",
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
  const saved = JSON.parse(localStorage.getItem(localKey) || "null");
  store = { ...createEmptyStore(), ...(saved || {}) };
}

function saveLocalStore() {
  localStorage.setItem(localKey, JSON.stringify(store));
}

async function loadStore() {
  loadLocalStore();
  const localStore = structuredClone(store);

  if (!supabaseReady()) {
    syncMode = "local";
    return;
  }

  try {
    const entries = await Promise.all(tableNames.map(async (table) => [table, await supabaseRequest(table, { query: "?select=*&order=created_at.desc" })]));
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

async function saveRecord(table, record) {
  const cleanRecord = prepareRecord(table, record);

  if (supabaseReady()) {
    try {
      const [saved] = await supabaseRequest(table, { method: "POST", body: cleanRecord });
      store[table] = [saved, ...store[table]];
      saveLocalStore();
      syncMode = "supabase";
      return;
    } catch (error) {
      console.error(error);
      syncMode = "local";
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
      store[table] = store[table].map((item) => (item.id === id ? saved : item));
      saveLocalStore();
      syncMode = "supabase";
      return;
    } catch (error) {
      console.error(error);
      syncMode = "local";
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
    .map(([label, iconId]) => `<a class="nav-item ${label === activeModule ? "active" : ""}" href="#" data-module="${label}">${icon(iconId)}<span>${label}</span></a>`)
    .join("");

  nav.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      activeModule = item.dataset.module;
      renderApp();
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
  const liberacionesPendientes = store.liberaciones.filter((item) => ["Pendiente", "En tramite", "Observado"].includes(item.estatus)).length;
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
    { title: "Licitaciones activas", value: licitacionesActivas, icon: "icon-file", color: "#3d8bff" },
    { title: "Fianzas vigentes", value: fianzasVigentes, icon: "icon-shield", color: "#4fc768" },
    { title: "Liberaciones pendientes", value: liberacionesPendientes, icon: "icon-stamp", color: "#ff8516" },
    { title: "Proximos a vencer", value: proximos, icon: "icon-alert", color: "#ffc31f" },
    { title: "Vencidos / atrasados", value: vencidos, icon: "icon-clock", color: "#ff4747" },
  ];
}

function renderDashboard() {
  document.querySelector("h1").textContent = "¡Bienvenida, Laura!";
  document.querySelector(".topbar p").textContent = "Aqui tienes el resumen general de tus pendientes y licitaciones.";
  document.querySelector("#notificationCount").textContent = getKpis()[4].value;

  document.querySelector("#viewRoot").innerHTML = `
    <section class="kpi-grid" id="kpiGrid" aria-label="Resumen general"></section>
    <section class="content-grid">
      <div class="left-stack">
        <article class="panel urgent-panel">
          <div class="panel-header"><h2>${icon("icon-flag")}Pendientes urgentes</h2></div>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Prioridad</th>
                  <th>Pendiente</th>
                  <th>Licitacion</th>
                  <th>Dependencia</th>
                  <th>Fecha limite</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody id="urgentRows"></tbody>
            </table>
          </div>
          <a class="panel-link" href="#" data-go="Pendientes">Ver todos los pendientes ${icon("icon-chevron")}</a>
        </article>
        <section class="chart-grid">
          <article class="panel chart-panel">
            <h2>Licitaciones por estatus</h2>
            <div class="donut-layout">
              <div class="donut licitaciones" id="bidsDonut"><span>0<small>Total</small></span></div>
              <div class="legend" id="bidLegend"></div>
            </div>
            <a class="panel-link" href="#" data-go="Reportes">Ver reporte completo ${icon("icon-chevron")}</a>
          </article>
          <article class="panel chart-panel">
            <h2>Documentos por estatus</h2>
            <div class="donut-layout">
              <div class="donut documentos" id="docsDonut"><span>0<small>Total</small></span></div>
              <div class="legend" id="docLegend"></div>
            </div>
            <a class="panel-link" href="#" data-go="Reportes">Ver reporte completo ${icon("icon-chevron")}</a>
          </article>
        </section>
      </div>
      <aside class="right-stack">
        <article class="panel calendar-panel">
          <div class="panel-header split">
            <h2>${icon("icon-calendar")}Calendario de vencimientos</h2>
            <div class="calendar-arrows">
              <button class="icon-button compact" type="button" aria-label="Mes anterior">${icon("icon-chevron")}</button>
              <button class="icon-button compact" type="button" aria-label="Mes siguiente">${icon("icon-chevron")}</button>
            </div>
          </div>
          <p class="calendar-month">${new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" }).format(new Date())}</p>
          <div class="calendar" id="calendarGrid"></div>
          <div class="calendar-legend">
            <span><i class="dot red"></i>Vencidos</span>
            <span><i class="dot orange"></i>Proximos a vencer</span>
            <span><i class="dot green"></i>Pendientes</span>
          </div>
        </article>
        <article class="panel due-panel">
          <h2>${icon("icon-clock")}Proximos a vencer</h2>
          <div id="dueList"></div>
          <a class="panel-link" href="#" data-go="Pendientes">Ver todos ${icon("icon-chevron")}</a>
        </article>
        <article class="panel docs-panel">
          <h2>${icon("icon-file")}Ultimos documentos agregados</h2>
          <div id="documentList"></div>
          <a class="panel-link" href="#" data-go="Archivos">Ver todos los archivos ${icon("icon-chevron")}</a>
        </article>
      </aside>
    </section>
  `;

  renderKpis();
  renderUrgentRows();
  renderCalendar();
  renderDueList();
  renderDocuments();
  renderLegends();
  bindDashboardLinks();
}

function renderKpis() {
  document.querySelector("#kpiGrid").innerHTML = getKpis()
    .map(
      (item) => `
        <article class="kpi-card" style="--color:${item.color}; --glow:${item.color}">
          <div class="kpi-icon">${icon(item.icon)}</div>
          <div>
            <strong>${item.value}</strong>
            <p>${item.title}</p>
          </div>
          <a href="#">Ver todas ${icon("icon-chevron")}</a>
        </article>
      `,
    )
    .join("");
}

function renderUrgentRows() {
  const rows = store.pendientes
    .filter((item) => ["Alta", "Media"].includes(item.prioridad) && !["Entregado", "Cancelado"].includes(item.estatus))
    .sort((a, b) => (a.fecha_limite || "").localeCompare(b.fecha_limite || ""))
    .slice(0, 5);

  document.querySelector("#urgentRows").innerHTML = rows.length
    ? rows
        .map((item) => {
          const priorityClass = (item.prioridad || "Media").toLowerCase();
          const left = daysUntil(item.fecha_limite);
          const dateClass = left < 0 ? "date-red" : left <= 7 ? "date-orange" : "date-yellow";
          return `
            <tr>
              <td><span class="pill ${priorityClass}">${item.prioridad || "Media"}</span></td>
              <td>${item.titulo || ""}</td>
              <td>${item.licitacion_relacionada || ""}</td>
              <td>${item.dependencia || ""}</td>
              <td class="${dateClass}">${formatDate(item.fecha_limite)}</td>
              <td><span class="status" style="--status-color:${statusColors[item.estatus] || "#a9b5c8"}">${item.estatus || "Pendiente"}</span></td>
            </tr>
          `;
        })
        .join("")
    : `<tr><td colspan="6"><div class="empty-state small">Sin pendientes urgentes. Cuando captures tareas con fecha limite apareceran aqui.</div></td></tr>`;
}

function renderCalendar() {
  const grid = document.querySelector("#calendarGrid");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const marks = getDueRecords().reduce((acc, item) => {
    const value = item.fecha_vencimiento || item.fecha_limite;
    if (!value) return acc;
    const date = new Date(`${value}T00:00:00`);
    if (date.getFullYear() !== year || date.getMonth() !== month) return acc;
    const left = daysUntil(value);
    acc[date.getDate()] = left < 0 ? "#ff4747" : left <= 30 ? "#ff8516" : "#4fc768";
    return acc;
  }, {});

  const blanks = Array.from({ length: firstDay }, () => `<button class="muted"></button>`);
  const days = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const marked = marks[day];
    return `<button class="${marked ? "marked" : ""}" style="${marked ? `--mark:${marked}` : ""}">${day}</button>`;
  });

  grid.innerHTML = [...weekDays.map((day) => `<span>${day}</span>`), ...blanks, ...days].join("");
}

function getDueRecords() {
  return [
    ...store.licitaciones.flatMap((item) => getBidEvents(item)),
    ...store.fianzas_garantias.map((item) => ({ ...item, titulo: item.tipo, fecha_limite: item.fecha_vencimiento })),
    ...store.liberaciones.map((item) => ({ ...item, titulo: item.tipo })),
    ...store.pendientes,
  ];
}

function getBidEvents(item) {
  return [
    ["Visita", item.fecha_visita, item.hora_visita],
    ["Junta de aclaraciones", item.fecha_junta_aclaraciones, item.hora_junta_aclaraciones],
    ["Presentacion", item.fecha_presentacion, item.hora_presentacion],
    ["Fallo", item.fecha_fallo, item.hora_fallo],
  ]
    .filter(([, date]) => date)
    .map(([label, date, time]) => ({
      id: `${item.id}-${label}`,
      titulo: `${label}: ${item.nombre}`,
      licitacion_relacionada: item.nombre,
      dependencia: item.dependencia,
      fecha_limite: date,
      hora_limite: time,
      estatus: item.estatus,
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
      activeModule = item.dataset.go;
      renderApp();
    });
  });
}

function renderModule(moduleName) {
  const definition = moduleDefinitions[moduleName];
  const rows = store[definition.table] || [];
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
    const form = new FormData(event.currentTarget);
    const record = Object.fromEntries(form.entries());
    if (editingRecord) {
      await updateRecord(definition.table, editingRecord.id, record);
      editingState = null;
    } else {
      await saveRecord(definition.table, record);
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
}

function renderField([name, label, type, required, options], record = {}, definition = {}) {
  const value = record?.[name] || "";

  if (type === "textarea") {
    return `<label class="field full"><span>${label}</span><textarea name="${name}" rows="3">${escapeHtml(value)}</textarea></label>`;
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

  return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" value="${escapeHtml(value)}" ${required ? "required" : ""} /></label>`;
}

function getRelationOptions(table, record, definition) {
  if (table === "licitaciones") {
    const options = store.licitaciones.map((item) => [item.nombre, `${item.nombre}${item.numero ? ` · ${item.numero}` : ""}`]);
    if (record?.licitacion_relacionada && !options.some(([value]) => value === record.licitacion_relacionada)) {
      options.unshift([record.licitacion_relacionada, record.licitacion_relacionada]);
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
  const meta = record.licitacion_relacionada || record.dependencia || record.tipo_documento || record.numero || "Sin relacion";
  const status = record.estatus || record.prioridad || record.tipo_documento || "Registrado";
  const schedule = definition.table === "licitaciones" ? renderBidSchedule(record) : "";
  return `
    <div class="record-card">
      <div>
        <strong>${title}</strong>
        <span>${meta}</span>
        ${schedule}
      </div>
      <span class="status" style="--status-color:${statusColors[status] || "#a9b5c8"}">${status}</span>
      <div class="record-actions">
        <button class="text-button neutral" type="button" data-edit="${record.id}">Editar</button>
        <button class="text-button" type="button" data-delete="${record.id}">Eliminar</button>
      </div>
    </div>
  `;
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
    ["Visita", record.fecha_visita, record.hora_visita],
    ["Junta", record.fecha_junta_aclaraciones, record.hora_junta_aclaraciones],
    ["Presentacion", record.fecha_presentacion, record.hora_presentacion],
    ["Fallo", record.fecha_fallo, record.hora_fallo],
  ].filter(([, date, time]) => date || time);

  if (!items.length) {
    return "";
  }

  return `
    <div class="schedule-strip">
      ${items
        .map(
          ([label, date, time]) => `
            <span>
              <b>${label}</b>
              ${date ? formatDate(date) : "Sin fecha"}${time ? ` · ${time}` : ""}
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
    </section>
  `;
}

loadStore().then(renderApp);
