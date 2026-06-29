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

## Publicacion

La ruta recomendada es:

1. Subir esta carpeta a GitHub.
2. Conectar el repositorio en Vercel.
3. Publicar como sitio estatico.
4. Configurar Supabase antes de capturar informacion real.
