import Image from "next/image";
import Link from "next/link";

export function ConnectionsAndMedia() {
  const countries = [
    { vi: "Việt Nam", en: "Vietnam", flag: "/home/vietnam.jpg" },
    { vi: "Hoa Kỳ", en: "USA", flag: "/home/usa.png" },
    { vi: "Singapore", en: "Singapore", flag: "/home/singapore.jpg" },
    { vi: "Hàn Quốc", en: "South Korea", flag: "/home/korea.jpg" },
    { vi: "Nhật Bản", en: "Japan", flag: "/home/japan.png" },
    { vi: "Thái Lan", en: "Thailand", flag: "/home/thailand.png" },
    { vi: "Malaysia", en: "Malaysia", flag: "/home/malaysia.png" },
    { vi: "Úc", en: "Australia", flag: "/home/australia.jpg" },
    { vi: "Đức", en: "Germany", flag: "/home/germany.png" },
    { vi: "Pháp", en: "France", flag: "/home/france.png" },
  ];

  const highlights = [
    {
      titleVi: "DIỄN GIẢ\nTEDx TALKS",
      titleEn: "TEDx SPEAKER",
      img: "/highlight_1.jpg",
    },
    {
      titleVi: "DIỄN GIẢ DIỄN ĐÀN\nKINH TẾ MÙA THU",
      titleEn: "AUTUMN ECONOMIC FORUM SPEAKER",
      img: "/highlight_2.jpg",
    },
    {
      titleVi: "DOANH NHÂN\nTP.HCM TIÊU BIỂU 2024",
      titleEn: "OUTSTANDING ENTREPRENEUR\nHCMC 2024",
      img: "/highlight_3.jpg",
    },
    {
      titleVi: "ĐÀO TẠO TẠI HƠN 50 TRƯỜNG\nĐẠI HỌC TRONG & NGOÀI NƯỚC",
      titleEn: "TRAINED AT OVER 50 UNIVERSITIES\nAT HOME & ABROAD",
      img: "/highlight_4.jpg",
    },
  ];

  const tvStations = [
    "/home/Logo-THVL-_-VTALK.png",
    "/home/HTV-VTALK-768x233.jpeg",
    "/home/logo_vov.png",
    "/home/logo-voh-300x166.png",
    "/home/LOGO-BPTV.png",
  ];

  const pressItems = [
    { logo: "/home/DoanhNhanSaiGon.png", article: "/article_1.jpg" },
    {
      logo: "/home/logo_tuoi_tre.png",
      article: "/article_2.jpg",
    },
    {
      logo: "/home/logo_thanh_nien.png",
      article: "/article_3.jpg",
    },
    {
      logo: "/home/logo_phu_nu.png",
      article: "/article_4.jpg",
    },
    {
      logo: "/home/sai_gon_giai_phong.png",
      article: "/article_5.jpg",
    },
    { logo: "/home/cafebiz_vtalk-768x233.png", article: "/article_6.jpg" },
  ];

  return (
    <section className="w-full bg-[#fbfbfa] py-12 lg:py-16 flex flex-col gap-16 lg:gap-24">
      <div className="w-full mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center mb-16">
          <div className="lg:col-span-4 flex flex-col">
            <h2
              className="text-xl sm:text-2xl font-bold text-[#0a1b35] mb-1 uppercase text-center lg:text-left"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              KẾT NỐI & HỢP TÁC QUỐC TẾ
            </h2>
            <h3 className="text-gray-500 text-sm sm:text-base uppercase mb-4 italic text-center lg:text-left">
              / INTERNATIONAL CONNECTIONS <br /> & COLLABORATIONS
            </h3>
            <p className="text-sm text-[#0a1b35] leading-relaxed mb-2 font-medium">
              Tích cực kết nối, hợp tác và tham gia các diễn đàn quốc tế về giáo
              dục, khởi nghiệp, phát triển bền vững và bình đẳng giới.
            </p>
            <p className="text-[12.5px] italic text-[#0a1b35]/90 leading-relaxed">
              Actively connecting, collaborating and participating in
              international forums on education, entrepreneurship, sustainable
              development and gender equality.
            </p>
          </div>

          <div className="lg:col-span-4 relative w-full aspect-video lg:aspect-auto lg:h-62.5 opacity-70">
            <Image
              src="/home/ConnectionsAndMedia.png"
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
              {countries.map((country, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-10 h-7 mb-2 shadow-sm border border-gray-100">
                    <Image
                      src={country.flag}
                      alt={country.en}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16 lg:mb-24">
          {highlights.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <div className="lg:h-16 flex flex-col items-center mb-3 text-center">
                <h4 className="text-lg lg:text-sm font-bold text-[#0a1b35] whitespace-pre-line leading-tight">
                  {item.titleVi}
                </h4>
                <p className="text-sm lg:text-[10px] text-gray-500 whitespace-pre-line uppercase mt-1">
                  {item.titleEn}
                </p>
              </div>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 shadow group">
                <Image
                  src={item.img}
                  alt={item.titleVi.replace("\n", " ")}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <Link
                href="#"
                className="flex flex-col items-center border border-[#c29b57] hover:border-[#c29b57]/5 bg-[#c29b57]/5 hover:bg-[#c29b57] text-[#c29b57] hover:text-white/90 rounded-md p-2 transition-colors duration-200"
              >
                <span className="text-xs font-semibold">
                  Xem thêm / View more
                </span>
              </Link>
            </div>
          ))}
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
              {tvStations.map((src, index) => (
                <div key={index} className="relative w-16 h-8">
                  <Image
                    src={src}
                    alt={`TV Station ${index + 1}`}
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {pressItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative w-full h-8 mb-4">
                    <Image
                      src={item.logo}
                      alt={`Press Logo ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative w-full aspect-4/5 border shadow-sm">
                    <Image
                      src={item.article}
                      alt={`Article ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
