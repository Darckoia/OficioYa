import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-change-me';

const categories = [
  { id:'electricidad', name:'Electricidad', icon:'⚡' },
  { id:'gasfiteria', name:'Gasfitería', icon:'🔧' },
  { id:'carpinteria', name:'Carpintería', icon:'🪚' },
  { id:'pintura', name:'Pintura', icon:'🖌️' },
  { id:'limpieza', name:'Limpieza', icon:'🧹' },
  { id:'construccion', name:'Construcción', icon:'🧱' },
  { id:'tecnologia', name:'Tecnología', icon:'💻' },
  { id:'jardineria', name:'Jardinería', icon:'🌱' }
];

const users = [];
const services = [
  { id:'p1', name:'Carlos González', trade:'Electricista', category:'electricidad', city:'Santiago', rating:4.9, jobs:127, verified:true, priceFrom:18000, bio:'Instalaciones, reparaciones y tableros eléctricos.' },
  { id:'p2', name:'María Pérez', trade:'Gasfíter', category:'gasfiteria', city:'Santiago', rating:4.8, jobs:94, verified:true, priceFrom:15000, bio:'Fugas, grifería, calefont y mantenciones.' },
  { id:'p3', name:'Jorge Soto', trade:'Carpintero', category:'carpinteria', city:'Maipú', rating:4.7, jobs:61, verified:false, priceFrom:22000, bio:'Muebles a medida, reparaciones y terminaciones.' }
];
const requests = [];
const quotes = [];
const messages = [];

const tokenFor = user => jwt.sign({ id:user.id, role:user.role }, JWT_SECRET, { expiresIn:'7d' });
const auth = (req,res,next) => { try { const h=req.headers.authorization||''; const token=h.startsWith('Bearer ')?h.slice(7):null; if(!token) return res.status(401).json({error:'Autenticación requerida'}); req.user=jwt.verify(token,JWT_SECRET); next(); } catch { return res.status(401).json({error:'Token inválido'}); } };

app.get('/health', (_,res)=>res.json({ok:true, service:'oficioya-api', version:'0.1.0'}));
app.get('/api/categories', (_,res)=>res.json(categories));
app.get('/api/professionals', (req,res)=>{
  const q=String(req.query.q||'').toLowerCase(); const category=String(req.query.category||'').toLowerCase(); const city=String(req.query.city||'').toLowerCase();
  const result=services.filter(p=>(!q || `${p.name} ${p.trade} ${p.bio}`.toLowerCase().includes(q)) && (!category || p.category===category) && (!city || p.city.toLowerCase().includes(city)));
  res.json(result);
});
app.get('/api/professionals/:id',(req,res)=>{ const p=services.find(x=>x.id===req.params.id); return p?res.json(p):res.status(404).json({error:'Profesional no encontrado'}); });

app.post('/api/auth/register', async (req,res)=>{
  const schema=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8),role:z.enum(['client','professional']).default('client')});
  const parsed=schema.safeParse(req.body); if(!parsed.success) return res.status(400).json({error:'Datos inválidos',details:parsed.error.flatten()});
  if(users.some(u=>u.email===parsed.data.email)) return res.status(409).json({error:'El correo ya está registrado'});
  const user={id:crypto.randomUUID(),...parsed.data,password:await bcrypt.hash(parsed.data.password,10),createdAt:new Date().toISOString()}; users.push(user);
  res.status(201).json({user:{id:user.id,name:user.name,email:user.email,role:user.role},token:tokenFor(user)});
});
app.post('/api/auth/login', async (req,res)=>{
  const schema=z.object({email:z.string().email(),password:z.string().min(1)}); const parsed=schema.safeParse(req.body); if(!parsed.success) return res.status(400).json({error:'Datos inválidos'});
  const user=users.find(u=>u.email===parsed.data.email); if(!user || !(await bcrypt.compare(parsed.data.password,user.password))) return res.status(401).json({error:'Correo o contraseña incorrectos'});
  res.json({user:{id:user.id,name:user.name,email:user.email,role:user.role},token:tokenFor(user)});
});

app.post('/api/requests',auth,(req,res)=>{ const schema=z.object({professionalId:z.string(),title:z.string().min(3),description:z.string().min(10),address:z.string().min(3),budget:z.number().nonnegative().optional()}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Datos inválidos'}); const item={id:crypto.randomUUID(),clientId:req.user.id,status:'open',createdAt:new Date().toISOString(),...p.data}; requests.push(item); res.status(201).json(item); });
app.get('/api/requests',auth,(req,res)=>res.json(requests.filter(r=>r.clientId===req.user.id)));
app.post('/api/quotes',auth,(req,res)=>{ const schema=z.object({requestId:z.string(),amount:z.number().positive(),message:z.string().min(3)}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Datos inválidos'}); const q={id:crypto.randomUUID(),professionalId:req.user.id,status:'pending',createdAt:new Date().toISOString(),...p.data}; quotes.push(q); res.status(201).json(q); });
app.get('/api/quotes/:requestId',auth,(req,res)=>res.json(quotes.filter(q=>q.requestId===req.params.requestId)));
app.get('/api/messages/:requestId',auth,(req,res)=>res.json(messages.filter(m=>m.requestId===req.params.requestId)));
app.post('/api/messages',auth,(req,res)=>{ const schema=z.object({requestId:z.string(),text:z.string().min(1).max(2000)}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Mensaje inválido'}); const m={id:crypto.randomUUID(),senderId:req.user.id,createdAt:new Date().toISOString(),...p.data}; messages.push(m); res.status(201).json(m); });

app.use((_,res)=>res.status(404).json({error:'Ruta no encontrada'}));
app.listen(PORT,()=>console.log(`OficioYa API listening on :${PORT}`));
