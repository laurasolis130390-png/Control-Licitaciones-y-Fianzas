# Control de Licitaciones y Fianzas

Sistema web administrativo para controlar licitaciones, fianzas, garantias, liberaciones, pendientes, dependencias y archivos.

## Estado actual

- Dashboard en ceros.
- Modulos navegables.
- Formularios de captura por modulo.
- Guardado local inmediato si Supabase aun no esta configurado.
- Conexion preparada para Supabase usando `supabase-config.js`.
- Script SQL inicial en `supabase-schema.sql`.

## Conexion con Supabase

1. Crear un proyecto en Supabase.
2. Abrir SQL Editor.
3. Ejecutar el contenido de `supabase-schema.sql`.
4. Copiar Project URL y anon public key.
5. Pegarlas en `supabase-config.js`.

```js
window.SUPABASE_CONFIG = {
  url: "https://TU-PROYECTO.supabase.co",
  anonKey: "TU-ANON-KEY",
};
```

Si ya habias creado las tablas antes de agregar horarios, ejecuta de nuevo `supabase-schema.sql`. El archivo ya incluye instrucciones `alter table` para agregar a `licitaciones`:

- Fecha y hora de visita.
- Fecha y hora de junta de aclaraciones.
- Fecha y hora de presentacion.
- Fecha y hora de fallo.

## Publicacion

La ruta recomendada es:

1. Subir esta carpeta a GitHub.
2. Conectar el repositorio en Vercel.
3. Publicar como sitio estatico.
4. Configurar Supabase antes de capturar informacion real.
