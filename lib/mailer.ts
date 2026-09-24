import 'server-only';
import nodemailer, { type Transporter } from 'nodemailer';
import type { Lead, LeadAttachment } from './lead';
const HOST=process.env.SMTP_HOST;const PORT=Number(process.env.SMTP_PORT??465);const USER=process.env.SMTP_USER;const PASS=process.env.SMTP_PASSWORD;const INBOX=process.env.LEAD_INBOX||USER;
let cached:Transporter|null=null;
function transporter(){if(!HOST||!USER||!PASS)throw new Error('SMTP not configured');return cached??(cached=nodemailer.createTransport({host:HOST,port:PORT,secure:PORT===465,auth:{user:USER,pass:PASS}}));}
function escapeHtml(v:string){return v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
function cleanHeader(v:string){return v.replace(/[\r\n]+/g,' ').trim();}
const labels:Record<keyof Lead,string>={company:'Company',name:'Contact person',email:'E-mail',phone:'Phone',product:'Product',material:'Material',dimensions:'Dimensions',quantity:'Quantity',message:'Additional information',locale:'Language'};
export async function sendLeadEmail(lead:Lead,attachments:LeadAttachment[]=[]){const rows=(Object.keys(labels) as (keyof Lead)[]).filter(k=>lead[k]);const text=rows.map(k=>`${labels[k]}: ${lead[k]}`).join('\n');const html=`<table style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif">${rows.map(k=>`<tr><td style="padding:5px 14px 5px 0;color:#667085">${labels[k]}</td><td style="padding:5px 0;font-weight:600">${escapeHtml(lead[k])}</td></tr>`).join('')}</table>`;await transporter().sendMail({from:`SilvoTech <${USER}>`,to:INBOX,replyTo:`${cleanHeader(lead.name)} <${cleanHeader(lead.email)}>`,subject:`Manufacturing enquiry: ${cleanHeader(lead.company)}${lead.product?` - ${cleanHeader(lead.product)}`:''}`,text,html,attachments});}
