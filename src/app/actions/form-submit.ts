"use server";

import { prisma } from "@/lib/prisma";
import { sendFormEmail } from "@/lib/mailer";

interface SubmitFormParams {
  formKey: string;
  subject: string;
  fields: Record<string, string>;
}

export async function submitFormAction({
  formKey,
  subject,
  fields,
}: SubmitFormParams) {
  const settings = await prisma.formSettings.findUnique({
    where: { formKey },
  });

  if (!settings) {
    return { success: false, message: "Chưa cấu hình email nhận" };
  }

  try {
    await sendFormEmail({
      to: settings.recipientEmail,
      subject,
      fields,
    });
    return { success: true, message: "Gửi thành công" };
  } catch {
    return { success: false, message: "Gửi email thất bại" };
  }
}
