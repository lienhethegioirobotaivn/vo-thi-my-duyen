import Link from "next/link";
import { prisma } from "@/lib/prisma";

export async function Hero() {
  const dbContent = await prisma.heroConfig.findFirst({
    include: {
      buttons: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });

  const topSubtitle = dbContent?.topSubtitle || "";
  const mainTitleLine1 = dbContent?.mainTitleLine1 || "";
  const mainTitleLine2 = dbContent?.mainTitleLine2 || "";
  const engSubtitle = dbContent?.engSubtitle || "";
  const descVi = dbContent?.descVi || "";
  const descEn = dbContent?.descEn || "";
  const bgUrl = dbContent?.bgUrl || "";
  const buttons = dbContent?.buttons || [];

  return (
    <section
      className="relative w-full bg-white flex items-center lg:min-h-screen bg-no-repeat bg-center bg-cover md:bg-(image:--bg-url)"
      style={
        {
          "--bg-url": bgUrl ? `url('${bgUrl}')` : "none",
        } as React.CSSProperties
      }
    >
      <div className="w-full mx-auto px-6 lg:px-20 relative z-10 py-12">
        <div className="max-w-xl md:max-w-2xl text-left flex flex-col items-start">
          {topSubtitle && (
            <span
              className="text-[#c29b57] text-3xl sm:text-4xl lg:text-5xl mb-3 block font-normal leading-none"
              style={{ fontFamily: "var(--font-great-vibes), cursive" }}
            >
              {topSubtitle}
            </span>
          )}

          {(mainTitleLine1 || mainTitleLine2) && (
            <h1
              className="text-[#0a1b35] text-[2rem] sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-[1.3] lg:leading-[1.15] mb-4 text-left"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {mainTitleLine1 && (
                <span className="block">{mainTitleLine1}</span>
              )}
              {mainTitleLine2 && (
                <span className="block">{mainTitleLine2}</span>
              )}
            </h1>
          )}

          {engSubtitle && (
            <div className="text-sm sm:text-base lg:text-xl font-semibold italic text-[#c29b57] uppercase mb-4 text-left">
              {engSubtitle}
            </div>
          )}

          {(descVi || descEn) && (
            <div className="space-y-2 mb-8 text-left">
              {descVi && (
                <p className="text-sm sm:text-base text-[#0a1b35] font-medium leading-relaxed lg:max-w-lg">
                  {descVi}
                </p>
              )}
              {descEn && (
                <p className="text-xs sm:text-sm text-[#0a1b35]/70 italic leading-relaxed lg:max-w-lg">
                  {descEn}
                </p>
              )}
            </div>
          )}

          {buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {buttons.map((btn, index) => (
                <Link
                  key={index}
                  href={btn.href || "#"}
                  className={`flex flex-col items-center justify-center px-8 py-3 rounded-full text-center transition-all duration-300 min-w-50 ${
                    btn.primary
                      ? "bg-[#0a1b35] text-white hover:bg-[#0a1b35]/80 shadow-md"
                      : "bg-transparent text-[#c29b57] border border-[#c29b57] hover:bg-[#c29b57]/15"
                  }`}
                >
                  <span className="text-xs font-bold">{btn.textVi || ""}</span>
                  <span
                    className={`text-[10px] uppercase mt-0.5 ${
                      btn.primary ? "text-white/70" : "text-[#c29b57]/80"
                    }`}
                  >
                    {btn.textEn || ""}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
