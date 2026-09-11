const provider = process.env.AI_PROVIDER || 'openai-compatible';
const model = process.env.AI_MODEL || 'gpt-5-mini';
const baseUrl = process.env.AI_BASE_URL || 'https://api.openai.com/v1';

export async function generateText({ system, user, temperature = 0.2 }) {
  const key = process.env.AI_API_KEY;
  if (!key) throw new Error('AI_API_KEY no configurada');
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model, temperature, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] })
  });
  if (!response.ok) throw new Error(`Proveedor IA respondió ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}

export function aiInfo() { return { provider, model, baseUrl: baseUrl.replace(/\/v1$/, '') }; }
