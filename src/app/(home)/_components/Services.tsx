"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Services() {
  const baseServices = [
    {
      vi: "ĐÀO TẠO INHOUSE",
      en: "In-house Training",
      img: "/image_c41173.jpg",
    },
    {
      vi: "HỘI THẢO & WORKSHOP",
      en: "Seminars & Workshops",
      img: "/image_c41173.jpg",
    },
    {
      vi: "TƯ VẤN CHIẾN LƯỢC",
      en: "Strategic Consulting",
      img: "/image_c41173.jpg",
    },
    {
      vi: "COACHING & MENTORING",
      en: "Coaching & Mentoring",
      img: "/image_c41173.jpg",
    },
    {
      vi: "MC & DẪN CHƯƠNG TRÌNH",
      en: "MC & Event Host",
      img: "/image_c41173.jpg",
    },
  ];

  const extendedServices = [...baseServices, ...baseServices, ...baseServices];

  const [currentIndex, setCurrentIndex] = useState(baseServices.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (!isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === baseServices.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(baseServices.length);
      }, 300);
      return () => clearTimeout(timer);
    }

    if (currentIndex === baseServices.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(baseServices.length * 2 - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, baseServices.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto px-6 lg:px-16 relative">
        <div className="hidden lg:flex items-center justify-center w-full gap-6 mb-12">
          <div className="h-px bg-[#e2d5c3] grow" />
          <h2 className="shrink-0 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center text-xl sm:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              DỊCH VỤ CUNG CẤP
            </span>
            <span className="mt-1 text-gray-500 font-normal text-base sm:text-xl italic">
              / SERVICES
            </span>
          </h2>
          <div className="h-px bg-[#e2d5c3] grow" />
        </div>
        <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
          <h2 className="flex flex-col items-center text-center text-2xl sm:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              DỊCH VỤ CUNG CẤP
            </span>
            <span className="mt-1 text-gray-500 font-normal text-base sm:text-lg italic">
              / SERVICES
            </span>
          </h2>
        </div>

        <div className="relative w-full px-12 sm:px-12">
          <button
            onClick={handlePrev}
            className="absolute left-0 sm:-left-2 top-1/3 -translate-y-1/2 z-20 size-8 rounded-full border border-[#e2d5c3] bg-white text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="w-full overflow-hidden" ref={trackRef}>
            <div
              style={
                {
                  transform: `translateX(calc(-${currentIndex} * (100% + var(--gap-offset)) / var(--items-per-screen)))`,
                  transition: isTransitioning
                    ? "transform 300ms ease-in-out"
                    : "none",
                } as CSSProperties
              }
              className="flex gap-4 md:gap-6 [--items-per-screen:1] [--gap-offset:16px] sm:[--items-per-screen:2] md:[--items-per-screen:3] md:[--gap-offset:24px] lg:[--items-per-screen:4] xl:[--items-per-screen:5]"
            >
              {extendedServices.map((item, index) => (
                <div
                  key={index}
                  className="shrink-0 w-full sm:w-[calc((100%-16px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] xl:w-[calc((100%-96px)/5)] flex flex-col items-center"
                >
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm mb-4">
                    <Image
                      src={item.img}
                      alt={item.vi}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="text-sm font-bold text-[#0a1b35] text-center leading-snug flex items-center justify-center px-2">
                    {item.vi}
                  </h3>

                  <p className="text-xs italic text-[#0a1b35]/90 text-center mt-1 leading-normal flex items-start justify-center px-2">
                    {item.en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 sm:-right-2 top-1/3 -translate-y-1/2 z-20 size-8 rounded-full border border-[#e2d5c3] bg-white text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
