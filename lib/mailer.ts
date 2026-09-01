import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import type { Lead } from '@/lib/lead';

const HOST = process.env.SMTP_HOST;
const PORT = Number(process.env.SMTP_PORT ?? 465);
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASSWORD;
const INBOX = process.env.LEAD_INBOX || USER;

let cached: Transporter | null = null;

function getTransporter(): Transporter {
  if (!HOST || !USER || !PASS) {
    throw new Error(
      'SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASSWORD in the environment.'
    );
  }
  if (!cached) {
    cached = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465,
      auth: { user: USER, pass: PASS },
    });
  }
  return cached;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const FIELD_LABELS: Array<[keyof Lead, string]> = [
  ['company', 'Company'],
  ['name', 'Contact person'],
  ['email', 'E-mail'],
  ['phone', 'Phone'],
  ['country', 'Country'],
  ['product', 'Product category'],
  ['size', 'Size'],
  ['quantity', 'Quantity'],
  ['locale', 'Site language'],
];

export async function sendLeadEmail(lead: Lead): Promise<void> {
  const transporter = getTransporter();

  const rows = FIELD_LABELS.filter(([key]) => lead[key]);

  const text = [
    `New quote request from silvotech.eu (${lead.locale.toUpperCase()})`,
    '',
    ...rows.map(([key, label]) => `${label}: ${lead[key]}`),
    '',
    'Message:',
    lead.message || '(empty)',
  ].join('\n');

  const html = `<table style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif;color:#14233a">
<tbody>
${rows
  .map(
    ([key, label]) =>
      `<tr><td style="padding:4px 12px 4px 0;color:#8595a8">${label}</td><td style="padding:4px 0;font-weight:600">${escapeHtml(
        lead[key]
      )}</td></tr>`
  )
  .join('\n')}
</tbody>
</table>
<p style="font:14px/1.6 Arial,sans-serif;color:#14233a;white-space:pre-wrap;margin-top:16px">${escapeHtml(
    lead.message || '(empty)'
  )}</p>`;

  await transporter.sendMail({
    from: `SilvoTech <${USER}>`,
    to: INBOX,
    replyTo: `${lead.name} <${lead.email}>`,
    subject: `Zapytanie: ${lead.company}${lead.product ? ` — ${lead.product}` : ''}`,
    text,
    html,
  });
}
