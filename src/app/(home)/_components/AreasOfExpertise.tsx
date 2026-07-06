import Image from "next/image";

export function AreasOfExpertise() {
  const expertiseItems = [
    {
      vi: "Kỹ năng giao tiếp & thuyết trình",
      en: "Communication & Presentation",
      icon: "/home/26.png",
    },
    {
      vi: "Lãnh đạo & phát triển bản thân",
      en: "Leadership & Personal Development",
      icon: "/home/9.png",
    },
    {
      vi: "Văn hóa & giá trị Việt Nam",
      en: "Vietnamese Culture & Values",
      icon: "/home/11.png",
    },
    {
      vi: "Quản trị & vận hành doanh nghiệp",
      en: "Management & Business Operations",
      icon: "/home/3.png",
    },
    {
      vi: "Thương hiệu cá nhân & truyền thông",
      en: "Personal Branding & Communication",
      icon: "/home/38.png",
    },
    {
      vi: "Giáo dục & phát triển thế hệ trẻ",
      en: "Education & Youth Development",
      icon: "/home/5.png",
    },
    {
      vi: "Phụ nữ & truyền cảm hứng",
      en: "Women & Inspiration",
      icon: "/home/34.png",
    },
  ];

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16">
      <div className="mx-auto px-6 lg:px-16">
        <div className="border border-[#e2d5c3] rounded-2xl bg-white px-4 py-8 md:py-10 lg:p-8 shadow-sm">
          <div className="hidden lg:flex items-center justify-center w-full gap-6 mb-10">
            <div className="h-px bg-[#e2d5c3] grow" />
            <h2 className="shrink-0 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center text-xl sm:text-2xl font-bold text-[#0a1b35]">
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                CÁC MẢNG CHUYÊN MÔN
              </span>
              <span className="mt-1 text-gray-500 font-normal text-base sm:text-xl italic">
                /
              </span>
              <span className="mt-1 text-gray-500 font-normal text-base sm:text-xl italic">
                AREAS OF EXPERTISE
              </span>
            </h2>
            <div className="h-px bg-[#e2d5c3] grow" />
          </div>
          <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
            <h2 className="flex flex-col items-center text-center text-[1.4rem] sm:text-2xl font-bold text-[#0a1b35]">
              <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                CÁC MẢNG CHUYÊN MÔN
              </span>
              <span className="mt-0.5 text-gray-500 font-normal text-base sm:text-lg italic">
                AREAS OF EXPERTISE
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-y-8 lg:gap-y-0 lg:divide-x lg:divide-[#e2d5c3]/60">
            {expertiseItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center px-2 lg:px-3"
              >
                <div className="relative size-14 shrink-0 mb-3">
                  <Image
                    src={item.icon}
                    alt={item.vi.replace("\n", " ")}
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
