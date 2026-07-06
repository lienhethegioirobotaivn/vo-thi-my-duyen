import Image from "next/image";

export function Stats() {
  const statsData = [
    {
      value: "50+",
      titleVi: "Trường đại học\ntrong & ngoài nước",
      titleEn: "Universities\ndomestic & international",
      iconSrc: "/home/11.png",
    },
    {
      value: "2000+",
      titleVi: "Doanh nghiệp\nđã đồng hành",
      titleEn: "Enterprises\nhave partnered",
      iconSrc: "/home/3.png",
    },
    {
      value: "HÀNG TRĂM NGHÌN",
      titleVi: "Người lắng nghe &\ntruyền cảm hứng",
      titleEn: "Hundreds of thousands\ninspired",
      iconSrc: "/home/5.png",
    },
    {
      value: "NHIỀU NĂM",
      titleVi: "Kinh nghiệm giảng dạy\n& truyền thông",
      titleEn: "Years of teaching &\nmedia experience",
      iconSrc: "/home/23.png",
    },
  ];

  return (
    <section className="w-full bg-[#16203a] py-12">
      <div className="mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 lg:divide-y-0 lg:divide-x lg:divide-white/10 w-full mx-auto">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex lg:justify-center items-start gap-4 lg:gap-3 lg:px-4 first:lg:pl-0 last:lg:pr-0 pt-6 lg:pt-0 first:pt-0"
            >
              <div className="relative size-16 lg:size-13 shrink-0 mt-1">
                <Image
                  src={stat.iconSrc}
                  alt={stat.value}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-[#c29b57] text-2xl lg:text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-white text-base sm:text-sm font-medium leading-[1.4] mb-1.5 whitespace-pre-line">
                  {stat.titleVi}
                </span>
                <span className="text-[#a0aabf] text-sm sm:text-xs italic leading-[1.4] whitespace-pre-line">
                  {stat.titleEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
