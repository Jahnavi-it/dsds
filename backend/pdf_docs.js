const PDFDocument = require('pdfkit');
const QRCode = require('qrcode');

const NAVY = '#1c2340';
const BLUE = '#3b5bdb';
const GREY = '#5c6480';

const lines = (s) => String(s || '').split('\n').map((x) => x.trim()).filter(Boolean);
const clean = (s) => String(s || '').replace(/[\u0000-\u001f]/g, ' ').trim();

function send(res, doc, filename) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="' + filename + '"');
  doc.pipe(res);
  doc.end();
}

// Shrinks the font until the text fits on one line.
function fit(doc, text, font, size, maxWidth, min) {
  doc.font(font);
  let s = size;
  doc.fontSize(s);
  while (s > min && doc.widthOfString(text) > maxWidth) { s -= 1; doc.fontSize(s); }
  return s;
}

// ---------------------------------------------------------------------------
// Certificate: A4 landscape
// ---------------------------------------------------------------------------
async function certificatePdf(res, c) {
  const doc = new PDFDocument({ size: 'A4', layout: 'landscape', margin: 0, info: { Title: c.title + ' - ' + c.name, Author: 'NEXORA' } });
  const W = doc.page.width;
  const H = doc.page.height;

  // frame
  doc.rect(0, 0, W, H).fill('#ffffff');
  doc.lineWidth(6).strokeColor(NAVY).rect(22, 22, W - 44, H - 44).stroke();
  doc.lineWidth(1.5).strokeColor(BLUE).rect(34, 34, W - 68, H - 68).stroke();
  doc.rect(22, 22, W - 44, 14).fill(NAVY);

  // header
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(30).text('NEXORA', 0, 66, { width: W, align: 'center', characterSpacing: 6 });
  doc.fillColor(GREY).font('Helvetica').fontSize(11).text('PLACEMENT PREPARATION PLATFORM', 0, 104, { width: W, align: 'center', characterSpacing: 2 });

  doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(22).text('CERTIFICATE OF ACHIEVEMENT', 0, 140, { width: W, align: 'center', characterSpacing: 2 });

  doc.fillColor(GREY).font('Helvetica').fontSize(13).text('This is to certify that', 0, 188, { width: W, align: 'center' });

  // student name
  const name = clean(c.name) || 'Student';
  const size = fit(doc, name, 'Helvetica-BoldOblique', 38, W - 200, 18);
  doc.fillColor(NAVY).font('Helvetica-BoldOblique').fontSize(size).text(name, 0, 214, { width: W, align: 'center' });
  doc.lineWidth(1).strokeColor(NAVY).moveTo(W / 2 - 220, 262).lineTo(W / 2 + 220, 262).stroke();

  const sub = [c.college, c.branch].filter(Boolean).join(' | ');
  if (sub) doc.fillColor(GREY).font('Helvetica').fontSize(11).text(sub, 0, 268, { width: W, align: 'center' });

  doc.fillColor(GREY).font('Helvetica').fontSize(13).text('has successfully earned the', 0, 298, { width: W, align: 'center' });
  const tsize = fit(doc, c.title, 'Helvetica-Bold', 26, W - 200, 16);
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(tsize).text(c.title, 0, 322, { width: W, align: 'center' });
  doc.fillColor(GREY).font('Helvetica').fontSize(11).text('Requirement met: ' + c.need, 80, 358, { width: W - 160, align: 'center' });

  // footer: date | id | QR
  const date = new Date(String(c.issued_at).replace(' ', 'T') + (String(c.issued_at).includes('Z') ? '' : 'Z'));
  const dateText = isNaN(date) ? String(c.issued_at).slice(0, 10) : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });

  doc.lineWidth(1).strokeColor(GREY).moveTo(70, 465).lineTo(250, 465).stroke();
  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(12).text(dateText, 70, 446, { width: 180, align: 'center' });
  doc.fillColor(GREY).font('Helvetica').fontSize(10).text('Date of issue', 70, 472, { width: 180, align: 'center' });

  doc.fillColor(NAVY).font('Helvetica-Bold').fontSize(12).text(c.code, 300, 446, { width: W - 600, align: 'center' });
  doc.fillColor(GREY).font('Helvetica').fontSize(10).text('Certificate ID', 300, 472, { width: W - 600, align: 'center' });
  doc.fillColor(GREY).font('Helvetica').fontSize(9).text('Verify at: ' + c.verifyUrl, 200, 500, { width: W - 400, align: 'center', link: c.verifyUrl });

  const qr = await QRCode.toBuffer(c.verifyUrl, { margin: 1, width: 240 });
  doc.image(qr, W - 160, 420, { width: 80, height: 80 });
  doc.fillColor(GREY).font('Helvetica').fontSize(9).text('Scan to verify', W - 170, 504, { width: 100, align: 'center' });

  send(res, doc, 'NEXORA-Certificate-' + c.code + '.pdf');
}

// ---------------------------------------------------------------------------
// Resume: A4 portrait, single column, ATS friendly
// ---------------------------------------------------------------------------
function resumePdf(res, r) {
  const doc = new PDFDocument({ size: 'A4', margin: 50, info: { Title: 'Resume - ' + clean(r.name), Author: clean(r.name) } });
  const W = doc.page.width - 100;

  const heading = (t) => {
    doc.moveDown(0.8);
    doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(11).text(t.toUpperCase(), 50, doc.y, { width: W, characterSpacing: 1 });
    doc.lineWidth(0.8).strokeColor(BLUE).moveTo(50, doc.y + 1).lineTo(50 + W, doc.y + 1).stroke();
    doc.moveDown(0.4);
    doc.fillColor('#222222').font('Helvetica').fontSize(10.5);
  };

  const name = clean(r.name) || 'Your Name';
  fit(doc, name, 'Helvetica-Bold', 24, W, 14);
  doc.fillColor(NAVY).text(name, 50, 50, { width: W, align: 'center' });
  const contact = [clean(r.email), clean(r.phone)].filter(Boolean).join('  |  ');
  if (contact) doc.fillColor(GREY).font('Helvetica').fontSize(10.5).text(contact, { width: W, align: 'center' });

  if (clean(r.summary)) { heading('Career Objective'); doc.text(String(r.summary).trim(), { width: W, align: 'justify' }); }

  const edu = [clean(r.college), clean(r.branch)].filter(Boolean).join(', ');
  const extra = [r.year && 'Year ' + clean(r.year), r.cgpa && 'CGPA: ' + clean(r.cgpa)].filter(Boolean).join('  |  ');
  if (edu || extra) {
    heading('Education');
    if (edu) doc.font('Helvetica-Bold').text(edu, { width: W });
    if (extra) doc.font('Helvetica').text(extra, { width: W });
  }

  const skills = String(r.skills || '').split(',').map((x) => x.trim()).filter(Boolean);
  if (skills.length) { heading('Skills'); doc.text(skills.join('  •  '), { width: W }); }

  const bullets = (t, arr) => {
    if (!arr.length) return;
    heading(t);
    doc.list(arr, { bulletRadius: 1.8, textIndent: 12, bulletIndent: 4, width: W });
  };
  bullets('Projects', lines(r.projects));
  bullets('Achievements', lines(r.achievements));

  send(res, doc, (clean(r.name).replace(/[^A-Za-z0-9]+/g, '_') || 'Resume') + '_Resume.pdf');
}

module.exports = { certificatePdf, resumePdf };
