"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Upload,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CategoryItem {
  id?: string;
  vi: string;
  en: string;
}

interface ArticlePageItem {
  id?: string;
  src: string;
  imageFile?: File | null;
}

interface ArticleItem {
  id?: string;
  row: number;
  title: string;
  description: string;
  categoryId: string;
  date: string;
  publisher: string;
  link: string;
  img: string;
  imageFile?: File | null;
  pages: ArticlePageItem[];
}

interface ArticlesConfigData {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  categories: CategoryItem[];
  row1: ArticleItem[];
  row2: ArticleItem[];
}

interface ArticlesFormProps {
  initialData: ArticlesConfigData | null;
  onSave: (
    formData: FormData,
    categories: CategoryItem[],
    articles: ArticleItem[],
  ) => Promise<void>;
}

const emptyArticle = (row: number): ArticleItem => ({
  row,
  title: "",
  description: "",
  categoryId: "",
  date: "",
  publisher: "",
  link: "#",
  img: "",
  imageFile: null,
  pages: [],
});

export function ArticlesForm({ initialData, onSave }: ArticlesFormProps) {
  const [titleVi, setTitleVi] = useState(initialData?.titleVi || "");
  const [titleEn, setTitleEn] = useState(initialData?.titleEn || "");
  const [descVi, setDescVi] = useState(initialData?.descVi || "");
  const [descEn, setDescEn] = useState(initialData?.descEn || "");
  const [categories, setCategories] = useState<CategoryItem[]>(
    initialData?.categories || [],
  );
  const [articles, setArticles] = useState<ArticleItem[]>([
    ...(initialData?.row1 || []),
    ...(initialData?.row2 || []),
  ]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData, categories, articles);
    setLoading(false);
  };

  const handleAddCategory = () =>
    setCategories([...categories, { vi: "", en: "" }]);

  const categoryKey = (c: CategoryItem, index: number) =>
    c.id || `new-${index}`;

  const handleRemoveCategory = (index: number) => {
    const removedKey = categoryKey(categories[index], index);
    setCategories(categories.filter((_, i) => i !== index));
    setArticles(
      articles.map((a) =>
        a.categoryId === removedKey ? { ...a, categoryId: "" } : a,
      ),
    );
  };

  const handleCategoryChange = (
    index: number,
    key: keyof CategoryItem,
    value: string,
  ) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [key]: value };
    setCategories(updated);
  };

  const handleAdd = (row: number) =>
    setArticles([...articles, emptyArticle(row)]);

  const handleRemove = (index: number) =>
    setArticles(articles.filter((_, i) => i !== index));

  const handleChange = (
    index: number,
    key: keyof ArticleItem,
    value: string,
  ) => {
    const updated = [...articles];
    updated[index] = { ...updated[index], [key]: value } as ArticleItem;
    setArticles(updated);
  };

  const handleImageChange = (index: number, file: File | undefined) => {
    if (!file) return;
    const updated = [...articles];
    updated[index].imageFile = file;
    updated[index].img = URL.createObjectURL(file);
    setArticles(updated);
  };

  const handleAddPage = (articleIndex: number) => {
    const updated = [...articles];
    updated[articleIndex].pages = [
      ...updated[articleIndex].pages,
      { src: "", imageFile: null },
    ];
    setArticles(updated);
  };

  const handleRemovePage = (articleIndex: number, pageIndex: number) => {
    const updated = [...articles];
    updated[articleIndex].pages = updated[articleIndex].pages.filter(
      (_, i) => i !== pageIndex,
    );
    setArticles(updated);
  };

  const handlePageImageChange = (
    articleIndex: number,
    pageIndex: number,
    file: File | undefined,
  ) => {
    if (!file) return;
    const updated = [...articles];
    updated[articleIndex].pages[pageIndex] = {
      ...updated[articleIndex].pages[pageIndex],
      imageFile: file,
      src: URL.createObjectURL(file),
    };
    setArticles(updated);
  };

  const renderRow = (row: number, label: string) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-bold text-gray-700">{label}</h4>
        <button
          type="button"
          onClick={() => handleAdd(row)}
          className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
        >
          <Plus size={16} /> Thêm bài viết
        </button>
      </div>

      {articles
        .map((a, idx) => ({ a, idx }))
        .filter(({ a }) => a.row === row)
        .map(({ a, idx }) => (
          <div
            key={idx}
            className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-3 flex flex-col items-center">
                <span className="text-[10px] text-gray-400 block mb-2 text-center">
                  Ảnh đại diện (tỉ lệ 16:9, khuyến nghị 800 x 450px, dưới 1MB)
                </span>
                <div className="relative w-full aspect-video border border-gray-300 rounded-lg bg-white overflow-hidden flex items-center justify-center mb-2">
                  {a.img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.img}
                      alt="Article"
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
                      handleImageChange(idx, e.target.files?.[0])
                    }
                  />
                </label>
              </div>

              <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <span className="text-xs text-gray-400 block mb-1">
                    Tiêu đề bài viết
                  </span>
                  <input
                    required
                    value={a.title}
                    onChange={(e) => handleChange(idx, "title", e.target.value)}
                    className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                  />
                </div>
                <div className="md:col-span-2">
                  <span className="text-xs text-gray-400 block mb-1">
                    Mô tả ngắn
                  </span>
                  <textarea
                    rows={2}
                    value={a.description}
                    onChange={(e) =>
                      handleChange(idx, "description", e.target.value)
                    }
                    className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    Danh mục
                  </span>
                  <select
                    required
                    value={a.categoryId}
                    onChange={(e) =>
                      handleChange(idx, "categoryId", e.target.value)
                    }
                    className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c, cIdx) => (
                      <option
                        key={categoryKey(c, cIdx)}
                        value={categoryKey(c, cIdx)}
                      >
                        {c.vi || "(chưa đặt tên)"}
                      </option>
                    ))}
                  </select>
                  {categories.length === 0 && (
                    <span className="text-[10px] text-red-400 block mt-1">
                      Chưa có danh mục, thêm ở phần Quản lý danh mục phía trên.
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    Ngày đăng (vd: 20/05/2024)
                  </span>
                  <input
                    value={a.date}
                    onChange={(e) => handleChange(idx, "date", e.target.value)}
                    className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    Đơn vị xuất bản
                  </span>
                  <input
                    value={a.publisher}
                    onChange={(e) =>
                      handleChange(idx, "publisher", e.target.value)
                    }
                    className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    Link ngoài (nếu có)
                  </span>
                  <input
                    value={a.link}
                    onChange={(e) => handleChange(idx, "link", e.target.value)}
                    className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3">
              <button
                type="button"
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="flex items-center gap-1 text-xs font-semibold text-[#0a1b35] cursor-pointer"
              >
                {expanded === idx ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
                Ảnh trang lật ({a.pages.length} trang)
              </button>

              {expanded === idx && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {a.pages.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="relative border border-gray-300 rounded-lg bg-white p-2"
                    >
                      <span className="text-[9px] text-gray-400 block mb-1 text-center">
                        Tỉ lệ 3:4, khuyến nghị 900 x 1200px, dưới 1MB
                      </span>
                      <div className="relative w-full aspect-3/4 bg-gray-100 rounded overflow-hidden mb-1">
                        {p.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.src}
                            alt={`Page ${pIdx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-[9px] text-gray-400 flex items-center justify-center h-full">
                            Trống
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <label className="px-1.5 py-1 bg-gray-50 border border-gray-300 text-gray-700 text-[9px] rounded cursor-pointer hover:bg-gray-100 flex items-center gap-1">
                          <Upload size={9} /> Tải
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handlePageImageChange(
                                idx,
                                pIdx,
                                e.target.files?.[0],
                              )
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => handleRemovePage(idx, pIdx)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddPage(idx)}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#c29b57] hover:border-[#c29b57] aspect-3/4 cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-3">
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="flex items-center gap-1 text-xs text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                <Trash2 size={14} /> Xóa bài viết
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Bài viết đã xuất bản (Published Articles)
        </h3>
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
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Mô tả (Tiếng Việt)
          </label>
          <textarea
            name="descVi"
            rows={2}
            value={descVi}
            onChange={(e) => setDescVi(e.target.value)}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-semibold text-gray-700 block mb-1">
            Mô tả (Tiếng Anh)
          </label>
          <textarea
            name="descEn"
            rows={2}
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
          />
        </div>
      </div>

      <div className="border-b border-gray-100 pb-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-gray-700">Quản lý danh mục</h4>
          <button
            type="button"
            onClick={handleAddCategory}
            className="flex items-center gap-1 text-xs font-semibold text-[#c29b57] hover:text-[#c29b57]/80 cursor-pointer"
          >
            <Plus size={16} /> Thêm danh mục
          </button>
        </div>
        <div className="space-y-2">
          {categories.map((c, idx) => (
            <div key={categoryKey(c, idx)} className="flex gap-2 items-center">
              <input
                placeholder="Tên danh mục (VI)"
                value={c.vi}
                onChange={(e) =>
                  handleCategoryChange(idx, "vi", e.target.value)
                }
                className="text-gray-800 flex-1 bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
              <input
                placeholder="Category name (EN)"
                value={c.en}
                onChange={(e) =>
                  handleCategoryChange(idx, "en", e.target.value)
                }
                className="text-gray-800 flex-1 bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(idx)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer shrink-0"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {categories.length === 0 && (
            <p className="text-xs text-gray-400 italic">
              Chưa có danh mục nào.
            </p>
          )}
        </div>
      </div>

      {renderRow(1, "Hàng 1 (Row 1)")}
      {renderRow(2, "Hàng 2 (Row 2)")}
    </form>
  );
}
