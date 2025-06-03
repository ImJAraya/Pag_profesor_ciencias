import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import './App.css'

function App() {
  const navigate = useNavigate();

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
            <button onClick={() => navigate('/material')}>Material</button>
            <button onClick={() => navigate('/practicas')}>Prácticas</button>
            <button onClick={() => navigate('/videos/PLUbkPYHjSbfCGnWbUkTvy02tXum4u8Ter')}>Videos</button>
          </ul>
        </section>
        <section className="section once">
          <h3>Grupo 11mo</h3>
          <ul>
            <button onClick={() => navigate('/material')}>Material</button>
            <button onClick={() => navigate('/practicas')}>Prácticas</button>
            <button onClick={() => navigate('/videos/PLUbkPYHjSbfAR7xTTN8g49KtUQFTitZIF')}>Videos</button>
          </ul>
        </section>
        <section className="section pne">
          <h3>Grupo PNE</h3>
          <ul>
            <button onClick={() => navigate('/fisica')}>Física</button>
            <button onClick={() => navigate('/quimica')}>Química</button>
            <button onClick={() => navigate('/biologia')}>Biología</button>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default App
