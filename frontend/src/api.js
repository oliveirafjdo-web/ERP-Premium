// frontend/src/api.js
const API_BASE = import.meta.env.VITE_API_URL || '';

export async function fetchJson(path, options = {}) {
  const url = path.startsWith('http')
    ? path
    : ${API_BASE}${path};

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Erro na API', res.status, text);
    throw new Error(Erro na API: ${res.status});
  }

  try {
    return await res.json();
  } catch (err) {
    console.error('Erro ao fazer parse do JSON:', err);
    throw err;
  }
}
