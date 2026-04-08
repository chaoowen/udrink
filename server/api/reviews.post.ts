export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = getCookie(event, 'udrink_user_id');

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { drink_id, rating, sugar_ice, comment } = body;

  if (!drink_id || !rating) {
    throw createError({ statusCode: 400, statusMessage: 'Drink ID and Rating are required' });
  }

  const DB = event.context.cloudflare?.env?.DB;
  if (!DB) throw createError({ statusCode: 500 });

  const id = crypto.randomUUID();
  await DB.prepare(`
    INSERT INTO reviews (id, user_id, drink_id, rating, sugar_ice, comment)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  .bind(id, userId, drink_id, rating, sugar_ice, comment)
  .run();

  return { success: true, id };
});
