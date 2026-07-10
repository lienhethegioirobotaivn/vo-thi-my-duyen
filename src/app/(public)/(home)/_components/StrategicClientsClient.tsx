"use client";

import { useState } from "react";
import Image from "next/image";

interface Tab {
  id: string;
  vi: string;
  en: string;
}

interface StrategicClientsClientProps {
  titleVi: string;
  titleEn: string;
  footerVi: string;
  footerEn: string;
  tabs: Tab[];
  clientData: Record<string, string[]>;
}

export function StrategicClientsClient({
  titleVi,
  titleEn,
  footerVi,
  footerEn,
  tabs,
  clientData,
}: StrategicClientsClientProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16">
      <div className="mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-center w-full gap-6 mb-8">
          <div className="h-px bg-[#e2d5c3] grow" />
          <h2 className="hidden lg:flex items-center gap-2 text-center text-lg sm:text-xl lg:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              {titleVi}
            </span>
            <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base italic">
              /
            </span>
            <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base italic">
              {titleEn}
            </span>
          </h2>
          <div className="h-px bg-[#e2d5c3] grow" />
        </div>
        <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
          <h2 className="flex flex-col items-center text-center text-2xl sm:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              {titleVi}
            </span>
            <span className="mt-1 text-gray-500 font-normal text-lg sm:text-xl italic">
              / {titleEn}
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

          <div className="min-h-50 w-full bg-white border border-[#e2d5c3]/50 p-6 sm:p-8 lg:p-10 shadow-sm">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4 items-center justify-items-center">
              {clientData[activeTab]?.map((src, index) => (
                <div
                  key={index}
                  className="relative w-full aspect-video flex items-center justify-center group"
                >
                  {src ? (
                    <Image
                      src={src}
                      alt="Client Strategic Corporate Logo"
                      fill
                      className="object-contain p-1"
                      sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
                    />
                  ) : (
                    <div className="w-[85%] h-[85%] bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-[9px] text-gray-400">No Image</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center flex flex-col items-center justify-center">
          <p className="text-[#0a1b35] text-sm font-bold uppercase mb-1">
            {footerVi}
          </p>
          <p className="text-gray-500 text-xs italic uppercase">{footerEn}</p>
        </div>
      </div>
    </section>
  );
}
