// netlify/functions/getPlaylist.js

import fetch from "node-fetch"; // para hacer peticiones HTTP desde la función

export const handler = async (event, context) => {
  // 1) Leer parámetros de query string: ?playlistId=XYZ
  const { playlistId } = event.queryStringParameters || {};

  if (!playlistId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Falta el parámetro playlistId" }),
    };
  }

  // 2) Leer la API Key desde variables de entorno (configuradas en Netlify)
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se encontró la API Key" }),
    };
  }

  // 3) Construir la URL de la YouTube Data API
  const maxResults = 50;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`;

  try {
    // 4) Hacer la petición a YouTube
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error(`YouTube API devolvió status ${resp.status}`);
    }
    const data = await resp.json();

    // 5) Transformar la respuesta: extraer sólo lo necesario (p.ej. videoId, título, miniatura)
    const videos = data.items.map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
    }));

    // 6) Devolver el JSON con statusCode 200
    return {
      statusCode: 200,
      body: JSON.stringify({ videos }),
    };
  } catch (err) {
    // 7) En caso de error, devolver statusCode 500 con mensaje
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
