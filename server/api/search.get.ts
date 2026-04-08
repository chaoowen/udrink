export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = query.q as string;

  if (!q) {
    return [];
  }

  const DB = event.context.cloudflare?.env?.DB;

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' });
  }

  // Fuzzy search on shops and drinks
  // Using a combined query to return drinks with their shop names
  const results = await DB.prepare(`
    SELECT 
      d.id as drink_id, 
      d.name as drink_name, 
      d.category, 
      s.name as shop_name,
      s.id as shop_id
    FROM drinks d
    JOIN shops s ON d.shop_id = s.id
    WHERE d.name LIKE ? OR s.name LIKE ?
    LIMIT 20
  `)
  .bind(`%${q}%`, `%${q}%`)
  .all();

  return results.results;
});
