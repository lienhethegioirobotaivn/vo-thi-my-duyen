// admin/form-settings/page.tsx
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminLayout } from "../_components/AdminLayout";
import { FormSettingsForm } from "./_components/FormSettingsForm";

const FORM_KEYS = ["speaker-booking", "newsletter"] as const;

export default async function FormSettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const allSettings = await prisma.formSettings.findMany({
    where: { formKey: { in: [...FORM_KEYS] } },
  });

  async function updateFormSettingsAction(
    formKey: string,
    recipientEmail: string,
  ) {
    "use server";
    await prisma.formSettings.upsert({
      where: { formKey },
      update: { recipientEmail },
      create: { formKey, recipientEmail },
    });
    revalidatePath("/admin/form-settings");
  }

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <FormSettingsForm
        formKeys={FORM_KEYS}
        initialData={allSettings}
        onSave={updateFormSettingsAction}
      />
    </AdminLayout>
  );
}
