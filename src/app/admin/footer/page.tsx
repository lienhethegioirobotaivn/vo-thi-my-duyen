import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminLayout } from "../_components/AdminLayout";
import { FooterForm } from "./_components/FooterForm";

export default async function FooterAdminPage() {
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

  const footerConfig = await prisma.footerConfig.findFirst();

  async function updateFooterAction(formData: FormData) {
    "use server";
    const contactTitleVi = (formData.get("contactTitleVi") as string) || "";
    const contactTitleEn = (formData.get("contactTitleEn") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const email = (formData.get("email") as string) || "";
    const website = (formData.get("website") as string) || "";
    const addressVi = (formData.get("addressVi") as string) || "";
    const addressEn = (formData.get("addressEn") as string) || "";
    const bookTitleVi = (formData.get("bookTitleVi") as string) || "";
    const bookTitleEn = (formData.get("bookTitleEn") as string) || "";
    const newsletterTitleVi =
      (formData.get("newsletterTitleVi") as string) || "";
    const newsletterTitleEn =
      (formData.get("newsletterTitleEn") as string) || "";
    const newsletterDescVi = (formData.get("newsletterDescVi") as string) || "";
    const newsletterDescEn = (formData.get("newsletterDescEn") as string) || "";
    const copyrightText = (formData.get("copyrightText") as string) || "";
    const sloganText = (formData.get("sloganText") as string) || "";

    const existingConfig = await prisma.footerConfig.findFirst();

    const updateData = {
      contactTitleVi,
      contactTitleEn,
      phone,
      email,
      website,
      addressVi,
      addressEn,
      bookTitleVi,
      bookTitleEn,
      newsletterTitleVi,
      newsletterTitleEn,
      newsletterDescVi,
      newsletterDescEn,
      copyrightText,
      sloganText,
    };

    if (existingConfig) {
      await prisma.footerConfig.update({
        where: { id: existingConfig.id },
        data: updateData,
      });
    } else {
      await prisma.footerConfig.create({
        data: updateData,
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/footer");
  }

  const sanitizedFooterData = footerConfig
    ? {
        id: footerConfig.id,
        contactTitleVi: footerConfig.contactTitleVi || "",
        contactTitleEn: footerConfig.contactTitleEn || "",
        phone: footerConfig.phone || "",
        email: footerConfig.email || "",
        website: footerConfig.website || "",
        addressVi: footerConfig.addressVi || "",
        addressEn: footerConfig.addressEn || "",
        bookTitleVi: footerConfig.bookTitleVi || "",
        bookTitleEn: footerConfig.bookTitleEn || "",
        newsletterTitleVi: footerConfig.newsletterTitleVi || "",
        newsletterTitleEn: footerConfig.newsletterTitleEn || "",
        newsletterDescVi: footerConfig.newsletterDescVi || "",
        newsletterDescEn: footerConfig.newsletterDescEn || "",
        copyrightText: footerConfig.copyrightText || "",
        sloganText: footerConfig.sloganText || "",
      }
    : null;

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <div className="space-y-10">
        <FooterForm
          initialData={sanitizedFooterData}
          onSave={updateFooterAction}
        />
      </div>
    </AdminLayout>
  );
}
