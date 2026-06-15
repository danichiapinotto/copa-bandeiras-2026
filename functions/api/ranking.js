export async function onRequestGet(context) {
  const { env } = context;

  const { results } = await env.DB.prepare(
    `SELECT name, turma, score, total_questions, errors, duration_seconds, created_at
     FROM participants
     ORDER BY score DESC, duration_seconds ASC, created_at ASC
     LIMIT 200`
  ).all();

  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" },
  });
}
