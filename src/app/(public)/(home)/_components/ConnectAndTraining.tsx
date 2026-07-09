"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export function ConnectAndTraining() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fbWidth, setFbWidth] = useState(340);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const validWidth = Math.min(Math.max(width, 180), 500);
        setFbWidth(validWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const trainingPrograms = [
    {
      vi: "Kỹ năng giao tiếp",
      en: "Communication Skills",
      icon: "/home/9.png",
    },
    {
      vi: "Lãnh đạo & phát triển bản thân",
      en: "Leadership & Personal Development",
      icon: "/home/38.png",
    },
    {
      vi: "Văn hóa & giá trị Việt Nam",
      en: "Vietnamese Culture & Values",
      icon: "/home/11.png",
    },
    {
      vi: "Phụ nữ & truyền cảm hứng",
      en: "Women & Inspiration",
      icon: "/home/34.png",
    },
    {
      vi: "Giáo dục & thanh niên",
      en: "Education & Youth",
      icon: "/home/5.png",
    },
    {
      vi: "Doanh nghiệp & khởi nghiệp",
      en: "Business & Entrepreneurship",
      icon: "/home/3.png",
    },
    {
      vi: "Đào tạo song ngữ",
      en: "Bilingual Training",
      icon: "/home/23.png",
    },
    {
      vi: "Thương hiệu cá nhân",
      en: "Personal Branding",
      icon: "/home/11.png",
    },
  ];

  const socialLinks = [
    {
      platform: "facebook",
      titleVi: "FACEBOOK CÁ NHÂN",
      titleEn: "Personal Facebook",
      link: "facebook.com/vothimyduyen",
      url: "https://facebook.com/vothimyduyen",
      bgColor: "bg-[#1877F2]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      platform: "facebook",
      titleVi: "FANPAGE TS. VÕ THỊ MỸ DUYÊN",
      titleEn: "Fanpage TS. Vo Thi My Duyen",
      link: "facebook.com/ts.vothimyduyen",
      url: "https://facebook.com/ts.vothimyduyen",
      bgColor: "bg-[#1877F2]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      platform: "youtube",
      titleVi: "YOUTUBE",
      titleEn: "TS. Vo Thi My Duyen",
      link: "youtube.com/@vothimyduyen",
      url: "https://youtube.com/@vothimyduyen",
      bgColor: "bg-[#FF0000]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      platform: "zalo",
      titleVi: "ZALO LIÊN HỆ",
      titleEn: "Connect with me on Zalo",
      link: "zalo.me/090xxxxxxx",
      url: "https://zalo.me/090xxxxxxx",
      bgColor: "bg-[#0068FF]",
      icon: <span className="text-white font-bold text-[10px]">Zalo</span>,
    },
    {
      platform: "tiktok",
      titleVi: "TIKTOK CHUYỆN NHÀ DÙNG HOA HỒNG",
      titleEn: "TikTok - Chuyện nhà Dùng Hoa Hồng",
      link: "tiktok.com/@chuyennhadunghoahong",
      url: "https://tiktok.com/@chuyennhadunghoahong",
      bgColor: "bg-black",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v7.2c0 1.63-.44 3.29-1.35 4.63-1.41 2.06-3.8 3.32-6.27 3.53-2.61.22-5.32-.42-7.25-2.27-1.92-1.84-2.82-4.54-2.45-7.16.37-2.6 1.95-4.89 4.19-6.09 1.25-.67 2.69-.98 4.12-.96v4.06c-1.39.02-2.77.62-3.7 1.68-.9.99-1.25 2.41-1.04 3.75.25 1.57 1.45 2.91 2.98 3.33 1.54.43 3.25.13 4.54-.86 1.13-.88 1.78-2.26 1.83-3.71l.03-14.24h3.79v.01z" />
        </svg>
      ),
    },
    {
      platform: "linkedin",
      titleVi: "LINKEDIN",
      titleEn: "linkedin.com/in/vothimyduyen",
      link: "linkedin.com/in/vothimyduyen",
      url: "https://linkedin.com/in/vothimyduyen",
      bgColor: "bg-[#0A66C2]",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16">
      <div className="mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-stretch">
          <div className="lg:col-span-3 bg-[#16203a] rounded-xl relative overflow-hidden flex flex-col shadow-lg border border-[#c29b57]/20">
            <div className="p-6 relative z-10 flex flex-col h-full">
              <div className="text-center mb-8">
                <h3
                  className="text-[#c29b57] text-xl lg:text-base font-bold uppercase mb-1"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  CHƯƠNG TRÌNH ĐÀO TẠO
                </h3>
                <p className="text-white/70 text-sm lg:text-xs uppercase italic">
                  TRAINING PROGRAMS
                </p>
              </div>

              <div className="flex flex-col gap-4 grow">
                {trainingPrograms.map((program, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="relative size-7 lg:size-5 shrink-0 mt-0.5">
                      <Image
                        src={program.icon}
                        alt={program.en}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-white text-sm lg:text-xs font-semibold group-hover:text-[#c29b57] transition-colors leading-tight">
                        {program.vi}
                      </h4>
                      <p className="text-gray-500 text-xs lg:text-[10px] italic mt-0.5 leading-tight">
                        {program.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-1 right-1 size-16 opacity-30 pointer-events-none">
              <Image
                src="/navbar/logo.png"
                alt="Lotus"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col py-2 lg:py-6 lg:px-2">
            <div className="flex items-center justify-center w-full gap-4 mb-8">
              <div className="h-px bg-[#e2d5c3] grow" />
              <h2 className="shrink-0 hidden lg:flex items-center gap-2 text-center text-lg sm:text-[1.3rem] font-bold text-[#0a1b35]">
                <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                  KẾT NỐI VỚI TÔI
                </span>
                <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base">
                  / CONNECT WITH ME
                </span>
              </h2>
              <div className="h-px bg-[#e2d5c3] grow" />
            </div>
            <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-6">
              <h2 className="flex flex-col items-center text-center text-2xl sm:text-2xl font-bold text-[#0a1b35]">
                <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                  KẾT NỐI VỚI TÔI
                </span>
                <span className="mt-0.5 text-gray-500 font-normal text-base sm:text-base italic">
                  / CONNECT WITH ME
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-full border border-gray-200 bg-white hover:border-[#c29b57] hover:shadow-md transition-all group h-16"
                >
                  <div
                    className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${social.bgColor} shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    {social.icon}
                  </div>
                  <div className="ml-3 flex flex-col overflow-hidden">
                    <span className="text-sm lg:text-xs font-bold text-[#0a1b35] truncate uppercase">
                      {social.titleVi}
                    </span>
                    <span className="text-xs lg:text-[10px] text-gray-500 truncate italic">
                      {social.titleEn !== social.link ? social.titleEn : ""}
                    </span>
                    <span className="text-[11px] lg:text-[10px] text-[#0066cc] truncate hover:underline">
                      {social.link}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#16203a] rounded-xl relative overflow-hidden flex flex-col shadow-lg border border-[#c29b57]/20 min-h-100">
            <div className="p-6 relative z-10 flex flex-col h-full items-center w-full">
              <h3
                className="text-[#c29b57] text-2xl lg:text-base font-bold uppercase mb-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                FANPAGE
              </h3>

              <div
                ref={containerRef}
                className="w-full bg-white grow rounded overflow-hidden shadow-inner flex justify-center items-stretch"
              >
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FKingsmanEducationOrganization%2F&tabs=timeline&width=${fbWidth}&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
                  width={fbWidth}
                  style={{
                    border: "none",
                    overflow: "hidden",
                    width: `${fbWidth}px`,
                  }}
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Facebook Fanpage"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
