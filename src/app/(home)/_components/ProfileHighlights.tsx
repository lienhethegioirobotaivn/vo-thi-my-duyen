import Image from "next/image";

export function ProfileHighlights() {
  const highlights = [
    {
      vi: "Thạc sĩ Quản trị Kinh doanh",
      en: "Master of Business Administration (MBA)",
    },
    {
      vi: "Hơn 10 năm kinh nghiệm giảng dạy & đào tạo",
      en: "Over 10 years of teaching & training experience",
    },
    {
      vi: "Giảng viên, diễn giả, chuyên gia đào tạo & cố vấn chiến lược",
      en: "Lecturer, speaker, trainer & strategic advisor",
    },
    {
      vi: "Đã đồng hành cùng hơn 2000+ doanh nghiệp & tổ chức",
      en: "Has partnered with 2000+ enterprises & organizations",
    },
    {
      vi: "Chuyên gia phát triển năng lực lãnh đạo, quản trị & xây dựng văn hóa doanh nghiệp",
      en: "Expert in leadership development, management & corporate culture",
    },
    {
      vi: "Diễn giả quốc tế, làm việc với nhiều tổ chức trong và ngoài nước",
      en: "International speaker, working with local & global organizations",
    },
    {
      vi: "Diễn giả truyền cảm hứng hàng đầu về phụ nữ, giáo dục & thế hệ trẻ",
      en: "Top inspirational speaker on women, education & youth",
    },
    {
      vi: "Phong cách truyền đạt: gần gũi – thực tiễn – truyền cảm hứng",
      en: "Speaking style: engaging – practical – inspiring",
    },
  ];

  const column1 = [highlights[0], highlights[2], highlights[4], highlights[6]];
  const column2 = [highlights[1], highlights[3], highlights[5], highlights[7]];

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:pt-24 lg:pb-16">
      <div className="mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="sm:col-span-5 lg:col-span-8 xl:col-span-3 w-full flex justify-center lg:justify-start">
            <div className="relative w-full aspect-3/4 rounded-3xl overflow-hidden shadow-lg bg-[#0a1b35]">
              <Image
                src="/home/vo-thi-my-duyen.jpg"
                alt="Võ Thị Mỹ Duyên"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          <div className="sm:col-span-7 lg:col-span-8 xl:col-span-9 flex flex-col w-full">
            <div className="hidden lg:flex items-center w-full gap-6 mb-8">
              <h2 className="shrink-0 flex items-center gap-2 text-xl sm:text-2xl font-bold text-[#0a1b35]">
                <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                  HỒ SƠ NỔI BẬT
                </span>
                <span className="mt-1 text-gray-500 font-normal text-lg sm:text-xl italic">
                  /
                </span>
                <span className="mt-1 text-gray-500 font-normal text-lg sm:text-xl italic">
                  PROFILE HIGHLIGHTS
                </span>
              </h2>
              <div className="grow h-px bg-[#e2d5c3] hidden sm:block" />
            </div>
            <div className="flex lg:hidden items-center justify-center w-full gap-1 mb-8">
              <h2 className="flex flex-col items-center text-center text-3xl sm:text-3xl font-bold text-[#0a1b35]">
                <span style={{ fontFamily: "var(--font-playfair), serif" }}>
                  HỒ SƠ NỔI BẬT
                </span>
                <span className="mt-0.5 text-gray-500 font-normal text-lg sm:text-xl italic">
                  PROFILE HIGHLIGHTS
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-6">
                {column1.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full border border-[#c29b57] flex items-center justify-center mt-0.5 text-[#c29b57]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="w-2.5 h-2.5"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[15px] lg:text-sm font-semibold text-[#0a1b35] leading-relaxed">
                        {item.vi}
                      </p>
                      <p className="text-[13px] lg:text-xs italic text-[#0a1b35]/90 mt-0.5 leading-relaxed">
                        {item.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {column2.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="shrink-0 w-5 h-5 rounded-full border border-[#c29b57] flex items-center justify-center mt-0.5 text-[#c29b57]">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="w-2.5 h-2.5"
                      >
                        <path
                          d="M20 6L9 17L4 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[15px] lg:text-sm font-semibold text-[#0a1b35] leading-relaxed">
                        {item.vi}
                      </p>
                      <p className="text-[13px] lg:text-xs italic text-[#0a1b35]/90 mt-0.5 leading-relaxed">
                        {item.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
