"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface MetadataData {
  id?: string;
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDesc: string;
  siteUrl: string;
  favicon: string;
  ogImage: string;
}

interface MetadataFormProps {
  initialData: MetadataData | null;
  onSave: (
    formData: FormData,
    faviconFile: File | null,
    ogImageFile: File | null,
  ) => Promise<void>;
}

export function MetadataForm({ initialData, onSave }: MetadataFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string>(
    initialData?.favicon || "",
  );

  const [ogImageFile, setOgImageFile] = useState<File | null>(null);
  const [ogImagePreview, setOgImagePreview] = useState<string>(
    initialData?.ogImage || "",
  );

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFaviconFile(file);
      setFaviconPreview(URL.createObjectURL(file));
    }
  };

  const handleOgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOgImageFile(file);
      setOgImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await onSave(formData, faviconFile, ogImageFile);
      setFaviconFile(null);
      setOgImageFile(null);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow"
    >
      <div>
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
          Cấu hình SEO & Metadata Hệ Thống
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Đường dẫn Website gốc (Canonical URL)
            </label>
            <input
              type="text"
              name="siteUrl"
              defaultValue={initialData?.siteUrl}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề Trang Web (Meta Title)
            </label>
            <input
              type="text"
              name="title"
              defaultValue={initialData?.title}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mô tả Trang Web (Meta Description)
            </label>
            <textarea
              rows={3}
              name="description"
              defaultValue={initialData?.description}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Từ khóa (Keywords - cách nhau bằng dấu phẩy)
            </label>
            <input
              type="text"
              name="keywords"
              defaultValue={initialData?.keywords}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tiêu đề mạng xã hội (OpenGraph Title)
            </label>
            <input
              type="text"
              name="ogTitle"
              defaultValue={initialData?.ogTitle}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mô tả mạng xã hội (OpenGraph Description)
            </label>
            <textarea
              rows={3}
              name="ogDesc"
              defaultValue={initialData?.ogDesc}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tải lên Favicon (Icon trên tab trình duyệt)
          </label>
          <p className="text-xs text-orange-600 mt-1 mb-2 font-medium">
            Khuyến nghị: Định dạng tùy chọn (.png, .jpg, .jpeg, .webp, .ico). Tỉ
            lệ vuông chuẩn 1:1.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.ico"
              onChange={handleFaviconChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {faviconPreview && (
              <div className="w-12 h-12 bg-gray-100 p-2 border rounded flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={faviconPreview}
                  alt="Favicon preview"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ảnh đại diện chia sẻ mạng xã hội (OG Image)
          </label>
          <p className="text-xs text-orange-600 mt-1 mb-2 font-medium">
            Khuyến nghị: Tỉ lệ chuẩn 1.91:1 (Ví dụ: 1200 x 630 px). Định dạng
            tốt nhất: .jpg hoặc .png.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleOgImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {ogImagePreview && (
              <div className="w-24 h-14 border rounded overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ogImagePreview}
                  alt="OG Image preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-[#0a1b35] text-white font-medium hover:bg-[#0a1b35]/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Đang xử lí..." : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}
