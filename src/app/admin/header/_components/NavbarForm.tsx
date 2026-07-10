"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface NavItemParam {
  id?: string;
  labelVi: string;
  labelEn: string;
  href: string;
}

interface NavbarConfigData {
  id?: string;
  logo: string;
  nameVi: string;
  nameEn: string;
  subtitle1Vi: string;
  subtitle1En: string;
  bookTextVi: string;
  bookTextEn: string;
  bookHref: string;
  navItems: NavItemParam[];
}

interface NavbarFormProps {
  initialData: NavbarConfigData | null;
  onSave: (
    formData: FormData,
    navItems: NavItemParam[],
    logoFile: File | null,
  ) => Promise<void>;
}

export function NavbarForm({ initialData, onSave }: NavbarFormProps) {
  const [logoPreview, setLogoPreview] = useState(initialData?.logo || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [navItems, setNavItems] = useState<NavItemParam[]>(
    initialData?.navItems || [],
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, navItems, logoFile);
    setLoading(false);
  };

  const handleAddItem = () => {
    setNavItems([...navItems, { labelVi: "", labelEn: "", href: "" }]);
  };

  const handleRemoveItem = (index: number) => {
    setNavItems(navItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (
    index: number,
    key: keyof NavItemParam,
    value: string,
  ) => {
    const updated = [...navItems];
    updated[index] = { ...updated[index], [key]: value } as NavItemParam;
    setNavItems(updated);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Thanh điều hướng (Header Navbar)
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

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h4 className="text-sm font-bold text-gray-700">
          Thông tin Logo & Tên thương hiệu
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-gray-50 p-4 rounded-xl border">
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-gray-400 mb-1">
              Logo hiển thị (Kích thước khuyên dùng: 100x100 px, tỷ lệ vuông
              1:1)
            </span>
            <div className="relative size-16 border rounded bg-white p-1 flex items-center justify-center overflow-hidden">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Logo Preview"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-gray-400">Trống</span>
              )}
            </div>
          </div>
          <label className="md:col-span-2 flex flex-col items-center justify-center h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-100">
            <Upload size={16} className="text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">Tải ảnh Logo mới</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setLogoFile(file);
                  setLogoPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tên thương hiệu (VI)
            </label>
            <input
              type="text"
              name="nameVi"
              defaultValue={initialData?.nameVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tên thương hiệu (EN)
            </label>
            <input
              type="text"
              name="nameEn"
              defaultValue={initialData?.nameEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Dòng chữ phụ dòng 1 (VI)
            </label>
            <input
              type="text"
              name="subtitle1Vi"
              defaultValue={initialData?.subtitle1Vi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Dòng chữ phụ dòng 2 (EN)
            </label>
            <input
              type="text"
              name="subtitle1En"
              defaultValue={initialData?.subtitle1En || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h4 className="text-sm font-bold text-gray-700">
          Cấu hình nút kêu gọi hành động (CTA Book Now)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Chuỗi text hiển thị (VI)
            </label>
            <input
              type="text"
              name="bookTextVi"
              defaultValue={initialData?.bookTextVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Chuỗi text hiển thị (EN)
            </label>
            <input
              type="text"
              name="bookTextEn"
              defaultValue={initialData?.bookTextEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Đường dẫn liên kết (Href)
            </label>
            <input
              type="text"
              name="bookHref"
              defaultValue={initialData?.bookHref || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Danh mục Menu điều hướng (Navigation Items)
          </h4>
          <button
            type="button"
            onClick={handleAddItem}
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57]  hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm mục Menu
          </button>
        </div>

        <div className="space-y-3">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-4">
                <input
                  type="text"
                  value={item.labelVi}
                  placeholder="Nhãn Tiếng Việt"
                  className="text-gray-800 w-full bg-white border p-2 text-xs rounded outline-none"
                  onChange={(e) =>
                    handleItemChange(index, "labelVi", e.target.value)
                  }
                  required
                />
              </div>
              <div className="md:col-span-4">
                <input
                  type="text"
                  value={item.labelEn}
                  placeholder="Nhãn Tiếng Anh"
                  className="text-gray-800 w-full bg-white border p-2 text-xs rounded outline-none"
                  onChange={(e) =>
                    handleItemChange(index, "labelEn", e.target.value)
                  }
                  required
                />
              </div>
              <div className="md:col-span-3">
                <input
                  type="text"
                  value={item.href}
                  placeholder="Đường dẫn (Ví dụ: /about)"
                  className="text-gray-800 w-full bg-white border p-2 text-xs rounded outline-none"
                  onChange={(e) =>
                    handleItemChange(index, "href", e.target.value)
                  }
                  required
                />
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded"
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
