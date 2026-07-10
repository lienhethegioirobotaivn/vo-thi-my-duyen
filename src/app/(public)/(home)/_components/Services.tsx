import { prisma } from "@/lib/prisma";
import { ServicesCarousel } from "./ServicesCarousel";

export async function Services() {
  const servicesConfig = await prisma.servicesConfig.findFirst({
    include: {
      items: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  if (
    !servicesConfig ||
    !servicesConfig.items ||
    servicesConfig.items.length === 0
  )
    return null;

  const titleVi = servicesConfig.titleVi || "";
  const titleEn = servicesConfig.titleEn || "";

  const formattedServices = servicesConfig.items.map((item) => ({
    vi: item.vi || "",
    en: item.en || "",
    img: item.img || "",
  }));

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto px-6 lg:px-16 relative">
        <div className="hidden lg:flex items-center justify-center w-full gap-6 mb-12">
          <div className="h-px bg-[#e2d5c3] grow" />
          <h2 className="shrink-0 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center text-xl sm:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              {titleVi}
            </span>
            <span className="mt-1 text-gray-500 font-normal text-base sm:text-xl italic">
              / {titleEn}
            </span>
          </h2>
          <div className="h-px bg-[#e2d5c3] grow" />
        </div>
        <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
          <h2 className="flex flex-col items-center text-center text-2xl sm:text-2xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              {titleVi}
            </span>
            <span className="mt-1 text-gray-500 font-normal text-base sm:text-lg italic">
              / {titleEn}
            </span>
          </h2>
        </div>

        <ServicesCarousel baseServices={formattedServices} />
      </div>
    </section>
  );
}
