"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface ServiceItem {
  id?: string;
  vi: string;
  en: string;
  img: string;
  imageFile?: File | null;
}

interface ServicesConfigData {
  id?: string;
  titleVi: string;
  titleEn: string;
  items: ServiceItem[];
}

interface ServicesFormProps {
  initialData: ServicesConfigData | null;
  onSave: (formData: FormData, services: ServiceItem[]) => Promise<void>;
}

export function ServicesForm({ initialData, onSave }: ServicesFormProps) {
  const [titleVi, setTitleVi] = useState(
    initialData?.titleVi || "DỊCH VỤ CUNG CẤP",
  );
  const [titleEn, setTitleEn] = useState(initialData?.titleEn || "SERVICES");
  const [services, setServices] = useState<ServiceItem[]>(
    initialData?.items || [],
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, services);
    setLoading(false);
  };

  const handleAddItem = () =>
    setServices([...services, { vi: "", en: "", img: "", imageFile: null }]);

  const handleRemoveItem = (index: number) =>
    setServices(services.filter((_, i) => i !== index));

  const handleItemChange = (
    index: number,
    key: keyof ServiceItem,
    value: string,
  ) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [key]: value } as ServiceItem;
    setServices(updated);
  };

  const handleImageChange = (index: number, file: File | undefined) => {
    if (file) {
      const updated = [...services];
      updated[index].imageFile = file;
      updated[index].img = URL.createObjectURL(file);
      setServices(updated);
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
            Cấu hình Dịch vụ cung cấp (Services)
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
        >
          <Plus size={16} /> Thêm dịch vụ mới
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          >
            <div className="md:col-span-3 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-400 block mb-2 text-center w-full">
                Hình ảnh (tỉ lệ 16:9, 1920 x 1080 px, dưới 2MB)
              </span>
              <div className="relative w-full aspect-video border border-gray-300 rounded-lg bg-white overflow-hidden flex items-center justify-center mb-2">
                {item.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.img}
                    alt="Service"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-gray-400">Trống</span>
                )}
              </div>
              <label className="px-2 py-1 bg-white border border-gray-300 text-gray-700 text-[10px] rounded cursor-pointer hover:bg-gray-50 font-medium flex items-center gap-1">
                <Upload size={10} /> Tải ảnh
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(index, e.target.files?.[0])
                  }
                />
              </label>
            </div>

            <div className="md:col-span-4">
              <span className="text-xs text-gray-400 block mb-1">
                Tên dịch vụ (Tiếng Việt)
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
                Tên dịch vụ (Tiếng Anh)
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
