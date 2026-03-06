# Pagina Licenciado Ciencias

Proyecto frontend con React + Vite y funciones serverless de Netlify.

## Requisitos del entorno

- Node.js LTS (incluido en el devcontainer)
- npm
- Netlify CLI (incluido en el devcontainer)
- Variable de entorno `YOUTUBE_API_KEY`

## Dev Container

Este repositorio incluye configuración en `.devcontainer/`.

1. Abre el proyecto en VS Code.
2. Ejecuta `Dev Containers: Reopen in Container`.
3. El contenedor instala dependencias automáticamente con `npm ci`.

## Variables de entorno

1. Crea un archivo `.env` basado en `.env.example`.
2. Define `YOUTUBE_API_KEY`.

## Desarrollo local

Para que funcione tanto Vite como `/.netlify/functions/*`, usa:

```bash
netlify dev
```

- App principal: `http://localhost:8888`
- Vite (interno): `http://localhost:5173`

## Build

```bash
npm run build
```
