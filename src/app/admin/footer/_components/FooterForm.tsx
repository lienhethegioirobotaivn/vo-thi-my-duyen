"use client";

import { useState } from "react";
import { Save } from "lucide-react";

interface FooterConfigData {
  id?: string;
  contactTitleVi: string;
  contactTitleEn: string;
  phone: string;
  email: string;
  website: string;
  addressVi: string;
  addressEn: string;
  bookTitleVi: string;
  bookTitleEn: string;
  newsletterTitleVi: string;
  newsletterTitleEn: string;
  newsletterDescVi: string;
  newsletterDescEn: string;
  copyrightText: string;
  sloganText: string;
}

interface FooterFormProps {
  initialData: FooterConfigData | null;
  onSave: (formData: FormData) => Promise<void>;
}

export function FooterForm({ initialData, onSave }: FooterFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    await onSave(formData);
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-4xl bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
    >
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Cấu hình Chân trang (Footer)
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

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h4 className="text-sm font-bold text-gray-700">
          Khối 1: Thông tin liên hệ (Contact)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tiêu đề khối (VI)
            </label>
            <input
              type="text"
              name="contactTitleVi"
              defaultValue={initialData?.contactTitleVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tiêu đề khối (EN)
            </label>
            <input
              type="text"
              name="contactTitleEn"
              defaultValue={initialData?.contactTitleEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              defaultValue={initialData?.phone || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Hộp thư Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={initialData?.email || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Địa chỉ Website
            </label>
            <input
              type="text"
              name="website"
              defaultValue={initialData?.website || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Địa chỉ hiển thị (VI)
              </label>
              <input
                type="text"
                name="addressVi"
                defaultValue={initialData?.addressVi || ""}
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Địa chỉ hiển thị (EN)
              </label>
              <input
                type="text"
                name="addressEn"
                defaultValue={initialData?.addressEn || ""}
                className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h4 className="text-sm font-bold text-gray-700">
          Khối 2: Tiêu đề đặt lịch (Book Speaker)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tiêu đề form đặt lịch (VI)
            </label>
            <input
              type="text"
              name="bookTitleVi"
              defaultValue={initialData?.bookTitleVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tiêu đề form đặt lịch (EN)
            </label>
            <input
              type="text"
              name="bookTitleEn"
              defaultValue={initialData?.bookTitleEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b border-gray-100 pb-6">
        <h4 className="text-sm font-bold text-gray-700">
          Khối 3: Bản tin & Nhận tài liệu (Newsletter)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tiêu đề đăng ký (VI)
            </label>
            <input
              type="text"
              name="newsletterTitleVi"
              defaultValue={initialData?.newsletterTitleVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Tiêu đề đăng ký (EN)
            </label>
            <input
              type="text"
              name="newsletterTitleEn"
              defaultValue={initialData?.newsletterTitleEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Mô tả ngắn gọn (VI)
            </label>
            <textarea
              name="newsletterDescVi"
              rows={2}
              defaultValue={initialData?.newsletterDescVi || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Mô tả ngắn gọn (EN)
            </label>
            <textarea
              name="newsletterDescEn"
              rows={2}
              defaultValue={initialData?.newsletterDescEn || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-bold text-gray-700">
          Khối bản quyền & Slogan dưới cùng
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Nội dung bản quyền (Copyright)
            </label>
            <input
              type="text"
              name="copyrightText"
              defaultValue={initialData?.copyrightText || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Dòng chữ Slogan chiến lược
            </label>
            <input
              type="text"
              name="sloganText"
              defaultValue={initialData?.sloganText || ""}
              className="text-gray-800 w-full bg-white rounded-lg border border-gray-300 p-2 text-xs outline-none focus:border-[#0a1b35]"
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
}
