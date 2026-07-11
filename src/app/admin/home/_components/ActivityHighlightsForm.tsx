"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface ActivityItem {
  id?: string;
  src: string;
  imageFile?: File | null;
}

interface ActivityConfigData {
  id?: string;
  titleVi: string;
  titleEn: string;
  items: ActivityItem[];
}

interface ActivityHighlightsFormProps {
  initialData: ActivityConfigData | null;
  onSave: (formData: FormData, items: ActivityItem[]) => Promise<void>;
}

export function ActivityHighlightsForm({
  initialData,
  onSave,
}: ActivityHighlightsFormProps) {
  const [titleVi, setTitleVi] = useState(
    initialData?.titleVi || "HÌNH ẢNH HOẠT ĐỘNG",
  );
  const [titleEn, setTitleEn] = useState(
    initialData?.titleEn || "ACTIVITY HIGHLIGHTS",
  );
  const [items, setItems] = useState<ActivityItem[]>(initialData?.items || []);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, items);
    setLoading(false);
  };

  const handleAddItem = () => {
    setItems([...items, { src: "", imageFile: null }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleImageChange = (index: number, file: File | undefined) => {
    if (file) {
      const updated = [...items];
      updated[index].imageFile = file;
      updated[index].src = URL.createObjectURL(file);
      setItems(updated);
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
            Cấu hình Hình ảnh hoạt động (Activity Highlights)
          </h3>
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

      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold text-gray-700">
            Danh sách hình ảnh hoạt động
          </h4>
          <span className="text-[10px] text-amber-600 block">
            Khuyến nghị ảnh tỉ lệ chuẩn 16:9 (Ví dụ: 1920x1080 px hoặc kích
            thước lớn hơn)
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
        >
          <Plus size={16} /> Thêm hình ảnh
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex flex-col items-center relative group"
          >
            <div className="relative w-full aspect-video border border-gray-300 rounded-lg bg-white overflow-hidden flex items-center justify-center mb-2">
              {item.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.src}
                  alt={`Activity ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[10px] text-gray-400">Trống</span>
              )}
            </div>
            <label className="w-full text-center px-2 py-1 bg-white border border-gray-300 text-gray-700 text-[10px] rounded cursor-pointer hover:bg-gray-50 font-medium flex items-center justify-center gap-1">
              <Upload size={10} /> Tải lên
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(index, e.target.files?.[0])}
              />
            </label>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="absolute top-1 right-1 p-1 bg-white/80 rounded-full text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 cursor-pointer"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </form>
  );
}
