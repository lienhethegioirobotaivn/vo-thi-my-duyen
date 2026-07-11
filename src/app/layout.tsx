import type { Metadata } from "next";
import { Playfair_Display, Montserrat, Great_Vibes } from "next/font/google";
import "./globals.css";
import { prisma } from "@/lib/prisma";

const playfair = Playfair_Display({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["vietnamese", "latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const dbMeta = await prisma.metadata.findFirst();

  const title =
    dbMeta?.title ||
    "ThS. Võ Thị Mỹ Duyên | Giảng viên, Diễn giả & Cố vấn chiến lược";
  const description =
    dbMeta?.description ||
    "Khám phá hành trình và dịch vụ của ThS. Võ Thị Mỹ Duyên - Giảng viên chuyên nghiệp, Diễn giả truyền cảm hứng và Cố vấn chiến lược uy tín cho doanh nghiệp.";
  const keywordsList = dbMeta?.keywords
    ? dbMeta.keywords.split(",").map((k) => k.trim())
    : [
        "Võ Thị Mỹ Duyên",
        "ThS Võ Thị Mỹ Duyên",
        "Diễn giả Võ Thị Mỹ Duyên",
        "Cố vấn chiến lược",
        "Giảng viên",
      ];
  const ogTitle = dbMeta?.ogTitle || title;
  const ogDesc = dbMeta?.ogDesc || description;
  const ogImage =
    dbMeta?.ogImage ||
    "https://www.vothimyduyen.com/anh_se_them_vao_tu_admin_page.jpg";
  const siteUrl = dbMeta?.siteUrl || "https://www.vothimyduyen.com";

  const favicon = dbMeta?.favicon ? dbMeta.favicon : `${siteUrl}/favicon.ico`;

  return {
    title,
    description,
    keywords: keywordsList,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      url: siteUrl,
      siteName: "ThS. Võ Thị Mỹ Duyên",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-white text-[#0a1b35]"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
