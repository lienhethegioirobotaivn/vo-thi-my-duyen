import { createClient } from "@/utils/supabase/server";

export async function uploadAndCleanStorage({
  bucketName,
  newFile,
  oldUrl,
}: {
  bucketName: string;
  newFile: File | null;
  oldUrl?: string | null;
}) {
  if (!newFile || newFile.size === 0) {
    return oldUrl || "";
  }

  const supabase = await createClient();

  if (oldUrl) {
    try {
      const bucketPath = `${bucketName}/`;
      if (oldUrl.includes(bucketPath)) {
        const fileName = oldUrl.split(bucketPath).pop();
        if (fileName) {
          await supabase.storage.from(bucketName).remove([fileName]);
        }
      }
    } catch (error) {
      console.error("Lỗi xóa file cũ:", error);
    }
  }

  const fileExt = newFile.name.split(".").pop();
  const newFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const arrayBuffer = await newFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(newFileName, buffer, {
      contentType: newFile.type,
      upsert: true,
    });

  if (uploadError) {
    console.error("Lỗi upload file mới:", uploadError);
    return oldUrl || "";
  }

  if (uploadData) {
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(newFileName);

    return publicUrlData.publicUrl;
  }

  return oldUrl || "";
}
