"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface ProfileItem {
  id?: string;
  vi: string | null;
  en: string | null;
}

interface ProfileData {
  id?: string;
  titleVi: string | null;
  titleEn: string | null;
  avatarUrl: string | null;
  items: ProfileItem[] | null;
}

interface ProfileFormProps {
  initialData: ProfileData | null;
  onSave: (
    formData: FormData,
    items: ProfileItem[],
    avatarFile: File | null,
  ) => Promise<void>;
}

export function ProfileForm({ initialData, onSave }: ProfileFormProps) {
  const [titleVi, setTitleVi] = useState(initialData?.titleVi || "");
  const [titleEn, setTitleEn] = useState(initialData?.titleEn || "");
  const [items, setItems] = useState<ProfileItem[]>(initialData?.items || []);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialData?.avatarUrl || "",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, items, selectedFile);
    setLoading(false);
  };

  const handleAddItem = () => setItems([...items, { vi: "", en: "" }]);
  const handleRemoveItem = (index: number) =>
    setItems(items.filter((_, i) => i !== index));
  const handleItemChange = (
    index: number,
    key: keyof ProfileItem,
    value: string,
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [key]: value };
    setItems(updated);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Hồ sơ nổi bật (Profile Highlights)
        </h3>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#0a1b35] text-white rounded-lg text-sm font-semibold hover:bg-[#0a1b35]/90 transition-colors disabled:opacity-50 cursor-pointer"
        >
          <Save size={16} />
          {loading ? "Đang xử lý..." : "Lưu thay đổi"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b border-gray-100 pb-4">
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Tiêu đề (Tiếng Việt)
          </label>
          <input
            type="text"
            name="titleVi"
            required
            value={titleVi}
            onChange={(e) => setTitleVi(e.target.value)}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Tiêu đề (Tiếng Anh)
          </label>
          <input
            type="text"
            name="titleEn"
            required
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
          />
        </div>
      </div>

      <div className="space-y-2 border-b border-gray-100 pb-6">
        <label className="text-sm font-semibold text-gray-700 block">
          Ảnh chân dung đại diện (Profile Image)
        </label>
        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          Kích thước khuyến nghị: 900 x 1200 px (Tỷ lệ 3:4, dưới 2MB)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center pt-2">
          <div className="md:col-span-1 relative aspect-3/4 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400">Chưa có ảnh</span>
            )}
          </div>
          <div className="md:col-span-3">
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={24} className="text-gray-400 mb-1" />
                <p className="text-xs text-gray-500 font-medium">Tải ảnh lên</p>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Danh sách các dòng thông tin nổi bật
          </h4>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={16} /> Thêm dòng thông tin
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
            >
              <div className="md:col-span-5">
                <span className="text-xs text-gray-400 block mb-1">
                  Tiếng Việt
                </span>
                <input
                  type="text"
                  required
                  value={item.vi ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, "vi", e.target.value)
                  }
                  className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                />
              </div>
              <div className="md:col-span-6">
                <span className="text-xs text-gray-400 block mb-1">
                  Tiếng Anh
                </span>
                <input
                  type="text"
                  required
                  value={item.en ?? ""}
                  onChange={(e) =>
                    handleItemChange(index, "en", e.target.value)
                  }
                  className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                />
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
