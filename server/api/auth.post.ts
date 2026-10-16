/** POST /api/auth — 登入或註冊（Get or Create） */
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username } = body

  if (!username) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Username is required',
    })
  }

  const DB = useDB(event)

  // Check if user exists
  const existingUser = await DB.prepare('SELECT id, username FROM users WHERE username = ?')
    .bind(username)
    .first<{ id: string; username: string }>()

  let user: { id: string; username: string }
  if (existingUser) {
    user = existingUser
  } else {
    // Register "Get or Create" logic as per instructions
    const id = crypto.randomUUID()
    await DB.prepare('INSERT INTO users (id, username) VALUES (?, ?)')
      .bind(id, username)
      .run()
    user = { id, username }
  }

  // Set cookie for 30 days
  setCookie(event, 'udrink_user_id', user.id, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    httpOnly: false, // Allow frontend access if needed, though Pinia will handle it
    sameSite: 'lax',
  })

  return {
    success: true,
    user,
  }
})
