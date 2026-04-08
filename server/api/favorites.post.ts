export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const userId = getCookie(event, 'udrink_user_id');

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
  }

  const { drink_id } = body;
  if (!drink_id) {
    throw createError({ statusCode: 400, statusMessage: 'Drink ID is required' });
  }

  const DB = event.context.cloudflare?.env?.DB;
  if (!DB) throw createError({ statusCode: 500 });

  // Toggle logic: Check if exists, then delete or insert
  const existing = await DB.prepare('SELECT * FROM favorites WHERE user_id = ? AND drink_id = ?')
    .bind(userId, drink_id)
    .first();

  if (existing) {
    await DB.prepare('DELETE FROM favorites WHERE user_id = ? AND drink_id = ?')
      .bind(userId, drink_id)
      .run();
    return { success: true, action: 'removed' };
  } else {
    await DB.prepare('INSERT INTO favorites (user_id, drink_id) VALUES (?, ?)')
      .bind(userId, drink_id)
      .run();
    return { success: true, action: 'added' };
  }
});
