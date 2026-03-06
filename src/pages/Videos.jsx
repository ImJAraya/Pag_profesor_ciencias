// src/components/PlaylistVideos.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Videos.css";

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
    return <p className="videos-status">Cargando videos de la playlist…</p>;
  }
  if (error) {
    return <p className="videos-status videos-status-error">Error: {error}</p>;
  }
  if (videos.length === 0) {
    return (
      <p className="videos-status">
        No se encontraron videos para la playlist {playlistId}.
      </p>
    );
  }

  return (
    <div className="videos-page">
      <header className="videos-header">
        <h2 className="videos-title">Videos de la playlist</h2>
        <p className="videos-subtitle">ID: {shortPlaylistId}</p>
        <p className="videos-counter">
          Mostrando {visibleVideos.length} de {videos.length} videos
        </p>
      </header>
      <div className="videos-grid">
        {visibleVideos.map((video) => (
          <article key={video.videoId} className="video-card">
            <a
              className="video-link"
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="video-thumbnail"
                src={video.thumbnail}
                alt={video.title}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div className="video-body">
              <h3 className="video-title">{video.title}</h3>
            </div>
          </article>
        ))}
      </div>
      {canLoadMore && (
        <button
          className="videos-load-more"
          onClick={() =>
            setVisibleCount((current) =>
              Math.min(current + BATCH_SIZE, videos.length)
            )
          }
        >
          Cargar más videos
        </button>
      )}
    </div>
  );
}

export default Videos;
