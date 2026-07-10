import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { MediaHighlightsCarousel } from "./MediaHighlightsCarousel";
import { MediaPressCarousel } from "./MediaPressCarousel";

export async function ConnectionsAndMedia() {
  const mediaConfig = await prisma.mediaConfig.findFirst({
    include: {
      countries: { orderBy: { order: "asc" } },
      highlights: { orderBy: { order: "asc" } },
      tvStations: { orderBy: { order: "asc" } },
      pressItems: { orderBy: { order: "asc" } },
    },
  });

  if (!mediaConfig) return null;

  const titleVi = mediaConfig.titleVi || "";
  const titleEn = mediaConfig.titleEn || "";
  const descVi = mediaConfig.descVi || "";
  const descEn = mediaConfig.descEn || "";
  const mapImg = mediaConfig.mapImg || "";

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16 flex flex-col gap-16 lg:gap-24">
      <div className="w-full mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center mb-16">
          <div className="lg:col-span-4 flex flex-col">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#0a1b35] mb-1 uppercase text-center lg:text-left"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {titleVi}
            </h2>
            <h3 className="text-gray-500 text-sm sm:text-base uppercase mb-4 italic text-center lg:text-left">
              / {titleEn}
            </h3>
            <p className="text-sm text-[#0a1b35] leading-relaxed mb-2 font-medium text-center lg:text-left">
              {descVi}
            </p>
            <p className="text-[12.5px] italic text-[#0a1b35]/90 leading-relaxed text-center lg:text-left">
              {descEn}
            </p>
          </div>

          <div className="lg:col-span-4 relative w-full aspect-video lg:aspect-auto lg:h-62.5 opacity-70">
            <Image
              src={mapImg}
              alt="World Map"
              fill
              className="object-contain"
            />
          </div>

          <div className="lg:col-span-4 flex flex-col w-full">
            <h2 className="text-xl sm:text-2xl lg:text-lg font-bold text-[#0a1b35] uppercase mb-1 text-center lg:text-left">
              CÁC QUỐC GIA ĐÃ CÔNG TÁC
            </h2>
            <h3 className="text-gray-500 text-[15px] sm:text-base lg:text-sm uppercase mb-6 text-center lg:text-left">
              / COUNTRIES WORKED
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 gap-x-2">
              {mediaConfig.countries.map((country) => (
                <div key={country.id} className="flex flex-col items-center">
                  <div className="relative w-10 h-7 mb-2 shadow-sm border border-gray-100">
                    <Image
                      src={country.flag || ""}
                      alt={country.en || ""}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#0a1b35] text-center mb-0.5">
                    {country.vi}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-gray-500 text-center">
                    {country.en}
                  </span>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center">
                <span className="text-[#0a1b35] font-bold pb-4">...</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mb-16 lg:mb-24">
          <MediaHighlightsCarousel
            items={mediaConfig.highlights.map((i) => ({
              titleVi: i.titleVi || "",
              titleEn: i.titleEn || "",
              img: i.img || "",
              href: i.href || "#",
            }))}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-3 flex flex-col">
            <h2 className="text-xl lg:text-base font-bold text-[#0a1b35] uppercase mb-1 text-center lg:text-left">
              CHIA SẺ TRÊN TRUYỀN HÌNH
            </h2>
            <h3 className="text-gray-500 text-base lg:text-xs uppercase mb-8 text-center lg:text-left">
              / TV APPEARANCES
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mb-6">
              {mediaConfig.tvStations.map((station) => (
                <div key={station.id} className="relative w-16 h-9">
                  <Image
                    src={station.src || ""}
                    alt="TV Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-[#0a1b35] text-center lg:text-left font-medium">
              và nhiều đài truyền hình khác
              <br />
              <span className="text-gray-500 italic font-normal">
                and many other stations
              </span>
            </p>
          </div>

          <div className="lg:col-span-9 flex flex-col border-t lg:border-t-0 lg:border-l border-[#e2d5c3] pt-8 lg:pt-0 lg:pl-8">
            <h2 className="text-xl lg:text-base font-bold text-[#0a1b35] uppercase mb-1 text-center lg:text-left">
              BÁO CHÍ ĐƯA TIN
            </h2>
            <h3 className="text-gray-500 text-base lg:text-xs uppercase mb-8 text-center lg:text-left">
              / FEATURED IN THE PRESS
            </h3>
            <MediaPressCarousel
              items={mediaConfig.pressItems.map((i) => ({
                logo: i.logo || "",
                article: i.article || "",
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
