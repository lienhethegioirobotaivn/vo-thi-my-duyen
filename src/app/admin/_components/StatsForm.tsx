"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload } from "lucide-react";

interface StatItem {
  id?: string;
  value: string | null;
  titleVi: string | null;
  titleEn: string | null;
  iconSrc: string | null;
  imageFile?: File | null;
}

interface StatsFormProps {
  initialData: StatItem[];
  onSave: (
    formData: FormData,
    stats: StatItem[],
    imageFile: File | null,
  ) => Promise<void>;
}

export function StatsForm({ initialData, onSave }: StatsFormProps) {
  const [stats, setStats] = useState<StatItem[]>(initialData || []);
  const [loading, setLoading] = useState(false);

  const handleAddStat = () => {
    setStats([
      ...stats,
      {
        value: "0",
        titleVi: "",
        titleEn: "",
        iconSrc: "",
        imageFile: null,
      },
    ]);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleStatChange = (
    index: number,
    key: keyof StatItem,
    value: string,
  ) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [key]: value } as StatItem;
    setStats(updated);
  };

  const handleIconChange = (index: number, file: File | undefined) => {
    if (file) {
      const updated = [...stats];
      updated[index].imageFile = file;
      updated[index].iconSrc = URL.createObjectURL(file);
      setStats(updated);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, stats, null);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Stats Section
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAddStat}
          className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
        >
          <Plus size={16} /> Thêm chỉ số thống kê
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-5 bg-gray-50 rounded-xl border border-gray-200 relative grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          >
            <div className="md:col-span-2 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-400 block mb-2 text-center w-full">
                Icon (tỉ lệ 1:1)
              </span>
              <div className="relative size-14 border border-gray-300 rounded-lg bg-white overflow-hidden flex items-center justify-center mb-2">
                {stat.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={stat.iconSrc}
                    alt="Stat Icon"
                    className="w-full h-full object-cover"
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

            <div className="md:col-span-3">
              <span className="text-xs text-gray-400 block mb-1">
                Số liệu / Giá trị (Value)
              </span>
              <input
                type="text"
                required
                value={stat.value || ""}
                onChange={(e) =>
                  handleStatChange(index, "value", e.target.value)
                }
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
            </div>

            <div className="md:col-span-3">
              <span className="text-xs text-gray-400 block mb-1">
                Tiêu đề (Tiếng Việt)
              </span>
              <textarea
                required
                rows={2}
                value={stat.titleVi || ""}
                onChange={(e) =>
                  handleStatChange(index, "titleVi", e.target.value)
                }
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
            </div>

            <div className="md:col-span-3">
              <span className="text-xs text-gray-400 block mb-1">
                Tiêu đề (Tiếng Anh)
              </span>
              <textarea
                required
                rows={2}
                value={stat.titleEn || ""}
                onChange={(e) =>
                  handleStatChange(index, "titleEn", e.target.value)
                }
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
            </div>

            <div className="md:col-span-1 flex justify-end md:pt-6">
              <button
                type="button"
                onClick={() => handleRemoveStat(index)}
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
