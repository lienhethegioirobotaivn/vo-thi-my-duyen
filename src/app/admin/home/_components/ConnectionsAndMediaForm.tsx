"use client";

import { useState } from "react";
import { Plus, Trash2, Save, Upload, ArrowUp, ArrowDown } from "lucide-react";

interface CountryItem {
  id?: string;
  vi: string;
  en: string;
  flag: string;
  imageFile?: File | null;
}

interface HighlightItem {
  id?: string;
  titleVi: string;
  titleEn: string;
  img: string;
  href: string;
  imageFile?: File | null;
}

interface TvItem {
  id?: string;
  src: string;
  imageFile?: File | null;
}

interface PressItem {
  id?: string;
  logo: string;
  article: string;
  logoFile?: File | null;
  articleFile?: File | null;
}

interface MediaConfigData {
  id?: string;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  mapImg: string;
  countries: CountryItem[];
  highlights: HighlightItem[];
  tvStations: TvItem[];
  pressItems: PressItem[];
}

interface ConnectionsAndMediaFormProps {
  initialData: MediaConfigData | null;
  onSave: (
    formData: FormData,
    countries: CountryItem[],
    highlights: HighlightItem[],
    tvStations: TvItem[],
    pressItems: PressItem[],
    mapFile: File | null,
  ) => Promise<void>;
}

export function ConnectionsAndMediaForm({
  initialData,
  onSave,
}: ConnectionsAndMediaFormProps) {
  const [loading, setLoading] = useState(false);
  const [mapPreview, setMapPreview] = useState(initialData?.mapImg || "");
  const [mapFile, setMapFile] = useState<File | null>(null);

  const [countries, setCountries] = useState<CountryItem[]>(
    initialData?.countries || [],
  );
  const [highlights, setHighlights] = useState<HighlightItem[]>(
    initialData?.highlights || [],
  );
  const [tvStations, setTvStations] = useState<TvItem[]>(
    initialData?.tvStations || [],
  );
  const [pressItems, setPressItems] = useState<PressItem[]>(
    initialData?.pressItems || [],
  );

  const moveCountry = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === countries.length - 1) return;

    const nextIndex = direction === "up" ? index - 1 : index + 1;
    const nextCountries = [...countries];
    const temp = nextCountries[index];
    nextCountries[index] = nextCountries[nextIndex];
    nextCountries[nextIndex] = temp;
    setCountries(nextCountries);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(
      formData,
      countries,
      highlights,
      tvStations,
      pressItems,
      mapFile,
    );
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Kết nối & Truyền thông
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
          Khối tiêu đề & Bản đồ cấu trúc nền
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="titleVi"
            placeholder="Tiêu đề VI"
            defaultValue={initialData?.titleVi || ""}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
            required
          />
          <input
            type="text"
            name="titleEn"
            placeholder="Tiêu đề EN"
            defaultValue={initialData?.titleEn || ""}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
            required
          />
          <textarea
            name="descVi"
            placeholder="Mô tả VI"
            rows={3}
            defaultValue={initialData?.descVi || ""}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
            required
          />
          <textarea
            name="descEn"
            placeholder="Mô tả EN"
            rows={3}
            defaultValue={initialData?.descEn || ""}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-2">
          <div>
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Kích thước khuyến nghị: 1920 x 1080 px (Tỷ lệ 16:9, dưới 2MB)
            </span>
            <div className="relative aspect-video rounded-lg border bg-gray-50 flex items-center justify-center overflow-hidden">
              {mapPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={mapPreview}
                  alt="Map"
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-xs text-gray-400">Chưa có bản đồ</span>
              )}
            </div>
          </div>
          <label className="md:col-span-2 flex flex-col items-center justify-center h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <Upload size={20} className="text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Tải ảnh lên</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setMapFile(file);
                  setMapPreview(URL.createObjectURL(file));
                }
              }}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Các quốc gia đã công tác
          </h4>
          <button
            type="button"
            onClick={() =>
              setCountries([...countries, { vi: "", en: "", flag: "" }])
            }
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm quốc gia
          </button>
        </div>
        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          Kích thước khuyến nghị: 1000 x 700 px (Tỷ lệ 10:7, dưới 2MB)
        </span>
        <div className="block md:columns-2 gap-4 space-y-4 md:space-y-0">
          {countries.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 border rounded-xl flex gap-3 items-center break-inside-avoid mb-4"
            >
              <div className="text-gray-700 font-medium min-w-4 text-center">
                {index + 1}
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => moveCountry(index, "up")}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={index === countries.length - 1}
                  onClick={() => moveCountry(index, "down")}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ArrowDown size={14} />
                </button>
              </div>
              <div className="relative w-10 h-7 border rounded bg-white text-gray-800 shrink-0 flex items-center justify-center overflow-hidden cursor-pointer">
                {item.flag ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.flag}
                    alt={item.en}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                ) : (
                  <Upload size={14} className="cursor-pointer" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const next = [...countries];
                      next[index].imageFile = file;
                      next[index].flag = URL.createObjectURL(file);
                      setCountries(next);
                    }
                  }}
                />
              </div>
              <input
                type="text"
                value={item.vi}
                placeholder="Tên VI"
                className="text-gray-800 bg-white border p-1 text-xs rounded w-full outline-none"
                onChange={(e) => {
                  const next = [...countries];
                  next[index].vi = e.target.value;
                  setCountries(next);
                }}
                required
              />
              <input
                type="text"
                value={item.en}
                placeholder="Tên EN"
                className="text-gray-800 bg-white border p-1 text-xs rounded w-full outline-none"
                onChange={(e) => {
                  const next = [...countries];
                  next[index].en = e.target.value;
                  setCountries(next);
                }}
                required
              />
              <button
                type="button"
                onClick={() =>
                  setCountries(countries.filter((_, i) => i !== index))
                }
                className="text-red-500 hover:bg-red-50 cursor-pointer p-2 rounded-md shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Điểm nhấn nổi bật (Highlights Carousel)
          </h4>
          <button
            type="button"
            onClick={() =>
              setHighlights([
                ...highlights,
                { titleVi: "", titleEn: "", img: "", href: "#" },
              ])
            }
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm điểm nhấn
          </button>
        </div>
        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          Kích thước khuyến nghị: 1920 x 1080 px (Tỷ lệ 16:9, dưới 2MB)
        </span>
        <div className="space-y-4">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 border rounded-xl grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-2 text-gray-700 relative aspect-video border rounded bg-white flex items-center justify-center overflow-hidden">
                {item.img ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.img}
                    alt={item.titleEn}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload size={16} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const next = [...highlights];
                      next[index].imageFile = file;
                      next[index].img = URL.createObjectURL(file);
                      setHighlights(next);
                    }
                  }}
                />
              </div>
              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={item.titleVi}
                  placeholder="Tiêu đề VI"
                  className="text-gray-800 bg-white border p-2 text-xs rounded outline-none"
                  onChange={(e) => {
                    const next = [...highlights];
                    next[index].titleVi = e.target.value;
                    setHighlights(next);
                  }}
                  required
                />
                <input
                  type="text"
                  value={item.titleEn}
                  placeholder="Tiêu đề EN"
                  className="text-gray-800 bg-white border p-2 text-xs rounded outline-none"
                  onChange={(e) => {
                    const next = [...highlights];
                    next[index].titleEn = e.target.value;
                    setHighlights(next);
                  }}
                  required
                />
                <input
                  type="text"
                  value={item.href}
                  placeholder="Đường dẫn liên kết"
                  className="text-gray-800 bg-white border p-2 text-xs rounded outline-none"
                  onChange={(e) => {
                    const next = [...highlights];
                    next[index].href = e.target.value;
                    setHighlights(next);
                  }}
                  required
                />
              </div>
              <div className="md:col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setHighlights(highlights.filter((_, i) => i !== index))
                  }
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Chia sẻ trên truyền hình (Logo danh sách)
          </h4>
          <button
            type="button"
            onClick={() => setTvStations([...tvStations, { src: "" }])}
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm đài TV
          </button>
        </div>
        <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          Kích thước khuyến nghị: (Tỷ lệ 16:9, dưới 2MB)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tvStations.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 border rounded-xl flex flex-col items-center relative group"
            >
              <div className="relative text-gray-700 w-16 h-9 border rounded bg-white flex items-center justify-center overflow-hidden">
                {item.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt=""
                    className="w-full h-full object-contain p-1"
                  />
                ) : (
                  <Upload size={16} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const next = [...tvStations];
                      next[index].imageFile = file;
                      next[index].src = URL.createObjectURL(file);
                      setTvStations(next);
                    }
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setTvStations(tvStations.filter((_, i) => i !== index))
                }
                className="absolute top-1 right-1 text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-700">
            Báo chí đưa tin (Logo & Bài báo)
          </h4>
          <button
            type="button"
            onClick={() =>
              setPressItems([...pressItems, { logo: "", article: "" }])
            }
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={14} /> Thêm bản tin báo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pressItems.map((item, index) => (
            <div
              key={index}
              className="p-4 text-gray-700 bg-gray-50 border rounded-xl flex flex-col gap-3 relative group"
            >
              <button
                type="button"
                onClick={() =>
                  setPressItems(pressItems.filter((_, i) => i !== index))
                }
                className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 mb-1">
                    Logo tòa soạn
                  </span>
                  <div className="relative w-full h-12 border rounded bg-white flex items-center justify-center overflow-hidden">
                    {item.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.logo}
                        alt=""
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <Upload size={14} />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const next = [...pressItems];
                          next[index].logoFile = file;
                          next[index].logo = URL.createObjectURL(file);
                          setPressItems(next);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-gray-400 mb-1">
                    Ảnh bài viết (1080 x 1350 px, tỉ lệ 4:5)
                  </span>
                  <div className="relative w-full h-12 border rounded bg-white flex items-center justify-center overflow-hidden">
                    {item.article ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.article}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload size={14} />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const next = [...pressItems];
                          next[index].articleFile = file;
                          next[index].article = URL.createObjectURL(file);
                          setPressItems(next);
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
