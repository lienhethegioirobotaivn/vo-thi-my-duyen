"use client";

import { useState } from "react";
import Image from "next/image";

export function StrategicClients() {
  const [activeTab, setActiveTab] = useState("banking");

  const tabs = [
    { id: "banking", vi: "Ngân hàng", en: "Banking" },
    {
      id: "real_estate",
      vi: "Bất động sản & Xây dựng",
      en: "Real Estate & Construction",
    },
    { id: "fmcg", vi: "Tiêu dùng & Sản xuất", en: "FMCG & Manufacturing" },
    { id: "electronics", vi: "Điện tử & Ô tô", en: "Electronics & Automotive" },
    { id: "telecom", vi: "Viễn thông & Công nghệ", en: "Telecom & Technology" },
    {
      id: "insurance",
      vi: "Bảo hiểm & Chứng khoán",
      en: "Insurance & Securities",
    },
    { id: "aviation", vi: "Hàng không & Du lịch", en: "Aviation & Tourism" },
    { id: "ngo", vi: "Bộ ban ngành & NGO", en: "Government & NGO" },
  ];

  const clientData: Record<string, string[]> = {
    banking: Array(22).fill("/mock_logo_banking.png"),
    real_estate: Array(15).fill("/mock_logo_real_estate.png"),
    fmcg: Array(12).fill("/mock_logo_fmcg.png"),
    electronics: Array(8).fill("/mock_logo_electronics.png"),
    telecom: Array(10).fill("/mock_logo_telecom.png"),
    insurance: Array(14).fill("/mock_logo_insurance.png"),
    aviation: Array(6).fill("/mock_logo_aviation.png"),
    ngo: Array(9).fill("/mock_logo_ngo.png"),
  };

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16">
      <div className="mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-center w-full gap-6 mb-8">
          <div className="h-px bg-[#e2d5c3] grow" />
          <h2 className="hidden lg:flex items-center gap-2 text-center text-lg sm:text-xl lg:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              KHÁCH HÀNG CHIẾN LƯỢC
            </span>
            <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base italic">
              /
            </span>
            <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base italic">
              STRATEGIC CLIENTS
            </span>
          </h2>
          <div className="h-px bg-[#e2d5c3] grow" />
        </div>
        <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
          <h2 className="flex flex-col items-center text-center text-2xl sm:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              KHÁCH HÀNG CHIẾN LƯỢC
            </span>
            <span className="mt-1 text-gray-500 font-normal text-lg sm:text-xl italic">
              / STRATEGIC CLIENTS
            </span>
          </h2>
        </div>

        <div className="flex flex-col rounded-xl overflow-hidden">
          <div className="w-full border border-[#e2d5c3] bg-white overflow-hidden shadow-sm">
            <div className="flex overflow-x-auto scroll-smooth w-full">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center shrink-0 py-3 px-4 transition-colors duration-200 border-r border-[#e2d5c3] last:border-r-0 cursor-pointer ${
                      isActive
                        ? "bg-[#0a1b35] text-white"
                        : "bg-white hover:bg-[#f5f5f5]"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold whitespace-nowrap mb-0.5 ${isActive ? "text-white" : "text-[#0a1b35]"}`}
                    >
                      {tab.vi}
                    </span>
                    <span
                      className={`text-[10px] italic whitespace-nowrap ${isActive ? "text-[#c29b57]" : "text-gray-500"}`}
                    >
                      {tab.en}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="min-h-50 w-full bg-white border border-[#e2d5c3]/50 p-6 sm:p-8 lg:p-10 shadow-sm transition-opacity duration-300">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4 items-center justify-items-center">
              {clientData[activeTab]?.map((src, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-video flex items-center justify-center group"
                >
                  {/* Thay thế div bg-gray-200 này bằng Next Image khi bạn có ảnh thật:
                      <Image src={src} alt="Client Logo" fill className="object-contain grayscale hover:grayscale-0 transition-all duration-300" />
                    */}
                  <div className="w-[80%] h-[80%] bg-gray-200 rounded animate-pulse group-hover:bg-[#e2d5c3] transition-colors flex items-center justify-center">
                    <span className="text-[10px] text-gray-400">Logo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center flex flex-col items-center justify-center">
          <p className="text-[#0a1b35] text-sm font-bold uppercase mb-1">
            VÀ HƠN 2,000+ DOANH NGHIỆP & TỔ CHỨC TRÊN TOÀN QUỐC
          </p>
          <p className="text-gray-500 text-xs italic uppercase">
            AND 2,000+ ENTERPRISES & ORGANIZATIONS NATIONWIDE
          </p>
        </div>
      </div>
    </section>
  );
}
