"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface Program {
  vi: string;
  en: string;
  icon: string;
}

interface Social {
  titleVi: string;
  titleEn: string;
  linkText: string;
  url: string;
  bgColor: string;
  iconImg: string;
}

interface ConnectAndTrainingClientProps {
  trainingTitleVi: string;
  trainingTitleEn: string;
  connectTitleVi: string;
  connectTitleEn: string;
  fanpageTitle: string;
  encodedUrl: string;
  logoIcon: string;
  programs: Program[];
  socials: Social[];
}

export function ConnectAndTrainingClient({
  trainingTitleVi,
  trainingTitleEn,
  connectTitleVi,
  connectTitleEn,
  fanpageTitle,
  encodedUrl,
  logoIcon,
  programs,
  socials,
}: ConnectAndTrainingClientProps) {
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
                  {trainingTitleVi}
                </h3>
                <p className="text-white/70 text-sm lg:text-xs uppercase italic">
                  {trainingTitleEn}
                </p>
              </div>

              <div className="flex flex-col gap-4 grow">
                {programs.map((program, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="relative size-7 lg:size-5 shrink-0 mt-0.5">
                      {program.icon && (
                        <Image
                          src={program.icon}
                          alt={program.en}
                          fill
                          className="object-cover"
                        />
                      )}
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
              {logoIcon && (
                <Image
                  src={logoIcon}
                  alt="Logo Matrix"
                  fill
                  className="object-contain"
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col py-2 lg:py-6 lg:px-2">
            <div className="flex items-center justify-center w-full gap-4 mb-8">
              <div className="h-px bg-[#e2d5c3] grow" />
              <h2 className="shrink-0 hidden lg:flex items-center gap-2 text-center text-lg sm:text-[1.3rem] font-bold text-[#0a1b35]">
                <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {connectTitleVi}
                </span>
                <span className="mt-1 text-gray-500 font-normal text-sm sm:text-base">
                  / {connectTitleEn}
                </span>
              </h2>
              <div className="h-px bg-[#e2d5c3] grow" />
            </div>
            <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-6">
              <h2 className="flex flex-col items-center text-center text-2xl sm:text-2xl font-bold text-[#0a1b35]">
                <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {connectTitleVi}
                </span>
                <span className="mt-0.5 text-gray-500 font-normal text-base sm:text-base italic">
                  / {connectTitleEn}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socials.map((social, index) => (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-2 rounded-full border border-gray-200 bg-white hover:border-[#c29b57] hover:shadow-md transition-all group h-16"
                >
                  <div
                    className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative"
                    style={{ backgroundColor: social.bgColor }}
                  >
                    {social.iconImg && (
                      <Image
                        src={social.iconImg}
                        alt="Social Network Icon"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-3 flex flex-col overflow-hidden w-full">
                    <span className="text-sm lg:text-xs font-bold text-[#0a1b35] truncate uppercase">
                      {social.titleVi}
                    </span>
                    <span className="text-xs lg:text-[10px] text-gray-500 truncate italic">
                      {social.titleEn}
                    </span>
                    <span className="text-[11px] lg:text-[10px] text-[#0066cc] truncate hover:underline">
                      {social.linkText}
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
                {fanpageTitle}
              </h3>

              <div
                ref={containerRef}
                className="w-full bg-white grow rounded overflow-hidden shadow-inner flex justify-center items-stretch"
              >
                <iframe
                  src={`https://www.facebook.com/plugins/page.php?href=${encodedUrl}&tabs=timeline&width=${fbWidth}&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
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
