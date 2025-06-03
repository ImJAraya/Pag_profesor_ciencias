// src/components/PlaylistVideos.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

/**
 * Componente que muestra los videos de una playlist de YouTube.
 * Obtiene el playlistId desde los params de la URL.
 */
function Videos() {
  const { playlistId } = useParams();
  // Estados para la lista de videos, indicador de carga y posible error
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Si no nos pasan un playlistId válido, no hacemos nada
    if (!playlistId) {
      setVideos([]);
      setLoading(false);
      setError("No se proporcionó ningún playlistId.");
      return;
    }

    // Construimos la URL a la Netlify Function (proxy a YouTube API)
    const functionURL = `/.netlify/functions/getPlaylist?playlistId=${playlistId}`;

    // Función asíncrona para hacer el fetch
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);

        const resp = await fetch(functionURL);
        if (!resp.ok) {
          throw new Error(`Error HTTP ${resp.status}`);
        }

        const json = await resp.json();
        // La función debería devolver: { videos: [ {videoId, title, thumbnail}, ... ] }
        setVideos(json.videos || []);
      } catch (err) {
        setError(err.message);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
    // Cada vez que 'playlistId' cambie, se ejecuta este efecto de nuevo.
  }, [playlistId]);

  // Renderizado condicional
  if (loading) {
    return <p>Cargando videos de la playlist…</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }
  if (videos.length === 0) {
    return <p>No se encontraron videos para la playlist {playlistId}.</p>;
  }

  return (
    <div
      className="page-content"
      style={{
        background: "var(--section-bg)",
        borderRadius: "12px",
        boxShadow: "0 1px 6px 0 rgba(35,69,103,0.04)",
        maxWidth: "600px",
        margin: "2rem auto",
        padding: "2rem",
        color: "var(--text-main)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "var(--primary)",
          marginBottom: "1.2rem",
        }}
      >
        Videos de la playlist: {playlistId}
      </h2>
      <div
        className="videos-grid"
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.videoId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <a
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                style={{ width: "100%", display: "block" }}
              />
            </a>
            <div style={{ padding: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1rem" }}>{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos;