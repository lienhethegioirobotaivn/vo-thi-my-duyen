import Image from "next/image";
import { prisma } from "@/lib/prisma";

export async function AreasOfExpertise() {
  const expertiseConfig = await prisma.expertiseConfig.findFirst({
    include: {
      items: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (
    !expertiseConfig ||
    !expertiseConfig.items ||
    expertiseConfig.items.length === 0
  )
    return null;

  const titleVi = expertiseConfig.titleVi || "CÁC MẢNG CHUYÊN MÔN";
  const titleEn = expertiseConfig.titleEn || "AREAS OF EXPERTISE";

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16">
      <div className="mx-auto px-6 lg:px-16">
        <div className="border border-[#e2d5c3] rounded-2xl bg-white px-4 py-8 md:py-10 lg:p-8 shadow-sm">
          <div className="hidden lg:flex items-center justify-center w-full gap-6 mb-10">
            <div className="h-px bg-[#e2d5c3] grow" />
            <h2 className="shrink-0 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center text-xl sm:text-2xl font-bold text-[#0a1b35]">
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                {titleVi}
              </span>
              <span className="mt-1 text-gray-500 font-normal text-base sm:text-xl italic">
                /
              </span>
              <span className="mt-1 text-gray-500 font-normal text-base sm:text-xl italic">
                {titleEn}
              </span>
            </h2>
            <div className="h-px bg-[#e2d5c3] grow" />
          </div>
          <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
            <h2 className="flex flex-col items-center text-center text-[1.4rem] sm:text-2xl font-bold text-[#0a1b35]">
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                {titleVi}
              </span>
              <span className="mt-1 text-gray-500 font-normal text-base sm:text-lg italic">
                / {titleEn}
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-y-8">
            {expertiseConfig.items.map((item, index) => {
              const isLastItem = index === expertiseConfig.items.length - 1;

              const isLastMobile = (index + 1) % 2 === 0;
              const isLastTablet = (index + 1) % 4 === 0;
              const isLastDesktop = (index + 1) % 7 === 0;

              return (
                <div
                  key={item.id}
                  className={`box-border w-1/2 sm:w-1/4 lg:w-[calc(100%/7)] flex flex-col items-center text-center px-2 lg:px-3
                              ${!isLastMobile && !isLastItem ? "border-r border-[#e2d5c3]/60" : "border-r-0"} 
                              ${!isLastTablet && !isLastItem ? "sm:border-r sm:border-[#e2d5c3]/60" : "sm:border-r-0"} 
                              ${!isLastDesktop && !isLastItem ? "lg:border-r lg:border-[#e2d5c3]/60" : "lg:border-r-0"}
                  `}
                >
                  <div className="relative size-10 shrink-0 mb-3">
                    <Image
                      src={item.icon ?? ""}
                      alt={(item.vi ?? "").replace("\n", " ")}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#0a1b35] leading-snug flex items-center justify-center whitespace-pre-line">
                    {item.vi}
                  </h3>

                  <p className="text-[11px] sm:text-xs italic text-[#0a1b35]/90 mt-2 leading-normal flex items-start justify-center whitespace-pre-line">
                    {item.en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
