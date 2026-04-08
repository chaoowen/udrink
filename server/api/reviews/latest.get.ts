export default defineEventHandler(async (event) => {
  const DB = event.context.cloudflare?.env?.DB;

  if (!DB) {
    throw createError({ statusCode: 500, statusMessage: 'DB not found' });
  }

  const results = await DB.prepare(`
    SELECT 
      r.id,
      r.rating,
      r.sugar_ice,
      r.comment,
      r.created_at,
      u.username,
      d.name as drink_name,
      s.name as shop_name
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    JOIN drinks d ON r.drink_id = d.id
    JOIN shops s ON d.shop_id = s.id
    ORDER BY r.created_at DESC
    LIMIT 20
  `)
  .all();

  return results.results;
});
