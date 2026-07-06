"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export const navItems = [
  { labelVi: "TRANG CHỦ", labelEn: "Home", href: "/" },
  { labelVi: "GIỚI THIỆU", labelEn: "About", href: "/about" },
  { labelVi: "DỊCH VỤ", labelEn: "Services", href: "/services" },
  { labelVi: "ĐÀO TẠO", labelEn: "Training", href: "/training" },
  { labelVi: "KHÁCH HÀNG", labelEn: "Clients", href: "/clients" },
  { labelVi: "TIN TỨC", labelEn: "News", href: "/news" },
  { labelVi: "LIÊN HỆ", labelEn: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"VI" | "EN">("VI");

  return (
    <nav className="w-full bg-[#fbfbfa] sticky top-0 z-50 border-b border-[#e2d5c3]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <Link href={"/"} className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 flex items-center justify-center text-[#c29b57]">
              <Image
                src={"/navbar/logo.png"}
                alt="Logo"
                width={100}
                height={100}
                className="object-contain size-full"
              />
            </div>
            <div className="flex flex-col">
              <span
                className="text-base font-bold text-[#0a1b35] sm:text-lg"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                ThS. VÕ THỊ MỸ DUYÊN
              </span>
              <span className="text-[10px] text-[#0a1b35] font-bold uppercase mt-0.5">
                GIẢNG VIÊN - DIỄN GIẢ - CỐ VẤN CHIẾN LƯỢC
              </span>
              <span className="text-[9px] text-[#0a1b35] uppercase font-medium mt-0.5">
                Lecturer - Speaker - Strategic Advisor
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="group flex flex-col items-center text-center px-1"
              >
                <span className="text-[11px] 2xl:text-xs font-bold text-[#0a1b35] group-hover:text-[#c29b57] transition-colors duration-200">
                  {item.labelVi}
                </span>
                <span className="text-[10px] 2xl:text-xs italic text-[#0a1b35] group-hover:text-[#c29b57] transition-colors duration-200">
                  {item.labelEn}
                </span>
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex bg-white rounded-full overflow-hidden border border-[#c29b57]">
              <button
                onClick={() => setLanguage("VI")}
                className={`px-3 py-1 text-xs font-bold cursor-pointer ${language === "VI" ? "bg-[#c29b57] text-white" : "text-gray-500"}`}
              >
                VI
              </button>
              <button
                onClick={() => setLanguage("EN")}
                className={`px-3 py-1 text-xs font-bold cursor-pointer ${language === "EN" ? "bg-[#c29b57] text-white" : "text-gray-500"}`}
              >
                EN
              </button>
            </div>
            <Link
              href="#book"
              className="hidden lg:flex flex-col items-center justify-center bg-linear-to-b from-[#d5b06d] to-[#b3874c] hover:opacity-95 text-white px-5 py-2 rounded shadow-sm transition-all active:scale-95"
            >
              <span className="text-[11px] font-bold">ĐẶT LỊCH NGAY</span>
              <span className="text-[9px] uppercase opacity-90">BOOK NOW</span>
            </Link>
          </div>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#0a1b35] hover:text-[#c29b57] focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-[#fbfbfa] border-t border-[#e2d5c3] absolute w-full left-0 right-0 shadow-xl z-50 max-h-[calc(100vh-82px)] overflow-y-auto">
          <div className="px-6 pt-3 pb-6 space-y-2 flex flex-col items-start">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="w-full py-2.5 border-b border-gray-100 last:border-none flex flex-col items-start justify-center"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-sm font-bold text-[#0a1b35]">
                  {item.labelVi}
                </span>
                <span className="text-xs text-[#0a1b35] italic">
                  {item.labelEn}
                </span>
              </Link>
            ))}
            <div className="pt-4 w-full flex flex-col items-start gap-4">
              <div className="flex bg-white rounded-full overflow-hidden border border-[#c29b57]">
                <button
                  onClick={() => setLanguage("VI")}
                  className={`px-4 py-1.5 text-xs font-bold ${language === "VI" ? "bg-[#c29b57] text-white" : "text-gray-500"}`}
                >
                  VI
                </button>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-4 py-1.5 text-xs font-bold ${language === "EN" ? "bg-[#c29b57] text-white" : "text-gray-500"}`}
                >
                  EN
                </button>
              </div>
              <Link
                href="#book"
                className="w-full flex flex-col items-center justify-center bg-linear-to-b from-[#d5b06d] to-[#b3874c] text-white py-2 rounded-md shadow-sm active:scale-95"
              >
                <span className="text-xs font-bold">ĐẶT LỊCH NGAY</span>
                <span className="text-[10px] uppercase">BOOK NOW</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
