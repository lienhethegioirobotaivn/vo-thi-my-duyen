import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { uploadAndCleanStorage } from "@/utils/supabase/storage";
import { AdminLayout } from "./_components/AdminLayout";
import { MetadataForm } from "./_components/MetadataForm";

export default async function AdminPage() {
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

  const metadataConfig = await prisma.metadata.findFirst();

  async function updateMetadataAction(
    formData: FormData,
    faviconFile: File | null,
    ogImageFile: File | null,
  ) {
    "use server";
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const keywords = (formData.get("keywords") as string) || "";
    const ogTitle = (formData.get("ogTitle") as string) || "";
    const ogDesc = (formData.get("ogDesc") as string) || "";
    const siteUrl = (formData.get("siteUrl") as string) || "";

    const existingConfig = await prisma.metadata.findFirst();

    const currentFaviconUrl = await uploadAndCleanStorage({
      bucketName: "meta-data",
      newFile: faviconFile,
      oldUrl: existingConfig?.favicon,
    });

    const currentOgImageUrl = await uploadAndCleanStorage({
      bucketName: "meta-data",
      newFile: ogImageFile,
      oldUrl: existingConfig?.ogImage,
    });

    if (existingConfig) {
      await prisma.metadata.update({
        where: { id: existingConfig.id },
        data: {
          title,
          description,
          keywords,
          ogTitle,
          ogDesc,
          siteUrl,
          favicon: currentFaviconUrl,
          ogImage: currentOgImageUrl,
        },
      });
    } else {
      await prisma.metadata.create({
        data: {
          title,
          description,
          keywords,
          ogTitle,
          ogDesc,
          siteUrl,
          favicon: currentFaviconUrl,
          ogImage: currentOgImageUrl,
        },
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin");
  }

  const sanitizedData = metadataConfig
    ? {
        id: metadataConfig.id,
        title: metadataConfig.title || "",
        description: metadataConfig.description || "",
        keywords: metadataConfig.keywords || "",
        ogTitle: metadataConfig.ogTitle || "",
        ogDesc: metadataConfig.ogDesc || "",
        siteUrl: metadataConfig.siteUrl || "",
        favicon: metadataConfig.favicon || "",
        ogImage: metadataConfig.ogImage || "",
      }
    : null;

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <div className="space-y-10">
        <MetadataForm
          initialData={sanitizedData}
          onSave={updateMetadataAction}
        />
      </div>
    </AdminLayout>
  );
}
