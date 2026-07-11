"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Highlight {
  titleVi: string;
  titleEn: string;
  img: string;
  href: string;
}

export function MediaHighlightsCarousel({ items }: { items: Highlight[] }) {
  const extended = [...items, ...items, ...items];
  const [currentIndex, setCurrentIndex] = useState(items.length);
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
    if (currentIndex === items.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length);
      }, 300);
      return () => clearTimeout(timer);
    }
    if (currentIndex === items.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(items.length * 2 - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="relative w-full px-12">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 size-8 rounded-full border border-[#e2d5c3] bg-white text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
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
          className="flex gap-6 [--items-per-screen:1] [--gap-offset:24px] sm:[--items-per-screen:2] lg:[--items-per-screen:4]"
        >
          {extended.map((item, index) => (
            <div
              key={index}
              className="shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-72px)/4)] flex flex-col"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 shadow group">
                {item.img && (
                  <Image
                    src={item.img}
                    alt="Highlight"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex flex-col items-center text-center w-full px-2 mb-4 flex-1">
                <h4 className="text-base sm:text-lg lg:text-sm font-bold text-[#0a1b35] leading-tight whitespace-pre-line">
                  {item.titleVi}
                </h4>
                <p className="text-xs sm:text-sm lg:text-[10px] text-gray-500 uppercase mt-1.5 whitespace-pre-line">
                  {item.titleEn}
                </p>
              </div>

              <div className="mt-auto w-full flex justify-center">
                <Link
                  href={item.href}
                  target="_blank"
                  className="inline-flex flex-col items-center border border-[#c29b57] bg-[#c29b57]/5 hover:bg-[#c29b57] text-[#c29b57] hover:text-white rounded-md p-2 transition-colors duration-200 w-full text-center"
                >
                  <span className="text-xs font-semibold">
                    Xem thêm / View more
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 size-8 rounded-full border border-[#e2d5c3] bg-white text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
