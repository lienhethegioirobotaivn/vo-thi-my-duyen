import { prisma } from "@/lib/prisma";
import { ActivityHighlightsCarousel } from "./ActivityHighlightsCarousel";

export async function ActivityHighlights() {
  const activityConfig = await prisma.activityConfig.findFirst({
    include: {
      items: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (
    !activityConfig ||
    !activityConfig.items ||
    activityConfig.items.length === 0
  )
    return null;

  const titleVi = activityConfig.titleVi || "";
  const titleEn = activityConfig.titleEn || "";

  const imagesList = activityConfig.items.map((item) => item.src || "");

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto px-6 lg:px-16 relative">
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
          <div className="h-px bg-[#e2d5c3] grow" />
        </div>

        <ActivityHighlightsCarousel mockImages={imagesList} />
      </div>
    </section>
  );
}
