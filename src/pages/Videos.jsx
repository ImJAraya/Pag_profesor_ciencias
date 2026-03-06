// src/components/PlaylistVideos.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BATCH_SIZE = 12;

/**
 * Componente que muestra los videos de una playlist de YouTube.
 * Obtiene el playlistId desde los params de la URL.
 */
function Videos() {
  const { playlistId } = useParams();
  // Estados para la lista de videos, indicador de carga y posible error
  const [videos, setVideos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
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

    const controller = new AbortController();

    // Construimos la URL a la Netlify Function (proxy a YouTube API)
    const functionURL = `/.netlify/functions/getPlaylist?playlistId=${playlistId}`;

    // Función asíncrona para hacer el fetch
    async function fetchVideos() {
      try {
        setLoading(true);
        setError(null);
        setVisibleCount(BATCH_SIZE);

        const resp = await fetch(functionURL, { signal: controller.signal });
        if (!resp.ok) {
          throw new Error(`Error HTTP ${resp.status}`);
        }

        const json = await resp.json();
        // La función debería devolver: { videos: [ {videoId, title, thumbnail}, ... ] }
        setVideos(json.videos || []);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }
        setError(err.message);
        setVideos([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchVideos();
    return () => controller.abort();
    // Cada vez que 'playlistId' cambie, se ejecuta este efecto de nuevo.
  }, [playlistId]);

  const shortPlaylistId =
    playlistId && playlistId.length > 16
      ? `${playlistId.slice(0, 8)}...${playlistId.slice(-6)}`
      : playlistId;
  const visibleVideos = videos.slice(0, visibleCount);
  const canLoadMore = visibleCount < videos.length;

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
          marginBottom: "0.4rem",
        }}
      >
        Videos de la playlist
      </h2>
      <p style={{ marginTop: 0, color: "var(--text-muted)" }}>
        ID: {shortPlaylistId}
      </p>
      <div
        className="videos-grid"
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {visibleVideos.map((video) => (
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
                loading="lazy"
                decoding="async"
                style={{ width: "100%", display: "block" }}
              />
            </a>
            <div style={{ padding: "0.5rem" }}>
              <h3 style={{ margin: 0, fontSize: "1rem" }}>{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {canLoadMore && (
        <button
          onClick={() =>
            setVisibleCount((current) =>
              Math.min(current + BATCH_SIZE, videos.length)
            )
          }
          style={{
            marginTop: "1rem",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.65rem 1rem",
            cursor: "pointer",
          }}
        >
          Cargar más videos
        </button>
      )}
    </div>
  );
}

export default Videos;
