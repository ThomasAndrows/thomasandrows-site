// Shared helper for the contact and newsletter Pages Functions.
// Required env vars (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY      secret, from resend.com (free tier is enough)
// Optional env vars:
//   CONTACT_TO          where messages are delivered (default thomasandrows@gmail.com)
//   CONTACT_FROM        sender, e.g. "Website <hello@thomasandrows.com>" once your domain is verified in Resend.
//                       Default: "Website <onboarding@resend.dev>" (works for testing, delivers to your Resend account email only)
//   TURNSTILE_SECRET    secret, enables Cloudflare Turnstile verification

export interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) && e.length <= 254;

export async function handle(request: Request, env: Env, kind: 'contact' | 'newsletter') {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request' }, 400);
  }

  // Honeypot: bots fill this hidden field
  if (data.website) return json({ ok: true });

  const email = String(data.email || '').trim();
  const name = String(data.name || '').trim().slice(0, 120);
  const message = String(data.message || '').trim().slice(0, 5000);
  if (!validEmail(email)) return json({ ok: false, error: 'Invalid email' }, 400);
  // Newsletter requires explicit opt-in (GDPR, DPDP). The form checkbox sends consent=on.
  if (kind === 'newsletter' && !data.consent) return json({ ok: false, error: 'Consent required' }, 400);
  if (kind === 'contact' && (!name || message.length < 5)) return json({ ok: false, error: 'Missing fields' }, 400);

  if (env.TURNSTILE_SECRET) {
    const token = data['cf-turnstile-response'];
    if (!token) return json({ ok: false, error: 'Captcha required' }, 400);
    const form = new FormData();
    form.append('secret', env.TURNSTILE_SECRET);
    form.append('response', token);
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) form.append('remoteip', ip);
    const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const vj = (await v.json()) as { success?: boolean };
    if (!vj.success) return json({ ok: false, error: 'Captcha failed' }, 400);
  }

  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'Email service not configured' }, 500);

  const subject = kind === 'contact' ? `Website message from ${name}` : 'New newsletter signup';
  const html =
    kind === 'contact'
      ? `<p><strong>Name:</strong> ${esc(name)}</p><p><strong>Email:</strong> ${esc(email)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`
      : `<p>New newsletter signup:</p><p><strong>${esc(email)}</strong></p><p style="color:#666">Consent given via unticked checkbox on ${new Date().toISOString()} (UTC). Text: "I agree to receive the weekly analytics notes by email."</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'Website <onboarding@resend.dev>',
      to: [env.CONTACT_TO || 'thomasandrows@gmail.com'],
      reply_to: email,
      subject,
      html,
    }),
  });
  if (!res.ok) return json({ ok: false, error: 'Email provider error' }, 502);
  return json({ ok: true });
}
