import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminLayout } from "./_components/AdminLayout";
import { HeroForm } from "./_components/HeroForm";
import { uploadAndCleanStorage } from "@/utils/supabase/storage";

interface ButtonParam {
  id?: string;
  textVi?: string | null;
  textEn?: string | null;
  href?: string | null;
  primary?: boolean | null;
  order?: number | null;
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const heroData = await prisma.heroConfig.findFirst({
    include: { buttons: { orderBy: { order: "asc" } } },
  });

  async function updateHeroAction(
    formData: FormData,
    buttonsList: ButtonParam[],
    imageFile: File | null,
  ) {
    "use server";

    const topSubtitle = (formData.get("topSubtitle") as string) || "";
    const mainTitleLine1 = (formData.get("mainTitleLine1") as string) || "";
    const mainTitleLine2 = (formData.get("mainTitleLine2") as string) || "";
    const engSubtitle = (formData.get("engSubtitle") as string) || "";
    const descVi = (formData.get("descVi") as string) || "";
    const descEn = (formData.get("descEn") as string) || "";

    const existingHero = await prisma.heroConfig.findFirst();

    const currentBgUrl = await uploadAndCleanStorage({
      bucketName: "hero-images",
      newFile: imageFile,
      oldUrl: existingHero?.bgUrl,
    });

    if (existingHero) {
      await prisma.$transaction([
        prisma.heroButton.deleteMany({
          where: { heroConfigId: existingHero.id },
        }),
        prisma.heroConfig.update({
          where: { id: existingHero.id },
          data: {
            topSubtitle,
            mainTitleLine1,
            mainTitleLine2,
            engSubtitle,
            descVi,
            descEn,
            bgUrl: currentBgUrl,
            buttons: {
              create: buttonsList.map((btn, idx) => ({
                textVi: btn.textVi || "",
                textEn: btn.textEn || "",
                href: btn.href || "",
                primary: btn.primary || false,
                order: idx,
              })),
            },
          },
        }),
      ]);
    } else {
      await prisma.heroConfig.create({
        data: {
          topSubtitle,
          mainTitleLine1,
          mainTitleLine2,
          engSubtitle,
          descVi,
          descEn,
          bgUrl: currentBgUrl,
          buttons: {
            create: buttonsList.map((btn, idx) => ({
              textVi: btn.textVi || "",
              textEn: btn.textEn || "",
              href: btn.href || "",
              primary: btn.primary || false,
              order: idx,
            })),
          },
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
  }

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <HeroForm initialData={heroData} onSave={updateHeroAction} />
    </AdminLayout>
  );
}
