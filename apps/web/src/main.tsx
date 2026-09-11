import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const API=import.meta.env.VITE_API_URL||'http://localhost:4000';
const tools=[
 {icon:'🤖',title:'IA para tu negocio',text:'Analiza productos, crea descripciones y prepara contenido comercial.'},
 {icon:'📦',title:'Catálogo e inventario',text:'Organiza productos, precios, stock, SKU y códigos EAN.'},
 {icon:'💬',title:'Mensajes y presupuestos',text:'Crea mensajes comerciales claros y presupuestos listos para WhatsApp.'},
 {icon:'🌐',title:'Página y vitrina',text:'Presenta tu negocio y productos desde el teléfono.'}
];
const rubros=['Comida casera','Uñas y belleza','Fletes y entrega','Reventa','Productos nuevos','Supermercado'];
function App(){
 const [trial,setTrial]=useState(false); const [code,setCode]=useState(''); const [status,setStatus]=useState('');
 const redeem=async()=>{setStatus('Verificando…');try{const r=await fetch(`${API}/api/trial/redeem`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})});const d=await r.json();setStatus(r.ok?'Prueba activada por 48 horas.':d.error||'Código inválido.')}catch{setStatus('No se pudo conectar con OficioYa.')}};
 return <div className="app"><header><a className="brand" href="#inicio">Oficio<span>Ya</span></a><nav><a href="#herramientas">Herramientas</a><a href="#ia">IA</a><a href="#como">Cómo funciona</a></nav><button className="ghost" onClick={()=>setTrial(true)}>Prueba de amistad</button></header>
 <main id="inicio">
  <section className="hero"><div className="hero-copy"><div className="pill">🇨🇱 Hecho para emprender en Chile</div><h1>Tu negocio, <span>desde el teléfono.</span></h1><p>OficioYa reúne inteligencia artificial, catálogo, inventario, vitrina, páginas y herramientas comerciales para pequeños negocios y emprendedores.</p><div className="actions"><button className="primary" onClick={()=>setTrial(true)}>Probar OficioYa →</button><a className="secondary" href="#herramientas">Ver herramientas</a></div><div className="trust"><span>⚡ Rápido</span><span>🤖 IA</span><span>📱 Móvil primero</span><span>🇨🇱 Chile</span></div></div><div className="hero-panel"><div className="phone"><div className="phone-top">OficioYa <span>●</span></div><div className="hello">Hola 👋<br/><strong>¿Qué quieres hacer hoy?</strong></div><div className="phone-grid"><b>🤖<small>Analizar foto</small></b><b>📦<small>Productos</small></b><b>💬<small>Mensajes</small></b><b>🌐<small>Mi vitrina</small></b></div><div className="phone-card">📈 Tu negocio está listo para crecer</div></div></div></section>
  <section id="herramientas" className="section"><div className="section-head"><div><small>TODO EN UN SOLO LUGAR</small><h2>Herramientas para vender mejor</h2></div></div><div className="tool-grid">{tools.map(t=><article className="tool" key={t.title}><div className="tool-icon">{t.icon}</div><h3>{t.title}</h3><p>{t.text}</p></article>)}</div></section>
  <section id="ia" className="ai-section"><div><small>INTELIGENCIA ARTIFICIAL</small><h2>De una foto a un producto listo para vender.</h2><p>Sube una fotografía y OficioYa puede ayudarte a identificar el producto, redactar una descripción, sugerir categoría y estimar un rango de precio para Chile. Tú confirmas antes de guardar.</p><button className="primary" onClick={()=>setTrial(true)}>Probar con una foto →</button></div><div className="flow"><div>📷<strong>Foto</strong></div><span>→</span><div>🤖<strong>IA</strong></div><span>→</span><div>📦<strong>Producto</strong></div><span>→</span><div>💬<strong>Venta</strong></div></div></section>
  <section className="section"><div className="section-head"><div><small>PARA TU RUBRO</small><h2>Empieza donde estás</h2></div></div><div className="rubros">{rubros.map((r,i)=><div key={r}><span>{['🍲','💅','🚚','🛍️','📦','🛒'][i]}</span>{r}</div>)}</div></section>
  <section id="como" className="how"><div><small>ASÍ FUNCIONA</small><h2>Del producto al cliente, sin complicarte.</h2></div><div className="steps"><div><b>01</b><h3>Crea tu negocio</h3><p>Define nombre, rubro, comuna y canales de contacto.</p></div><div><b>02</b><h3>Carga productos</h3><p>Agrega fotos y deja que la IA te ayude a completar la información.</p></div><div><b>03</b><h3>Vende</h3><p>Comparte tu vitrina, responde y prepara presupuestos.</p></div></div></section>
  <section className="cta"><div><small>PRUEBA PRIVADA</small><h2>Acceso para amistades por 48 horas.</h2><p>El código Pochoklito está reservado para pruebas privadas y no es un plan comercial.</p></div><button onClick={()=>setTrial(true)}>Ingresar código →</button></section>
 </main><footer><strong>OficioYa</strong><span>Herramientas para pequeños negocios en Chile.</span><span>© 2026</span></footer>
 {trial&&<div className="modal" onClick={()=>setTrial(false)}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setTrial(false)}>×</button><div className="tool-icon">🔐</div><h2>Prueba de amistad</h2><p>Ingresa tu código para activar 48 horas de acceso.</p><input className="field" value={code} onChange={e=>setCode(e.target.value)} placeholder="Código de acceso" autoCapitalize="characters"/><button className="primary full" onClick={redeem}>Activar prueba</button>{status&&<p className="status">{status}</p>}</div></div>}
 </div>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
