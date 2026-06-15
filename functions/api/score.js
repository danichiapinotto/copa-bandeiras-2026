export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = (body.name || "").toString().trim().slice(0, 60);
  const turma = (body.turma || "").toString().trim().slice(0, 40);
  const score = Number(body.score);
  const total = Number(body.total);
  const errors = Number(body.errors);
  const duration = Math.round(Number(body.duration) || 0);

  if (!name) {
    return new Response(JSON.stringify({ error: "Nome é obrigatório" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    !Number.isFinite(score) ||
    !Number.isFinite(total) ||
    !Number.isFinite(errors) ||
    score < 0 ||
    total <= 0 ||
    score > total
  ) {
    return new Response(JSON.stringify({ error: "Dados de pontuação inválidos" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  await env.DB.prepare(
    `INSERT INTO participants (name, turma, score, total_questions, errors, duration_seconds, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(name, turma || null, score, total, errors, duration, Date.now())
    .run();

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
