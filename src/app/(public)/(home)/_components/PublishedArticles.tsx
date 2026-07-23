"use client";

import { useState, useEffect, useCallback, CSSProperties } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  publisher: string;
  link: string;
  img: string;
  pages?: string[];
}

export interface PublishedArticlesProps {
  row1Articles?: Article[];
  row2Articles?: Article[];
}

const categories = [
  "Tất cả",
  "Lãnh đạo",
  "Khởi nghiệp",
  "AI",
  "Giáo dục",
  "Thương hiệu",
];

const mockPagesSample = [
  "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80",
  "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200&q=80",
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&q=80",
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80",
  "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&q=80",
];

const mockRow1Articles: Article[] = [
  {
    id: "1",
    title: "Tư duy chiến lược cho startup trong thời đại biến động",
    description:
      "Trong một thế giới thay đổi nhanh chóng, startup cần nhiều hơn đam mê - đó là tư duy chiến lược linh hoạt...",
    category: "Khởi nghiệp",
    date: "20/05/2024",
    publisher: "Đã xuất bản trên chuyên trang đối tác",
    link: "#",
    img: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80",
    pages: mockPagesSample,
  },
  {
    id: "2",
    title: "Lãnh đạo bằng sự thấu hiểu và trao quyền",
    description:
      "Sự thấu hiểu là nền tảng của niềm tin. Trao quyền là chìa khóa để đội ngũ tự chủ và phát triển bền vững.",
    category: "Lãnh đạo",
    date: "12/04/2024",
    publisher: "Published on partner media",
    link: "#",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    pages: mockPagesSample,
  },
  {
    id: "3",
    title: "Xây dựng thương hiệu cá nhân xuyên biên giới",
    description:
      "Thương hiệu cá nhân không chỉ là hình ảnh, đó là câu chuyện, giá trị và tác động bạn tạo ra mỗi ngày.",
    category: "Thương hiệu",
    date: "28/05/2024",
    publisher: "Đã xuất bản trên chuyên trang đối tác",
    link: "#",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    pages: mockPagesSample,
  },
];

const mockRow2Articles: Article[] = [
  {
    id: "4",
    title: "AI tạo sinh: Người đồng hành nâng tầm hiệu suất",
    description:
      "Khi biết cách đặt đúng câu hỏi, AI có thể trở thành trợ lý đắc lực giúp chúng ta sáng tạo và tối ưu công việc.",
    category: "AI",
    date: "07/05/2024",
    publisher: "Published on partner media",
    link: "#",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    pages: mockPagesSample,
  },
  {
    id: "5",
    title: "Giáo dục khai phóng cho thế hệ tương lai",
    description:
      "Giáo dục không chỉ dạy kiến thức, mà quan trọng hơn là giúp con người hiểu mình, hiểu người và hiểu thế giới.",
    category: "Giáo dục",
    date: "18/02/2024",
    publisher: "Đã xuất bản trên chuyên trang đối tác",
    link: "#",
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    pages: mockPagesSample,
  },
  {
    id: "6",
    title: "Phụ nữ chọn con đường riêng và tỏa sáng",
    description:
      "Khi phụ nữ tin vào giá trị của chính mình, họ sẽ tạo ra những thay đổi tích cực cho gia đình và xã hội.",
    category: "Lãnh đạo",
    date: "05/01/2024",
    publisher: "Published on partner media",
    link: "#",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    pages: mockPagesSample,
  },
];

export function PublishedArticles({
  row1Articles = mockRow1Articles,
  row2Articles = mockRow2Articles,
}: PublishedArticlesProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const filteredRow1 =
    selectedCategory === "Tất cả"
      ? row1Articles
      : row1Articles.filter((item) => item.category === selectedCategory);

  const filteredRow2 =
    selectedCategory === "Tất cả"
      ? row2Articles
      : row2Articles.filter((item) => item.category === selectedCategory);

  return (
    <section className="w-full bg-[#fbfbfa] px-6 lg:px-16 py-12 lg:py-16 overflow-hidden">
      <div className="mx-auto relative mb-8 lg:mb-10">
        <div className="flex flex-col items-center justify-center w-full gap-2 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a1b35]">
            <span style={{ fontFamily: "var(--font-playfair), serif" }}>
              CÁC BÀI VIẾT ĐÃ XUẤT BẢN
            </span>
          </h2>
          <span className="text-gray-500 font-normal text-sm sm:text-base italic">
            Published Articles
          </span>
          <p className="mt-2 text-[13px] sm:text-sm text-[#0a1b35]/80 max-w-2xl leading-relaxed">
            Tổng hợp những bài viết chuyên môn, góc nhìn và chia sẻ đã được xuất
            bản trên các kênh truyền thông, báo chí và chuyên trang đối tác.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#c29b57] text-white border-[#c29b57] shadow-sm"
                    : "bg-white text-[#0a1b35] border-[#e2d5c3] hover:border-[#c29b57] hover:text-[#c29b57]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 w-full">
        <ArticleCarouselRow
          key={`row1-${selectedCategory}`}
          articles={filteredRow1}
          onRead={setActiveArticle}
        />
        <ArticleCarouselRow
          key={`row2-${selectedCategory}`}
          articles={filteredRow2}
          onRead={setActiveArticle}
        />
      </div>

      {activeArticle && (
        <FlipbookModal
          article={activeArticle}
          onClose={() => setActiveArticle(null)}
        />
      )}
    </section>
  );
}

function ArticleCarouselRow({
  articles,
  onRead,
}: {
  articles: Article[];
  onRead: (article: Article) => void;
}) {
  const buildBase = (arr: Article[]) => {
    if (arr.length === 0) return [];
    let list: Article[] = [];
    while (list.length < 3) {
      list = [...list, ...arr];
    }
    return list;
  };

  const baseArticles = buildBase(articles);
  const baseLength = baseArticles.length;

  const [currentIndex, setCurrentIndex] = useState(baseLength);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const extendedArticles = [...baseArticles, ...baseArticles, ...baseArticles];

  const handlePrev = () => {
    if (!isTransitioning || baseLength === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isTransitioning || baseLength === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (baseLength === 0) return;

    if (currentIndex === baseLength * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(baseLength);
      }, 300);
      return () => clearTimeout(timer);
    }

    if (currentIndex === baseLength - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(baseLength * 2 - 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, baseLength]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (baseLength === 0) return null;

  return (
    <div className="relative w-full px-11 lg:px-13">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full border border-[#e2d5c3] bg-white text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="w-full overflow-hidden">
        <div
          style={
            {
              transform: `translateX(calc(-${currentIndex} * (100% + var(--gap-offset)) / var(--items-per-screen)))`,
              transition: isTransitioning
                ? "transform 300ms ease-in-out"
                : "none",
            } as CSSProperties
          }
          className="flex gap-4 md:gap-6 [--items-per-screen:1] [--gap-offset:16px] sm:[--items-per-screen:2] md:[--items-per-screen:2] md:[--gap-offset:24px] lg:[--items-per-screen:3]"
        >
          {extendedArticles.map((article, index) => (
            <ArticleCard
              key={`${article.id}-${index}`}
              article={article}
              onRead={() => onRead(article)}
            />
          ))}
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full border border-[#e2d5c3] bg-white text-[#0a1b35] hover:bg-[#c29b57] hover:text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

function ArticleCard({
  article,
  onRead,
}: {
  article: Article;
  onRead: () => void;
}) {
  return (
    <div className="shrink-0 w-full sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/3)] bg-white rounded-lg border border-[#e2d5c3]/70 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow overflow-hidden">
      <div className="relative w-full aspect-video overflow-hidden mb-4">
        <Image
          src={article.img}
          alt={article.title}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-3 left-3 bg-[#c29b57] text-white text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md shadow-sm">
          {article.category}
        </div>
      </div>
      <div className="px-4 sm:px-5 pb-2 sm:pb-2">
        <h3
          className="text-base sm:text-lg font-bold text-[#0a1b35] line-clamp-2 leading-snug"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {article.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-2 leading-relaxed">
          {article.description}
        </p>

        <div className="mt-2 pt-2 border-t border-[#e2d5c3]/50 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-gray-400 gap-2">
          <span className="line-clamp-1">
            {article.date} <span className="mx-1">|</span> {article.publisher}
          </span>
          <button
            onClick={onRead}
            className="shrink-0 border border-[#e2d5c3] text-[#0a1b35] hover:bg-[#c29b57] hover:border-[#c29b57] hover:text-white px-3 py-1 rounded-md transition-colors cursor-pointer"
          >
            Đọc bài viết
          </button>
        </div>
      </div>
    </div>
  );
}

function FlipbookModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const pages =
    article.pages && article.pages.length > 0
      ? article.pages
      : [article.img, article.img];

  const [currentPage, setCurrentPage] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isDoublePage, setIsDoublePage] = useState(true);

  const step = isDoublePage ? 2 : 1;
  const totalPages = pages.length;

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - step));
  }, [step]);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev + step >= totalPages) return prev;
      return prev + step;
    });
  }, [step, totalPages]);

  useEffect(() => {
    const handleResize = () => {
      setIsDoublePage(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevPage();
      if (e.key === "ArrowRight") handleNextPage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextPage, handlePrevPage, onClose]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const leftPageIndex = currentPage;
  const rightPageIndex = isDoublePage ? currentPage + 1 : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-2 sm:p-8">
      <div className="relative w-full h-full max-h-[90vh] flex flex-col bg-[#0a1b35] rounded-2xl overflow-hidden shadow-2xl border border-[#e2d5c3]/30">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a1b35] border-b border-[#e2d5c3]/20 text-white">
          <div className="flex items-center gap-3 truncate pr-4">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#c29b57] text-white shrink-0">
              {article.category}
            </span>
            <h3
              className="text-sm sm:text-base font-bold text-white truncate"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              {article.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg p-1">
              <button
                onClick={handleZoomOut}
                className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <ZoomOut className="size-4" />
              </button>
              <span className="text-xs px-1 text-white/70 font-mono">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <ZoomIn className="size-4" />
              </button>
            </div>

            <div className="text-xs text-white/70 px-2 py-1 bg-white/10 rounded-lg font-mono">
              {isDoublePage
                ? `${leftPageIndex + 1}${
                    rightPageIndex && rightPageIndex < totalPages
                      ? `-${rightPageIndex + 1}`
                      : ""
                  } / ${totalPages}`
                : `${leftPageIndex + 1} / ${totalPages}`}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-[#c29b57] text-white transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 bg-[#15243b] overflow-hidden flex items-center justify-center p-2 sm:p-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 size-8 sm:size-10 rounded-full bg-gray-800 hover:bg-[#c29b57] disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
          >
            <ChevronLeft className="size-5 sm:size-6" />
          </button>

          <div
            className="flex items-center justify-center transition-transform duration-200 ease-out max-w-full"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <div className="relative flex bg-white shadow-2xl rounded-lg overflow-hidden border border-[#e2d5c3]/40 max-h-[60vh] sm:max-h-[70vh] max-w-full">
              <div className="relative w-[calc(100vw-5rem)] max-w-[320px] sm:w-100 md:w-112.5 aspect-3/4 bg-neutral-100 flex items-center justify-center border-r border-neutral-200">
                {pages[leftPageIndex] ? (
                  <Image
                    src={pages[leftPageIndex]}
                    alt={`Page ${leftPageIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <span className="text-xs text-neutral-400">Trang trống</span>
                )}
                <div className="absolute inset-y-0 right-0 w-8 bg-linear-to-l from-black/15 to-transparent pointer-events-none" />
              </div>

              {isDoublePage && (
                <div className="relative w-[calc(100vw-5rem)] max-w-[320px] sm:w-100 md:w-112.5 aspect-3/4 bg-neutral-100 flex items-center justify-center">
                  {rightPageIndex !== null && pages[rightPageIndex] ? (
                    <Image
                      src={pages[rightPageIndex]}
                      alt={`Page ${rightPageIndex + 1}`}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-700 gap-2">
                      <span className="text-sm">Kết thúc</span>
                    </div>
                  )}
                  <div className="absolute inset-y-0 left-0 w-8 bg-linear-to-r from-black/15 to-transparent pointer-events-none" />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage + step >= totalPages}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 size-8 sm:size-10 rounded-full bg-gray-800 hover:bg-[#c29b57] disabled:opacity-30 disabled:hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm"
          >
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </div>

        <div className="px-6 py-3 bg-[#0a1b35] border-t border-[#e2d5c3]/20 flex items-center justify-between text-xs text-white/60">
          <span className="truncate max-w-md">
            {article.publisher} • {article.date}
          </span>
          <span className="hidden sm:inline">
            Dùng phím mũi tên [←] [→] để lật trang, [Esc] để thoát
          </span>
        </div>
      </div>
    </div>
  );
}
