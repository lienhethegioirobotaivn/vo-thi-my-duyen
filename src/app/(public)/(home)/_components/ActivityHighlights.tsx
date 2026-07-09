"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ActivityHighlights() {
  const mockImages = [
    "/activity_1.jpg",
    "/activity_2.jpg",
    "/activity_3.jpg",
    "/activity_4.jpg",
    "/activity_5.jpg",
    "/activity_6.jpg",
  ];

  const extendedImages = [...mockImages, ...mockImages, ...mockImages];

  const [currentIndex, setCurrentIndex] = useState(mockImages.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = useCallback(() => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  }, [isTransitioning]);

  const handlePrev = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentIndex === mockImages.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(mockImages.length);
      }, 500);
    } else if (currentIndex === mockImages.length - itemsPerView) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(mockImages.length * 2 - itemsPerView);
      }, 500);
    } else {
      if (!isTransitioning) {
        setTimeout(() => setIsTransitioning(true), 50);
      }
    }
  }, [currentIndex, mockImages.length, isTransitioning, itemsPerView]);

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto px-6 lg:px-16 relative">
        <div className="flex items-center justify-center w-full gap-6 mb-8">
          <div className="h-px bg-[#e2d5c3] grow" />
          <h2 className="hidden lg:flex items-center gap-2 text-center text-lg sm:text-xl lg:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              HÌNH ẢNH HOẠT ĐỘNG
            </span>
            <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base italic">
              /
            </span>
            <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base italic">
              ACTIVITY HIGHLIGHTS
            </span>
          </h2>
          <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
            <h2 className="flex flex-col items-center text-center text-[1.4rem] sm:text-2xl font-bold text-[#0a1b35]">
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                HÌNH ẢNH HOẠT ĐỘNG
              </span>
              <span className="mt-1 text-gray-500 font-normal text-base sm:text-lg italic">
                / ACTIVITY HIGHLIGHTS
              </span>
            </h2>
          </div>
          <div className="h-px bg-[#e2d5c3] grow" />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="shrink-0 w-10 h-10 rounded-full bg-white border border-[#e2d5c3] text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            className="flex-1 w-full overflow-hidden rounded-xl bg-white shadow-sm"
            ref={containerRef}
          >
            <div
              className="flex gap-2"
              style={{
                transform: `translateX(calc(-${currentIndex * (100 / itemsPerView)}% - ${(currentIndex * 8) / itemsPerView}px))`,
                transition: isTransitioning
                  ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              }}
            >
              {extendedImages.map((src, index) => (
                <div
                  key={index}
                  className="shrink-0 relative aspect-video rounded-lg overflow-hidden bg-gray-100"
                  style={{
                    width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 8) / itemsPerView}px)`,
                  }}
                >
                  <Image
                    src={src}
                    alt={`Activity ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="shrink-0 w-10 h-10 rounded-full bg-white border border-[#e2d5c3] text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
