"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Press {
  logo: string;
  article: string;
}

export function MediaPressCarousel({ items }: { items: Press[] }) {
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
          className="flex gap-4 [--items-per-screen:2] [--gap-offset:16px] md:[--items-per-screen:3] lg:[--items-per-screen:6]"
        >
          {extended.map((item, index) => (
            <div
              key={index}
              className="shrink-0 w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-80px)/6)] flex flex-col items-center"
            >
              <div className="relative w-full h-8 mb-4">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt="Press Logo"
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <div className="relative w-full aspect-4/5 border shadow-sm rounded-lg overflow-hidden bg-white">
                {item.article && (
                  <Image
                    src={item.article}
                    alt="Article Scan"
                    fill
                    className="object-cover"
                  />
                )}
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
