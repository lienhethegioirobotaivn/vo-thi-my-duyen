import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendFormEmailParams {
  to: string;
  subject: string;
  fields: Record<string, string>;
}

export async function sendFormEmail({
  to,
  subject,
  fields,
}: SendFormEmailParams) {
  const htmlContent = Object.entries(fields)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join("");

  const { error } = await resend.emails.send({
    from: "vothimyduyen.com <noreply@juniorceo.edu.vn>",
    to,
    subject,
    html: htmlContent,
  });

  if (error) {
    throw new Error(error.message);
  }
}
