// Email texts for NEXORA. Each function returns { subject, html, text }.

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const site = () => (process.env.PUBLIC_URL || (process.env.FRONTEND_URL || '').split(',')[0] || 'https://dsds-chi.vercel.app').trim().replace(/\/$/, '');
const apiBase = () => (process.env.PUBLIC_API_URL || process.env.RENDER_EXTERNAL_URL || '').trim().replace(/\/$/, '');
const first = (u) => String((u && u.name) || 'there').trim().split(/\s+/)[0] || 'there';

function layout({ heading, paragraphs, button, extra }) {
  const btn = button
    ? '<p style="margin:26px 0"><a href="' + esc(button.url) + '" style="background:#3b6cf6;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:999px;font-weight:600;display:inline-block">' + esc(button.label) + '</a></p>'
    : '';
  const html =
    '<div style="background:#f2f6fd;padding:24px 12px;font-family:Segoe UI,Arial,sans-serif;color:#1b2340">' +
    '<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden">' +
    '<tr><td style="background:#07123a;padding:22px 28px;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:6px">NEXORA</td></tr>' +
    '<tr><td style="padding:30px 28px;line-height:1.65;font-size:15px">' +
    '<h2 style="margin:0 0 14px;font-size:21px">' + esc(heading) + '</h2>' +
    paragraphs.map((p) => '<p style="margin:0 0 12px">' + p + '</p>').join('') +
    btn + (extra || '') +
    '</td></tr>' +
    '<tr><td style="padding:16px 28px;background:#f7f9fe;color:#6a7899;font-size:12px">Your Journey. Your Skills. Your Placement.<br>You are receiving this because of activity on your NEXORA account.</td></tr>' +
    '</table></div>';
  return html;
}

const strip = (s) => String(s).replace(/<[^>]+>/g, '');

function welcome(user) {
  const url = site() + '/login';
  const paragraphs = [
    'Hi ' + esc(first(user)) + ', your NEXORA account is ready.',
    'A good first step is the skill assessment. It finds your level and builds a roadmap around the topics you need most. After that you can practise company questions, take mock tests and mock interviews, and earn certificates.'
  ];
  return {
    subject: 'Welcome to NEXORA, ' + first(user),
    html: layout({ heading: 'Welcome to NEXORA', paragraphs, button: { label: 'Open NEXORA', url } }),
    text: 'Hi ' + first(user) + ',\n\nYour NEXORA account is ready. Start with the skill assessment, then practise company questions, mock tests and mock interviews.\n\nOpen NEXORA: ' + url + '\n'
  };
}

function passwordChanged(user) {
  const when = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST';
  const url = site() + '/forgot-password';
  const paragraphs = [
    'Hi ' + esc(first(user)) + ', the password of your NEXORA account was changed on ' + esc(when) + '.',
    'If this was you, no action is needed. If it was not you, reset your password again right away.'
  ];
  return {
    subject: 'Your NEXORA password was changed',
    html: layout({ heading: 'Password changed', paragraphs, button: { label: 'This was not me', url } }),
    text: 'Hi ' + first(user) + ',\n\nYour NEXORA password was changed on ' + when + '.\nIf this was not you, reset it again now: ' + url + '\n'
  };
}

function certificate(user, cert) {
  const verify = site() + '/verify/' + cert.code;
  const api = apiBase();
  const pdf = api ? api + '/api/certificates/' + cert.code + '/pdf' : '';
  const paragraphs = [
    'Congratulations ' + esc(first(user)) + '! You have earned the <b>' + esc(cert.title) + '</b>.',
    'Requirement met: ' + esc(cert.need) + '.',
    'Certificate code: <b style="letter-spacing:1px">' + esc(cert.code) + '</b>. Anyone can check it on the verify page, so you can share it with recruiters.'
  ];
  const extra = pdf
    ? '<p style="margin:0 0 6px"><a href="' + esc(pdf) + '" style="color:#3b6cf6;font-weight:600">Download the certificate PDF</a></p>'
    : '<p style="margin:0 0 6px;color:#6a7899">You can download the PDF from the Placement Passport page after you log in.</p>';
  return {
    subject: 'Your NEXORA certificate: ' + cert.title,
    html: layout({ heading: 'You earned a certificate', paragraphs, button: { label: 'Verify certificate', url: verify }, extra }),
    text: strip('Congratulations ' + first(user) + '! You earned the ' + cert.title + '.\nRequirement met: ' + cert.need + '.\nCertificate code: ' + cert.code + '\nVerify: ' + verify + (pdf ? '\nPDF: ' + pdf : '') + '\n')
  };
}

module.exports = { welcome, passwordChanged, certificate };
