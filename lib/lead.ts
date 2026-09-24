export type Lead = { company:string; name:string; email:string; phone:string; product:string; material:string; dimensions:string; quantity:string; message:string; locale:string; };
export type LeadAttachment = { filename:string; content:Buffer; contentType:string };
export type LeadErrorCode = 'required'|'email'|'file'|'send';
export type LeadState = { status:'idle'|'success'|'error'; error?:LeadErrorCode; values?:Record<string,string> };
export const initialLeadState: LeadState = { status:'idle' };
export const LEAD_LIMITS: Record<keyof Lead,number> = { company:200,name:160,email:320,phone:60,product:200,material:100,dimensions:300,quantity:160,message:4000,locale:5 };
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
