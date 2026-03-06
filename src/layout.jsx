import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = lazy(() => import("./App.jsx"));
const Material = lazy(() => import("./pages/Material.jsx"));
const Practicas = lazy(() => import("./pages/Practicas.jsx"));
const Videos = lazy(() => import("./pages/Videos.jsx"));
const Fisica = lazy(() => import("./pages/Fisica.jsx"));
const Quimica = lazy(() => import("./pages/Quimica.jsx"));
const Biologia = lazy(() => import("./pages/Biologia.jsx"));

const routeFallback = <p className="route-loading">Cargando contenido...</p>;

const Layout = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={routeFallback}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/material" element={<Material />} />
          <Route path="/practicas" element={<Practicas />} />
          <Route path="/videos/:playlistId" element={<Videos />} />
          <Route path="/fisica" element={<Fisica />} />
          <Route path="/quimica" element={<Quimica />} />
          <Route path="/biologia" element={<Biologia />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Layout;
