import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminLayout } from "../_components/AdminLayout";
import { uploadAndCleanStorage } from "@/utils/supabase/storage";
import { NavbarForm } from "./_components/NavbarForm";

interface NavItemParam {
  id?: string;
  labelVi: string;
  labelEn: string;
  href: string;
}

export default async function HeaderAdminPage() {
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

  const navbarConfig = await prisma.navbarConfig.findFirst({
    include: { navItems: { orderBy: { order: "asc" } } },
  });

  async function updateNavbarAction(
    formData: FormData,
    itemsList: NavItemParam[],
    logoFile: File | null,
  ) {
    "use server";
    const nameVi = (formData.get("nameVi") as string) || "";
    const nameEn = (formData.get("nameEn") as string) || "";
    const subtitle1Vi = (formData.get("subtitle1Vi") as string) || "";
    const subtitle1En = (formData.get("subtitle1En") as string) || "";
    const bookTextVi = (formData.get("bookTextVi") as string) || "";
    const bookTextEn = (formData.get("bookTextEn") as string) || "";
    const bookHref = (formData.get("bookHref") as string) || "";

    const existingConfig = await prisma.navbarConfig.findFirst();
    const currentLogoUrl = await uploadAndCleanStorage({
      bucketName: "media-core",
      newFile: logoFile,
      oldUrl: existingConfig?.logo,
    });

    if (existingConfig) {
      await prisma.$transaction([
        prisma.navItem.deleteMany({
          where: { navbarConfigId: existingConfig.id },
        }),
        prisma.navbarConfig.update({
          where: { id: existingConfig.id },
          data: {
            nameVi,
            nameEn,
            subtitle1Vi,
            subtitle1En,
            bookTextVi,
            bookTextEn,
            bookHref,
            logo: currentLogoUrl,
            navItems: {
              create: itemsList.map((item, idx) => ({
                labelVi: item.labelVi,
                labelEn: item.labelEn,
                href: item.href,
                order: idx,
              })),
            },
          },
        }),
      ]);
    } else {
      await prisma.navbarConfig.create({
        data: {
          nameVi,
          nameEn,
          subtitle1Vi,
          subtitle1En,
          bookTextVi,
          bookTextEn,
          bookHref,
          logo: currentLogoUrl,
          navItems: {
            create: itemsList.map((item, idx) => ({
              labelVi: item.labelVi,
              labelEn: item.labelEn,
              href: item.href,
              order: idx,
            })),
          },
        },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/header");
  }

  const sanitizedNavbarData = navbarConfig
    ? {
        id: navbarConfig.id,
        logo: navbarConfig.logo || "",
        nameVi: navbarConfig.nameVi || "",
        nameEn: navbarConfig.nameEn || "",
        subtitle1Vi: navbarConfig.subtitle1Vi || "",
        subtitle1En: navbarConfig.subtitle1En || "",
        bookTextVi: navbarConfig.bookTextVi || "",
        bookTextEn: navbarConfig.bookTextEn || "",
        bookHref: navbarConfig.bookHref || "",
        navItems: navbarConfig.navItems.map((i) => ({
          id: i.id,
          labelVi: i.labelVi || "",
          labelEn: i.labelEn || "",
          href: i.href || "",
        })),
      }
    : null;

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <div className="space-y-10">
        <NavbarForm
          initialData={sanitizedNavbarData}
          onSave={updateNavbarAction}
        />
      </div>
    </AdminLayout>
  );
}
