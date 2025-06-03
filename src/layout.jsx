import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import Material from "./pages/Material.jsx";
import Practicas from "./pages/Practicas.jsx";
import Videos from "./pages/Videos.jsx";
import Fisica from "./pages/Fisica.jsx";
import Quimica from "./pages/Quimica.jsx";
import Biologia from "./pages/Biologia.jsx";

const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/material" element={<Material />} />
        <Route path="/practicas" element={<Practicas />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/fisica" element={<Fisica />} />
        <Route path="/quimica" element={<Quimica />} />
        <Route path="/biologia" element={<Biologia />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Layout;