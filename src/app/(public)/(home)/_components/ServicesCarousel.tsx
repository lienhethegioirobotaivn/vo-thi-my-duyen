"use client";

import { useState, useEffect, useRef, CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselItem {
  vi: string;
  en: string;
  img: string;
}

export function ServicesCarousel({
  baseServices,
}: {
  baseServices: CarouselItem[];
}) {
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
  );
}
