import Link from "next/link";

export const heroContent = {
  topSubtitle: "Thắp sáng tri thức",
  mainTitleLine1: "TRUYỀN CẢM HỨNG",
  mainTitleLine2: "TẠO GIÁ TRỊ BỀN VỮNG",
  engSubtitle: "INSPIRE MINDS – EMPOWER CHANGE",
  descVi:
    "Hành trình lan tỏa tri thức và phát triển con người vì một Việt Nam vững mạnh và hạnh phúc",
  descEn:
    "A journey of sharing knowledge and developing people for a strong and happy Vietnam",
  buttons: [
    {
      textVi: "ĐẶT LỊCH DIỄN GIẢ NGAY",
      textEn: "BOOK THE SPEAKER NOW",
      primary: true,
      href: "#book",
    },
    {
      textVi: "XEM HỒ SƠ",
      textEn: "VIEW PROFILE",
      primary: false,
      href: "#profile",
    },
  ],
};

export function Hero() {
  return (
    <section className="relative w-full lg:min-h-screen bg-white bg-center bg-no-repeat bg-cover flex items-center bg-none lg:bg-[url('/home/hero.jpg')]">
      <div className="w-full mx-auto px-6 lg:px-20 relative z-10 py-12">
        <div className="max-w-xl md:max-w-2xl text-left flex flex-col items-start">
          <span
            className="text-[#c29b57] text-3xl sm:text-4xl lg:text-5xl mb-3 block font-normal leading-none"
            style={{ fontFamily: "var(--font-great-vibes), cursive" }}
          >
            {heroContent.topSubtitle}
          </span>

          <h1
            className="text-[#0a1b35] text-[2rem] sm:text-4xl lg:text-4xl xl:text-5xl font-bold leading-[1.3] lg:leading-[1.15] mb-4 text-left"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <span className="block">{heroContent.mainTitleLine1}</span>
            <span className="block">{heroContent.mainTitleLine2}</span>
          </h1>

          <div className="text-sm sm:text-base lg:text-xl font-semibold italic text-[#c29b57] uppercase mb-4 text-left">
            {heroContent.engSubtitle}
          </div>

          <div className="space-y-2 mb-8 text-left">
            <p className="text-sm sm:text-base text-[#0a1b35] font-medium leading-relaxed lg:max-w-lg">
              {heroContent.descVi}
            </p>
            <p className="text-xs sm:text-sm text-[#0a1b35]/70 italic leading-relaxed lg:max-w-lg">
              {heroContent.descEn}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {heroContent.buttons.map((btn, index) => (
              <Link
                key={index}
                href={btn.href}
                className={`flex flex-col items-center justify-center px-8 py-3 rounded-full text-center transition-all duration-300 min-w-50 ${
                  btn.primary
                    ? "bg-[#0a1b35] text-white hover:bg-[#0a1b35]/80 shadow-md"
                    : "bg-transparent text-[#c29b57] border border-[#c29b57] hover:bg-[#c29b57]/15"
                }`}
              >
                <span className="text-xs font-bold">{btn.textVi}</span>
                <span
                  className={`text-[10px] uppercase mt-0.5 ${btn.primary ? "text-white/70" : "text-[#c29b57]/80"}`}
                >
                  {btn.textEn}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
