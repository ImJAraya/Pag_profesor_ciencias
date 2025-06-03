import { useState } from 'react'
import { Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="banner">
        <h1>Biologia CONED Turrialba</h1>
        <h2>Prof. Cristiam Gutierrez</h2>
      </header>
      <main className="sections">
        <section className="section decimo">
          <h3>Grupo Décimo</h3>
          <ul>
            <li><Link to="/material">Material</Link></li>
            <li><Link to="/practicas">Prácticas</Link></li>
            <li><Link to="/videos">Videos</Link></li>
          </ul>
        </section>
        <section className="section once">
          <h3>Grupo 11mo</h3>
          <ul>
            <li><Link to="/material">Material</Link></li>
            <li><Link to="/practicas">Prácticas</Link></li>
            <li><Link to="/videos">Videos</Link></li>
          </ul>
        </section>
        <section className="section pne">
          <h3>Grupo PNE</h3>
          <ul>
            <li><Link to="/fisica">Física</Link></li>
            <li><Link to="/quimica">Química</Link></li>
            <li><Link to="/biologia">Biología</Link></li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
