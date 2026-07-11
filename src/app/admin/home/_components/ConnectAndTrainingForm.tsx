"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface ProgramItem {
  id?: string;
  vi: string;
  en: string;
  icon: string;
  imageFile?: File | null;
}

interface SocialItem {
  id?: string;
  titleVi: string;
  titleEn: string;
  linkText: string;
  url: string;
  bgColor: string;
  iconImg: string;
  imageFile?: File | null;
}

interface ConnectTrainingData {
  id?: string;
  trainingTitleVi: string;
  trainingTitleEn: string;
  connectTitleVi: string;
  connectTitleEn: string;
  fanpageTitle: string;
  fanpageUrl: string;
  logoIcon: string;
  programs: ProgramItem[];
  socials: SocialItem[];
}

interface ConnectAndTrainingFormProps {
  initialData: ConnectTrainingData | null;
  onSave: (
    formData: FormData,
    programs: ProgramItem[],
    socials: SocialItem[],
    logoFile: File | null,
  ) => Promise<void>;
}

export function ConnectAndTrainingForm({
  initialData,
  onSave,
}: ConnectAndTrainingFormProps) {
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(initialData?.logoIcon || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [programs, setPrograms] = useState<ProgramItem[]>(
    initialData?.programs || [],
  );
  const [socials, setSocials] = useState<SocialItem[]>(
    initialData?.socials || [],
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, programs, socials, logoFile);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Đào tạo & Kết nối (Connect & Training)
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
          Tiêu đề các khối & Cấu hình Fanpage
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-medium text-gray-500 block mb-1">
              Tiêu đề Khối Đào tạo (VI)
            </label>
            <input
              type="text"
              name="trainingTitleVi"
              defaultValue={initialData?.trainingTitleVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-gray-500 block mb-1">
              Tiêu đề Khối Đào tạo (EN)
            </label>
            <input
              type="text"
              name="trainingTitleEn"
              defaultValue={initialData?.trainingTitleEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-gray-500 block mb-1">
              Tiêu đề Khối Kết nối (VI)
            </label>
            <input
              type="text"
              name="connectTitleVi"
              defaultValue={initialData?.connectTitleVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-gray-500 block mb-1">
              Tiêu đề Khối Kết nối (EN)
            </label>
            <input
              type="text"
              name="connectTitleEn"
              defaultValue={initialData?.connectTitleEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-gray-500 block mb-1">
              Tiêu đề Khối Fanpage
            </label>
            <input
              type="text"
              name="fanpageTitle"
              defaultValue={initialData?.fanpageTitle || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              required
            />
          </div>
          <div>
            <label className="text-[11px] font-medium text-gray-500 block mb-1">
              Đường dẫn Fanpage Facebook (Hệ thống tự xử lý nhúng iframe)
            </label>
            <input
              type="url"
              name="fanpageUrl"
              defaultValue={initialData?.fanpageUrl || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
              placeholder="https://www.facebook.com/..."
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-2">
          <div className="flex flex-col items-center">
            <span className="text-[11px] font-medium text-gray-400 mb-1">
              Logo nền hoa sen (Tỷ lệ 1:1)
            </span>
            <div className="relative size-14 border rounded bg-[#16203a] flex items-center justify-center p-2">
              {logoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-[10px] text-gray-400">Trống</span>
              )}
            </div>
          </div>
          <label className="md:col-span-2 flex flex-col items-center justify-center h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <Upload size={16} className="text-gray-400 mb-0.5" />
            <span className="text-xs text-gray-500">
              Thay đổi logo nền hoa sen
            </span>
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
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-bold text-gray-700">
              Danh mục Chương trình đào tạo
            </h4>
            <span className="text-[10px] text-amber-600 block">
              Kích thước ảnh icon khuyến nghị: 28x28 px hoặc tỷ lệ vuông 1:1
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setPrograms([...programs, { vi: "", en: "", icon: "" }])
            }
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm mục mới
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 border rounded-xl flex gap-3 items-center"
            >
              <div className="relative size-10 border rounded bg-[#16203a] shrink-0 flex items-center justify-center overflow-hidden">
                {item.icon ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.icon}
                    alt={`${item.en} Icon`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload size={14} className="text-white" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const next = [...programs];
                      next[index].imageFile = file;
                      next[index].icon = URL.createObjectURL(file);
                      setPrograms(next);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={item.vi}
                  placeholder="Tên tiếng Việt"
                  className="text-gray-800 bg-white border p-1 text-xs rounded w-full outline-none"
                  onChange={(e) => {
                    const next = [...programs];
                    next[index].vi = e.target.value;
                    setPrograms(next);
                  }}
                  required
                />
                <input
                  type="text"
                  value={item.en}
                  placeholder="Tên tiếng Anh"
                  className="text-gray-800 bg-white border p-1 text-xs rounded w-full outline-none"
                  onChange={(e) => {
                    const next = [...programs];
                    next[index].en = e.target.value;
                    setPrograms(next);
                  }}
                  required
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setPrograms(programs.filter((_, i) => i !== index))
                }
                className="text-red-500 hover:bg-red-50 cursor-pointer p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-bold text-gray-700">
              Mạng xã hội & Khối liên kết
            </h4>
            <span className="text-[10px] text-amber-600 block">
              Kích thước ảnh biểu tượng mạng xã hội: 48x48 px, tỉ lệ vuông 1:1
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setSocials([
                ...socials,
                {
                  titleVi: "",
                  titleEn: "",
                  linkText: "",
                  url: "",
                  bgColor: "#1877F2",
                  iconImg: "",
                },
              ])
            }
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm liên kết
          </button>
        </div>
        <div className="space-y-4">
          {socials.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-2 flex flex-col items-center justify-center">
                <div
                  className="relative size-12 border rounded-full flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: item.bgColor || "#1877F2" }}
                >
                  {item.iconImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.iconImg}
                      alt={item.titleEn}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Upload size={16} className="text-white" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const next = [...socials];
                        next[index].imageFile = file;
                        next[index].iconImg = URL.createObjectURL(file);
                        setSocials(next);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={item.titleVi}
                  placeholder="Tiêu đề khối (VI)"
                  className="text-gray-800 bg-white border p-1 text-xs rounded outline-none"
                  onChange={(e) => {
                    const next = [...socials];
                    next[index].titleVi = e.target.value;
                    setSocials(next);
                  }}
                  required
                />
                <input
                  type="text"
                  value={item.titleEn}
                  placeholder="Tiêu đề phụ (EN)"
                  className="text-gray-800 bg-white border p-1 text-xs rounded outline-none"
                  onChange={(e) => {
                    const next = [...socials];
                    next[index].titleEn = e.target.value;
                    setSocials(next);
                  }}
                />
                <input
                  type="text"
                  value={item.linkText}
                  placeholder="Chuỗi hiển thị link"
                  className="text-gray-800 bg-white border p-1 text-xs rounded outline-none"
                  onChange={(e) => {
                    const next = [...socials];
                    next[index].linkText = e.target.value;
                    setSocials(next);
                  }}
                  required
                />
                <input
                  type="url"
                  value={item.url}
                  placeholder="URL Đích (https://...)"
                  className="text-gray-800 bg-white border p-1 text-xs rounded outline-none md:col-span-2"
                  onChange={(e) => {
                    const next = [...socials];
                    next[index].url = e.target.value;
                    setSocials(next);
                  }}
                  required
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 shrink-0">
                    Màu nền Icon:
                  </span>
                  <input
                    type="color"
                    value={
                      item.bgColor.startsWith("#") ? item.bgColor : "#1877F2"
                    }
                    className="size-6 border rounded cursor-pointer p-0"
                    onChange={(e) => {
                      const next = [...socials];
                      next[index].bgColor = e.target.value;
                      setSocials(next);
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setSocials(socials.filter((_, i) => i !== index))
                  }
                  className="text-red-500 hover:bg-red-50 cursor-pointer p-2 rounded-md"
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
