"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface ExpertiseItem {
  id?: string;
  vi: string;
  en: string;
  icon: string;
  imageFile?: File | null;
}

interface ExpertiseConfigData {
  id?: string;
  titleVi: string;
  titleEn: string;
  items: ExpertiseItem[];
}

interface ExpertiseFormProps {
  initialData: ExpertiseConfigData | null;
  onSave: (
    formData: FormData,
    expertise: ExpertiseItem[],
    imageFile: File | null,
  ) => Promise<void>;
}

export function ExpertiseForm({ initialData, onSave }: ExpertiseFormProps) {
  const [titleVi, setTitleVi] = useState(
    initialData?.titleVi || "CÁC MẢNG CHUYÊN MÔN",
  );
  const [titleEn, setTitleEn] = useState(
    initialData?.titleEn || "AREAS OF EXPERTISE",
  );
  const [expertise, setExpertise] = useState<ExpertiseItem[]>(
    initialData?.items || [],
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, expertise, null);
    setLoading(false);
  };

  const handleAddItem = () =>
    setExpertise([...expertise, { vi: "", en: "", icon: "", imageFile: null }]);
  const handleRemoveItem = (index: number) =>
    setExpertise(expertise.filter((_, i) => i !== index));
  const handleItemChange = (
    index: number,
    key: keyof ExpertiseItem,
    value: string,
  ) => {
    const updated = [...expertise];
    updated[index] = { ...updated[index], [key]: value } as ExpertiseItem;
    setExpertise(updated);
  };
  const handleIconChange = (index: number, file: File | undefined) => {
    if (file) {
      const updated = [...expertise];
      updated[index].imageFile = file;
      updated[index].icon = URL.createObjectURL(file);
      setExpertise(updated);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">
            Cấu hình Mảng chuyên môn (Areas of Expertise)
          </h3>
          <p className="text-xs text-amber-600 font-medium mt-1">
            Khuyến nghị tỷ lệ ảnh icon: 1:1 (Kích thước vuông, ví dụ 56x56 px,
            nền trong suốt dạng PNG)
          </p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-[#0a1b35] text-white rounded-lg text-sm font-semibold hover:bg-[#0a1b35]/90 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
        >
          <Plus size={16} /> Thêm chuyên môn mới
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {expertise.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          >
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-400 block mb-2 text-center w-full">
                Icon (Tỷ lệ 1:1)
              </span>
              <div className="relative size-14 border border-gray-300 rounded-lg bg-white overflow-hidden flex items-center justify-center mb-2 p-1">
                {item.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.icon}
                    alt="Icon"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span className="text-[10px] text-gray-400">Trống</span>
                )}
              </div>
              <label className="px-2 py-1 bg-white border border-gray-300 text-gray-700 text-[10px] rounded cursor-pointer hover:bg-gray-50 font-medium flex items-center gap-1">
                <Upload size={10} /> Tải lên
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleIconChange(index, e.target.files?.[0])}
                />
              </label>
            </div>

            <div className="md:col-span-5">
              <span className="text-xs text-gray-400 block mb-1">
                Tên chuyên môn (Tiếng Việt)
              </span>
              <textarea
                required
                rows={2}
                value={item.vi}
                onChange={(e) => handleItemChange(index, "vi", e.target.value)}
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
            </div>

            <div className="md:col-span-4">
              <span className="text-xs text-gray-400 block mb-1">
                Tên chuyên môn (Tiếng Anh)
              </span>
              <textarea
                required
                rows={2}
                value={item.en}
                onChange={(e) => handleItemChange(index, "en", e.target.value)}
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
            </div>

            <div className="md:col-span-1 flex justify-end md:pt-6">
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
    </form>
  );
}
