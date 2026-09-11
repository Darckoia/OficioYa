import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const categories = ['Electricista', 'Plomero', 'Carpintero', 'Pintor', 'Limpieza', 'Técnico'];

function App() {
  return (
    <main className="page">
      <nav><strong>OficioYa</strong><span>Encuentra profesionales cerca de ti</span><button>Ingresar</button></nav>
      <section className="hero">
        <div><p className="eyebrow">SERVICIOS LOCALES</p><h1>El profesional que necesitas, <em>más cerca.</em></h1><p>Busca por oficio, ubicación y reputación. Solicita un servicio y recibe cotizaciones.</p>
          <div className="search"><input aria-label="Buscar oficio" placeholder="¿Qué servicio necesitas?" /><button>Buscar</button></div>
        </div>
      </section>
      <section className="categories"><h2>Explora oficios</h2><div className="grid">{categories.map(c => <article key={c}><span>🛠️</span><h3>{c}</h3><p>Profesionales disponibles</p></article>)}</div></section>
      <section className="trust"><div><strong>Perfiles verificados</strong><span>Conoce experiencia y valoraciones.</span></div><div><strong>Cotiza antes de contratar</strong><span>Compara propuestas de profesionales.</span></div><div><strong>Habla directamente</strong><span>Chat para coordinar el trabajo.</span></div></section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
