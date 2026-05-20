interface Env {
  DB: D1Database;
}

// GET /api/like/:id — いいね数を取得
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;
  const row = await context.env.DB.prepare(
    "SELECT count FROM likes WHERE article_id = ?"
  )
    .bind(id)
    .first<{ count: number }>();

  return Response.json({ count: row?.count ?? 0 });
};

// POST /api/like/:id — いいね数を +1
export const onRequestPost: PagesFunction<Env> = async (context) => {
  const id = context.params.id as string;

  await context.env.DB.prepare(
    `INSERT INTO likes (article_id, count) VALUES (?, 1)
     ON CONFLICT(article_id) DO UPDATE SET count = count + 1`
  )
    .bind(id)
    .run();

  const row = await context.env.DB.prepare(
    "SELECT count FROM likes WHERE article_id = ?"
  )
    .bind(id)
    .first<{ count: number }>();

  return Response.json({ count: row?.count ?? 0 });
};
