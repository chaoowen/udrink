export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username } = body;

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    });
  }

  // Nuxt/Nitro provides the DB binding in development if wrangler.toml is present
  // In production (Cloudflare), it's in event.context.cloudflare.env
  const DB = event.context.cloudflare?.env?.DB || (globalThis as any).__DB__;

  if (!DB) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Database binding not found. Make sure wrangler.toml is configured and you are running in a Cloudflare-compatible environment.',
    });
  }

  // Check if user exists
  const existingUser = await DB.prepare('SELECT * FROM users WHERE username = ?')
    .bind(username)
    .first();

  let user;
  if (existingUser) {
    user = existingUser;
  } else {
    // Register "Get or Create" logic as per instructions
    const id = crypto.randomUUID();
    await DB.prepare('INSERT INTO users (id, username) VALUES (?, ?)')
      .bind(id, username)
      .run();
    user = { id, username };
  }

  // Set cookie for 30 days
  setCookie(event, 'udrink_user_id', user.id, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false, // Allow frontend access if needed, though Pinia will handle it
    sameSite: 'lax',
  });

  return {
    success: true,
    user
  };
});
