import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { generateText, aiInfo } from './ai.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '4mb' }));

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev-only-change-me';
const TRIAL_CODE = 'POCHOKLITO';
const TRIAL_HOURS = 48;

const categories = [
  { id:'comida-casera', name:'Comida casera', icon:'🍲' },
  { id:'unas-belleza', name:'Uñas y belleza', icon:'💅' },
  { id:'fletes-entrega', name:'Fletes y entrega', icon:'🚚' },
  { id:'reventa', name:'Reventa', icon:'🛍️' },
  { id:'productos-nuevos', name:'Productos nuevos', icon:'📦' },
  { id:'supermercado', name:'Supermercado', icon:'🛒' }
];

const users = [];
const businesses = [];
const products = [];
const trials = [];
const services = [
  { id:'p1', name:'Carlos González', trade:'Electricista', category:'servicios', city:'Santiago', rating:4.9, jobs:127, verified:true, priceFrom:18000, bio:'Instalaciones, reparaciones y tableros eléctricos.' },
  { id:'p2', name:'María Pérez', trade:'Gasfíter', category:'servicios', city:'Santiago', rating:4.8, jobs:94, verified:true, priceFrom:15000, bio:'Fugas, grifería, calefont y mantenciones.' },
  { id:'p3', name:'Jorge Soto', trade:'Carpintero', category:'servicios', city:'Maipú', rating:4.7, jobs:61, verified:false, priceFrom:22000, bio:'Muebles a medida, reparaciones y terminaciones.' }
];
const requests = [];
const quotes = [];
const messages = [];

const tokenFor = user => jwt.sign({ id:user.id, role:user.role }, JWT_SECRET, { expiresIn:'7d' });
const auth = (req,res,next) => { try { const h=req.headers.authorization||''; const token=h.startsWith('Bearer ')?h.slice(7):null; if(!token) return res.status(401).json({error:'Autenticación requerida'}); req.user=jwt.verify(token,JWT_SECRET); next(); } catch { return res.status(401).json({error:'Token inválido'}); } };

app.get('/health', (_,res)=>res.json({ok:true, service:'oficioya-api', version:'0.2.0'}));
app.get('/api/ai/info', (_,res)=>res.json(aiInfo()));
app.get('/api/categories', (_,res)=>res.json(categories));
app.get('/api/professionals', (req,res)=>{
  const q=String(req.query.q||'').toLowerCase(); const category=String(req.query.category||'').toLowerCase(); const city=String(req.query.city||'').toLowerCase();
  const result=services.filter(p=>(!q || `${p.name} ${p.trade} ${p.bio}`.toLowerCase().includes(q)) && (!category || p.category===category) && (!city || p.city.toLowerCase().includes(city)));
  res.json(result);
});
app.get('/api/professionals/:id',(req,res)=>{ const p=services.find(x=>x.id===req.params.id); return p?res.json(p):res.status(404).json({error:'Profesional no encontrado'}); });

app.post('/api/auth/register', async (req,res)=>{
  const schema=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8),role:z.enum(['client','professional','business']).default('business')});
  const parsed=schema.safeParse(req.body); if(!parsed.success) return res.status(400).json({error:'Datos inválidos'});
  if(users.some(u=>u.email===parsed.data.email)) return res.status(409).json({error:'El correo ya está registrado'});
  const user={id:crypto.randomUUID(),...parsed.data,password:await bcrypt.hash(parsed.data.password,10),createdAt:new Date().toISOString()}; users.push(user);
  res.status(201).json({user:{id:user.id,name:user.name,email:user.email,role:user.role},token:tokenFor(user)});
});
app.post('/api/auth/login', async (req,res)=>{
  const schema=z.object({email:z.string().email(),password:z.string().min(1)}); const parsed=schema.safeParse(req.body); if(!parsed.success) return res.status(400).json({error:'Datos inválidos'});
  const user=users.find(u=>u.email===parsed.data.email); if(!user || !(await bcrypt.compare(parsed.data.password,user.password))) return res.status(401).json({error:'Correo o contraseña incorrectos'});
  res.json({user:{id:user.id,name:user.name,email:user.email,role:user.role},token:tokenFor(user)});
});

app.post('/api/trial/redeem', (req,res)=>{
  const schema=z.object({code:z.string().trim().min(1),userId:z.string().optional()}); const p=schema.safeParse(req.body);
  if(!p.success || p.data.code.toUpperCase()!==TRIAL_CODE) return res.status(400).json({error:'Código de amistad inválido'});
  if(p.data.userId && trials.some(t=>t.userId===p.data.userId)) return res.status(409).json({error:'Esta cuenta ya utilizó la prueba de amistad'});
  const startedAt=new Date(); const expiresAt=new Date(startedAt.getTime()+TRIAL_HOURS*60*60*1000);
  const trial={id:crypto.randomUUID(),userId:p.data.userId||null,startedAt:startedAt.toISOString(),expiresAt:expiresAt.toISOString(),status:'active',kind:'friends'}; trials.push(trial);
  res.status(201).json(trial);
});
app.get('/api/trial/status',auth,(req,res)=>{ const t=trials.find(x=>x.userId===req.user.id); if(!t) return res.json({active:false}); const active=new Date(t.expiresAt)>new Date(); res.json({...t,active,status:active?'active':'expired'}); });

app.post('/api/businesses',auth,(req,res)=>{
  const schema=z.object({name:z.string().min(2),category:z.string().min(2),city:z.string().min(2),whatsapp:z.string().min(8).optional(),description:z.string().max(1000).optional()}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Datos de negocio inválidos'});
  const business={id:crypto.randomUUID(),ownerId:req.user.id,country:'CL',currency:'CLP',...p.data,createdAt:new Date().toISOString()}; businesses.push(business); res.status(201).json(business);
});
app.get('/api/businesses/me',auth,(req,res)=>res.json(businesses.filter(b=>b.ownerId===req.user.id)));

app.post('/api/products',auth,(req,res)=>{
  const schema=z.object({businessId:z.string(),name:z.string().min(1),description:z.string().max(3000).optional(),priceClp:z.number().int().nonnegative().optional(),costClp:z.number().int().nonnegative().optional(),stock:z.number().int().nonnegative().default(0),sku:z.string().max(80).optional(),ean:z.string().max(20).optional(),imageUrl:z.string().url().optional()}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Producto inválido'});
  const business=businesses.find(b=>b.id===p.data.businessId&&b.ownerId===req.user.id); if(!business)return res.status(404).json({error:'Negocio no encontrado'});
  const product={id:crypto.randomUUID(),ownerId:req.user.id,createdAt:new Date().toISOString(),...p.data}; products.push(product); res.status(201).json(product);
});
app.get('/api/products',auth,(req,res)=>res.json(products.filter(p=>p.ownerId===req.user.id)));
app.patch('/api/products/:id',auth,(req,res)=>{ const i=products.findIndex(p=>p.id===req.params.id&&p.ownerId===req.user.id); if(i<0)return res.status(404).json({error:'Producto no encontrado'}); const patch=z.object({name:z.string().min(1).optional(),description:z.string().max(3000).optional(),priceClp:z.number().int().nonnegative().optional(),costClp:z.number().int().nonnegative().optional(),stock:z.number().int().nonnegative().optional(),sku:z.string().max(80).optional(),ean:z.string().max(20).optional(),imageUrl:z.string().url().optional()}).safeParse(req.body); if(!patch.success)return res.status(400).json({error:'Datos inválidos'}); products[i]={...products[i],...patch.data,updatedAt:new Date().toISOString()}; res.json(products[i]); });

app.post('/api/ai/sales-message',auth,async(req,res)=>{ const schema=z.object({product:z.string().min(1),priceClp:z.number().int().nonnegative().optional(),details:z.string().max(2000).optional(),tone:z.enum(['cercano','directo','formal']).default('cercano')}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Datos inválidos'}); try { const text=await generateText({system:'Eres el asistente comercial de OficioYa para Chile. Redacta mensajes claros y breves para WhatsApp. Nunca inventes precio, stock, descuentos, horarios, contactos o condiciones. Si falta un dato, no lo afirmes.',user:`Producto: ${p.data.product}\nPrecio CLP: ${p.data.priceClp??'no informado'}\nDetalles: ${p.data.details??'no informados'}\nTono: ${p.data.tone}`}); res.json({text}); } catch(e) { res.status(503).json({error:'Servicio de IA no disponible',detail:e.message}); } });

app.post('/api/requests',auth,(req,res)=>{ const schema=z.object({professionalId:z.string(),title:z.string().min(3),description:z.string().min(10),address:z.string().min(3),budget:z.number().nonnegative().optional()}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Datos inválidos'}); const item={id:crypto.randomUUID(),clientId:req.user.id,status:'open',createdAt:new Date().toISOString(),...p.data}; requests.push(item); res.status(201).json(item); });
app.get('/api/requests',auth,(req,res)=>res.json(requests.filter(r=>r.clientId===req.user.id)));
app.post('/api/quotes',auth,(req,res)=>{ const schema=z.object({requestId:z.string(),amount:z.number().positive(),message:z.string().min(3)}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Datos inválidos'}); const q={id:crypto.randomUUID(),professionalId:req.user.id,status:'pending',createdAt:new Date().toISOString(),...p.data}; quotes.push(q); res.status(201).json(q); });
app.get('/api/quotes/:requestId',auth,(req,res)=>res.json(quotes.filter(q=>q.requestId===req.params.requestId)));
app.get('/api/messages/:requestId',auth,(req,res)=>res.json(messages.filter(m=>m.requestId===req.params.requestId)));
app.post('/api/messages',auth,(req,res)=>{ const schema=z.object({requestId:z.string(),text:z.string().min(1).max(2000)}); const p=schema.safeParse(req.body); if(!p.success)return res.status(400).json({error:'Mensaje inválido'}); const m={id:crypto.randomUUID(),senderId:req.user.id,createdAt:new Date().toISOString(),...p.data}; messages.push(m); res.status(201).json(m); });

app.use((_,res)=>res.status(404).json({error:'Ruta no encontrada'}));
app.listen(PORT,()=>console.log(`OficioYa API listening on :${PORT}`));
