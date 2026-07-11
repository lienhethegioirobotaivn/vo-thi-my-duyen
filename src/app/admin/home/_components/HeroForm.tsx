"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";
import { InputField } from "./InputField";

interface ButtonItem {
  id?: string;
  textVi?: string | null;
  textEn?: string | null;
  href?: string | null;
  primary?: boolean | null;
  order?: number | null;
}

interface HeroData {
  id?: string;
  bgUrl?: string | null;
  topSubtitle?: string | null;
  mainTitleLine1?: string | null;
  mainTitleLine2?: string | null;
  engSubtitle?: string | null;
  descVi?: string | null;
  descEn?: string | null;
  buttons: ButtonItem[];
}

interface HeroFormProps {
  initialData: HeroData | null;
  onSave: (
    formData: FormData,
    buttons: ButtonItem[],
    imageFile: File | null,
  ) => Promise<void>;
}

export function HeroForm({ initialData, onSave }: HeroFormProps) {
  const [buttons, setButtons] = useState<ButtonItem[]>(
    initialData?.buttons || [],
  );
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialData?.bgUrl || "",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddButton = () => {
    setButtons([
      ...buttons,
      {
        textVi: "NÚT MỚI",
        textEn: "NEW BUTTON",
        href: "#",
        primary: false,
        order: buttons.length,
      },
    ]);
  };

  const handleRemoveButton = (index: number) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const handleButtonChange = (
    index: number,
    key: keyof ButtonItem,
    value: string | boolean | number,
  ) => {
    const updated = [...buttons];
    updated[index] = { ...updated[index], [key]: value };
    setButtons(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, buttons, selectedFile);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Hero Section
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

      <div className="space-y-4">
        <div className="space-y-2 border-b border-gray-100 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
            <label className="text-sm font-semibold text-gray-700 block">
              Ảnh nền trang chủ (Background Image)
            </label>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Kích thước khuyến nghị: 1920 x 1080 px (Tỷ lệ 16:9, dưới 2MB)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-2">
            <div className="md:col-span-1 relative aspect-video rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="Hero Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-400">Chưa có ảnh nền</span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload size={24} className="text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500 font-medium">
                    Tải ảnh lên
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
        </div>

        <InputField
          label="Tiêu đề phụ trên cùng (Top Subtitle)"
          nameVi="topSubtitle"
          nameEn="topSubtitleEn"
          defaultValueVi={initialData?.topSubtitle || ""}
        />

        <InputField
          label="Dòng tiêu đề chính 1 (Main Title Line 1)"
          nameVi="mainTitleLine1"
          nameEn="mainTitleLine1En"
          defaultValueVi={initialData?.mainTitleLine1 || ""}
        />

        <InputField
          label="Dòng tiêu đề chính 2 (Main Title Line 2)"
          nameVi="mainTitleLine2"
          nameEn="mainTitleLine2En"
          defaultValueVi={initialData?.mainTitleLine2 || ""}
        />

        <InputField
          label="Tiêu đề phụ tiếng Anh cố định (English Subtitle)"
          nameVi="engSubtitle"
          nameEn="engSubtitleEn"
          defaultValueEn={initialData?.engSubtitle || ""}
        />

        <InputField
          label="Đoạn mô tả (Description)"
          nameVi="descVi"
          nameEn="descEn"
          defaultValueVi={initialData?.descVi || ""}
          defaultValueEn={initialData?.descEn || ""}
          isTextArea={true}
        />
      </div>

      <div className="space-y-4 pt-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Quản lý các nút bấm (Buttons)
          </h4>
          <button
            type="button"
            onClick={handleAddButton}
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={16} /> Thêm nút bấm
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {buttons.map((btn, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
            >
              <div className="md:col-span-3">
                <span className="text-xs text-gray-400 block mb-1">
                  Tên nút (VI)
                </span>
                <input
                  type="text"
                  value={btn.textVi || ""}
                  onChange={(e) =>
                    handleButtonChange(index, "textVi", e.target.value)
                  }
                  className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <span className="text-xs text-gray-400 block mb-1">
                  Tên nút (EN)
                </span>
                <input
                  type="text"
                  value={btn.textEn || ""}
                  onChange={(e) =>
                    handleButtonChange(index, "textEn", e.target.value)
                  }
                  className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
                />
              </div>
              <div className="md:col-span-3">
                <span className="text-xs text-gray-400 block mb-1">
                  Đường dẫn (Href)
                </span>
                <input
                  type="text"
                  value={btn.href || ""}
                  onChange={(e) =>
                    handleButtonChange(index, "href", e.target.value)
                  }
                  className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
                />
              </div>
              <div className="md:col-span-2 flex items-center h-10 gap-2">
                <input
                  type="checkbox"
                  id={`primary-${index}`}
                  checked={btn.primary || false}
                  onChange={(e) =>
                    handleButtonChange(index, "primary", e.target.checked)
                  }
                  className="rounded border-gray-300 text-[#0a1b35] focus:ring-[#0a1b35]"
                />
                <label
                  htmlFor={`primary-${index}`}
                  className="text-xs text-gray-600 font-medium select-none"
                >
                  Nút chính
                </label>
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleRemoveButton(index)}
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
