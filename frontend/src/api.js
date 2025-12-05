export async function fetchJson(url, options = {}) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(Erro HTTP ${res.status});
    }
    return await res.json();
  } catch (err) {
    console.error("Erro no fetchJson:", err);
    throw err;
  }
}
