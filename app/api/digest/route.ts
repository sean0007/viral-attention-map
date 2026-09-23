import { isEmail, isPublicHttpsWebhook } from "@/lib/links";

export const dynamic = "force-dynamic";

type DigestBody = {
  email?: unknown;
  watching?: unknown;
  fax?: unknown;
};

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

function cleanWatching(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, 280);
}

export async function GET() {
  return json({
    ok: true,
    stub: true,
    message:
      "POST { email } to this stub. No mailing list unless DIGEST_WEBHOOK_URL is set.",
  });
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 4000) {
    return json({ ok: false, error: "too_long", message: "That note is too long." }, 413);
  }

  let body: DigestBody;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      throw new Error("bad");
    }
    body = parsed as DigestBody;
  } catch {
    return json(
      { ok: false, error: "bad_json", message: "Send a JSON body with an email." },
      400,
    );
  }

  if (typeof body.fax === "string" && body.fax.trim().length > 0) {
    return json({
      ok: true,
      stub: true,
      forwarded: false,
      message:
        "Saved as a stub for this response only. No webhook is configured, so this deploy does not keep a mailing list.",
    });
  }

  if (typeof body.email !== "string") {
    return json(
      { ok: false, error: "email", message: "Enter an email address like name@example.com." },
      400,
    );
  }

  const email = body.email.trim().toLowerCase();
  if (!isEmail(email)) {
    return json(
      { ok: false, error: "email", message: "Enter an email address like name@example.com." },
      400,
    );
  }

  const payload = {
    source: "viral-attention-map",
    email,
    watching: cleanWatching(body.watching),
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.DIGEST_WEBHOOK_URL?.trim();
  let forwarded = false;
  if (webhook && isPublicHttpsWebhook(webhook)) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        redirect: "error",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000),
      });
      forwarded = response.ok;
    } catch (error) {
      console.error(
        "digest webhook failed",
        error instanceof Error ? error.name : "error",
      );
      forwarded = false;
    }
  }

  return json({
    ok: true,
    stub: true,
    forwarded,
    message: forwarded
      ? "Forwarded to the configured webhook. This is still a digest stub, not an alert to act."
      : "Saved as a stub for this response only. No webhook is configured, so this deploy does not keep a mailing list.",
  });
}
