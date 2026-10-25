// Sends real emails through an HTTP mail API (Brevo or Resend).
// Render's free plan blocks SMTP ports, so an HTTP API is used instead of Gmail/SMTP.
// Needed environment variables (see the setup steps):
//   MAIL_FROM (a sender address verified at the provider), MAIL_FROM_NAME (optional)
//   BREVO_API_KEY   or   RESEND_API_KEY
// Without them the app works as before and simply skips emails (a note is printed in the server log).

const cfg = () => ({
  brevo: (process.env.BREVO_API_KEY || '').trim(),
  resend: (process.env.RESEND_API_KEY || '').trim(),
  from: (process.env.MAIL_FROM || '').trim(),
  name: (process.env.MAIL_FROM_NAME || 'NEXORA').trim()
});

function enabled() {
  const c = cfg();
  return !!(c.from && (c.brevo || c.resend));
}

async function send({ to, name, subject, html, text }) {
  const c = cfg();
  if (!enabled()) return { ok: false, skipped: true };
  let res;
  if (c.brevo) {
    res = await fetch(process.env.BREVO_API_URL || 'https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': c.brevo, 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ sender: { name: c.name, email: c.from }, to: [{ email: to, name: name || to }], subject, htmlContent: html, textContent: text }),
      signal: AbortSignal.timeout(15000)
    });
  } else {
    res = await fetch(process.env.RESEND_API_URL || 'https://api.resend.com/emails', {
      method: 'POST',
      headers: { authorization: 'Bearer ' + c.resend, 'content-type': 'application/json' },
      body: JSON.stringify({ from: c.name + ' <' + c.from + '>', to: [to], subject, html, text }),
      signal: AbortSignal.timeout(15000)
    });
  }
  if (!res.ok) throw new Error('Mail API ' + res.status + ': ' + (await res.text().catch(() => '')).slice(0, 200));
  return { ok: true };
}

// Fire and forget: a mail problem must never break registering, resetting a password or claiming a certificate.
function notify(msg) {
  if (!enabled()) {
    console.log('Mail not configured, skipped: "' + msg.subject + '" to ' + msg.to);
    return;
  }
  send(msg).then(() => console.log('Mail sent: "' + msg.subject + '" to ' + msg.to))
    .catch((e) => console.error('Mail failed for ' + msg.to + ': ' + e.message));
}

module.exports = { send, notify, enabled };
