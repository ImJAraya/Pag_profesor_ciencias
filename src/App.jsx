import { useNavigate } from "react-router-dom";

import './App.css'

const groups = [
  {
    id: "decimo",
    title: "Grupo Décimo",
    label: "Décimo",
    description: "Material base, prácticas y videos de refuerzo para los temas del curso.",
    actions: [
      { label: "Material", path: "/material" },
      { label: "Prácticas", path: "/practicas" },
      { label: "Videos", path: "/videos/PLUbkPYHjSbfCGnWbUkTvy02tXum4u8Ter" },
    ],
  },
  {
    id: "once",
    title: "Grupo 11mo",
    label: "Undécimo",
    description: "Recursos de preparación y práctica para consolidar contenidos clave.",
    actions: [
      { label: "Material", path: "/material" },
      { label: "Prácticas", path: "/practicas" },
      { label: "Videos", path: "/videos/PLUbkPYHjSbfAR7xTTN8g49KtUQFTitZIF" },
    ],
  },
  {
    id: "pne",
    title: "Grupo PNE",
    label: "Programa PNE",
    description: "Acceso directo por materia para trabajar el contenido de forma guiada.",
    actions: [
      { label: "Física", path: "/fisica" },
      { label: "Química", path: "/quimica" },
      { label: "Biología", path: "/biologia" },
    ],
  },
];

function App() {
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <header className="hero-banner">
        <p className="hero-kicker">Aula virtual de ciencias</p>
        <h1>Biología CONED Turrialba</h1>
        <p className="hero-subtitle">
          Lic. Cristiam Gutierrez · Recursos organizados por nivel y área.
        </p>
      </header>
      <main className="sections">
        {groups.map((group) => (
          <section key={group.id} className={`section section-${group.id}`}>
            <p className="section-label">{group.label}</p>
            <h2>{group.title}</h2>
            <p className="section-description">{group.description}</p>
            <div className="section-actions">
              {group.actions.map((action) => (
                <button key={action.path} onClick={() => navigate(action.path)}>
                  {action.label}
                </button>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}

export default App
