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
