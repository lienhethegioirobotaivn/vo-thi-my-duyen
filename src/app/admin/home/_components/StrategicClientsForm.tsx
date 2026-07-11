"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Upload,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

interface LogoItem {
  id?: string;
  src: string;
  imageFile?: File | null;
}

interface TabItem {
  id?: string;
  tabKey: string;
  vi: string;
  en: string;
  logos: LogoItem[];
}

interface ClientConfigData {
  id?: string;
  titleVi: string;
  titleEn: string;
  footerVi: string;
  footerEn: string;
  tabs: TabItem[];
}

interface StrategicClientsFormProps {
  initialData: ClientConfigData | null;
  onSave: (formData: FormData, tabs: TabItem[]) => Promise<void>;
}

export function StrategicClientsForm({
  initialData,
  onSave,
}: StrategicClientsFormProps) {
  const [titleVi, setTitleVi] = useState(initialData?.titleVi || "");
  const [titleEn, setTitleEn] = useState(initialData?.titleEn || "");
  const [footerVi, setFooterVi] = useState(initialData?.footerVi || "");
  const [footerEn, setFooterEn] = useState(initialData?.footerEn || "");

  const [tabs, setTabs] = useState<TabItem[]>(
    initialData?.tabs || [
      { tabKey: "banking", vi: "Ngân hàng", en: "Banking", logos: [] },
    ],
  );
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, tabs);
    setLoading(false);
  };

  const handleAddTab = () => {
    const key = prompt(
      "Nhập mã Tab viết liền không dấu (Ví dụ: fmcg, ngo, education):",
    );
    if (!key) return;
    if (tabs.some((t) => t.tabKey === key)) {
      alert("Mã Tab này đã tồn tại!");
      return;
    }
    setTabs([
      ...tabs,
      { tabKey: key, vi: "Tab Mới", en: "New Tab", logos: [] },
    ]);
    setActiveTabIdx(tabs.length);
  };

  const handleRemoveTab = (index: number) => {
    if (tabs.length <= 1) return;
    setTabs(tabs.filter((_, i) => i !== index));
    setActiveTabIdx(0);
  };

  const handleTabConfigChange = (
    index: number,
    key: "vi" | "en",
    val: string,
  ) => {
    const next = [...tabs];
    next[index][key] = val;
    setTabs(next);
  };

  const handleMoveTab = (index: number, direction: "left" | "right") => {
    const nextIdx = direction === "left" ? index - 1 : index + 1;
    if (nextIdx < 0 || nextIdx >= tabs.length) return;

    const nextTabs = [...tabs];
    const temp = nextTabs[index];
    nextTabs[index] = nextTabs[nextIdx];
    nextTabs[nextIdx] = temp;

    setTabs(nextTabs);

    if (activeTabIdx === index) {
      setActiveTabIdx(nextIdx);
    } else if (activeTabIdx === nextIdx) {
      setActiveTabIdx(index);
    }
  };

  const handleAddLogo = () => {
    const next = [...tabs];
    next[activeTabIdx].logos.push({ src: "", imageFile: null });
    setTabs(next);
  };

  const handleRemoveLogo = (logoIdx: number) => {
    const next = [...tabs];
    next[activeTabIdx].logos = next[activeTabIdx].logos.filter(
      (_, i) => i !== logoIdx,
    );
    setTabs(next);
  };

  const handleLogoFileChange = (logoIdx: number, file: File | undefined) => {
    if (file) {
      const next = [...tabs];
      next[activeTabIdx].logos[logoIdx].imageFile = file;
      next[activeTabIdx].logos[logoIdx].src = URL.createObjectURL(file);
      setTabs(next);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Đối tác & Khách hàng chiến lược
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
            Tiêu đề chính (VI)
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
            Tiêu đề chính (EN)
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
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Dòng chữ chân trang (VI)
          </label>
          <input
            type="text"
            name="footerVi"
            required
            value={footerVi}
            onChange={(e) => setFooterVi(e.target.value)}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Dòng chữ chân trang (EN)
          </label>
          <input
            type="text"
            name="footerEn"
            required
            value={footerEn}
            onChange={(e) => setFooterEn(e.target.value)}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-gray-700">
            Cấu hình các phân nhóm (Tabs)
          </label>
          <button
            type="button"
            onClick={handleAddTab}
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm phân nhóm Tab
          </button>
        </div>
        <div className="flex flex-wrap gap-2 bg-gray-100 p-1.5 rounded-lg">
          {tabs.map((tab, idx) => {
            const isActive = activeTabIdx === idx;
            return (
              <div
                key={tab.tabKey}
                className={`flex items-center gap-1 p-1 rounded-md transition-all ${
                  isActive
                    ? "bg-[#0a1b35] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveTabIdx(idx)}
                  className="px-2 py-1 text-xs font-medium cursor-pointer outline-none"
                >
                  {tab.vi || tab.tabKey}
                </button>

                {isActive && tabs.length > 1 && (
                  <div className="flex items-center border-l border-white/20 pl-1 gap-0.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveTab(idx, "left")}
                      className="p-0.5 hover:bg-white/20 rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ArrowLeft size={12} />
                    </button>
                    <button
                      type="button"
                      disabled={idx === tabs.length - 1}
                      onClick={() => handleMoveTab(idx, "right")}
                      className="p-0.5 hover:bg-white/20 rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      <ArrowRight size={12} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {tabs[activeTabIdx] && (
        <div className="p-4 bg-gray-50 rounded-xl border space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
            <div className="md:col-span-3">
              <label className="text-[10px] text-gray-400 block mb-1">
                Mã định danh Tab
              </label>
              <input
                type="text"
                disabled
                value={tabs[activeTabIdx].tabKey}
                className="text-gray-400 bg-gray-200 p-2 border text-xs rounded w-full outline-none"
              />
            </div>
            <div className="md:col-span-4">
              <label className="text-[10px] text-gray-500 block mb-1">
                Tên Tab hiển thị (VI)
              </label>
              <input
                type="text"
                value={tabs[activeTabIdx].vi}
                onChange={(e) =>
                  handleTabConfigChange(activeTabIdx, "vi", e.target.value)
                }
                className="text-gray-800 bg-white p-2 border text-xs rounded w-full outline-none"
                required
              />
            </div>
            <div className="md:col-span-4">
              <label className="text-[10px] text-gray-500 block mb-1">
                Tên Tab hiển thị (EN)
              </label>
              <input
                type="text"
                value={tabs[activeTabIdx].en}
                onChange={(e) =>
                  handleTabConfigChange(activeTabIdx, "en", e.target.value)
                }
                className="text-gray-800 bg-white p-2 border text-xs rounded w-full outline-none"
                required
              />
            </div>
            <div className="md:col-span-1 flex justify-end">
              <button
                type="button"
                disabled={tabs.length <= 1}
                onClick={() => handleRemoveTab(activeTabIdx)}
                className="p-2 text-red-500 bg-white rounded-lg border border-gray-200 hover:bg-red-50 disabled:opacity-40 cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <h5 className="text-xs font-bold text-gray-700">
                  Hệ thống Logo thuộc nhóm: {tabs[activeTabIdx].vi}
                </h5>
                <span className="text-[10px] text-amber-600 block">
                  Khuyến nghị ảnh nền trong suốt PNG, định dạng ngang tỉ lệ 16:9
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddLogo}
                className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
              >
                <Plus size={14} /> Thêm ảnh Logo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {tabs[activeTabIdx].logos.map((logo, lIdx) => (
                <div
                  key={lIdx}
                  className="p-2 border bg-white rounded-lg relative group flex flex-col items-center justify-center"
                >
                  <div className="w-full aspect-video border rounded bg-gray-50 mb-2 flex items-center justify-center overflow-hidden relative">
                    {logo.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo.src}
                        alt={`Logo ${lIdx + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400">
                        Chưa tải ảnh
                      </span>
                    )}
                  </div>
                  <label className="w-full text-center py-1 bg-gray-100 text-gray-700 text-[9px] font-medium rounded border cursor-pointer hover:bg-gray-200 flex items-center justify-center gap-1">
                    <Upload size={10} /> Tải lên
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleLogoFileChange(lIdx, e.target.files?.[0])
                      }
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveLogo(lIdx)}
                    className="absolute -top-1 -right-1 p-1 bg-white rounded-full border shadow-sm text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
