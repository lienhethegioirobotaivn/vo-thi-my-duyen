import { prisma } from "@/lib/prisma";
import { FooterClient } from "./FooterClient";

export async function Footer() {
  const config = await prisma.footerConfig.findFirst();

  const data = {
    contactTitleVi: config?.contactTitleVi || "",
    contactTitleEn: config?.contactTitleEn || "",
    phone: config?.phone || "",
    email: config?.email || "",
    website: config?.website || "",
    addressVi: config?.addressVi || "",
    addressEn: config?.addressEn || "",
    bookTitleVi: config?.bookTitleVi || "",
    bookTitleEn: config?.bookTitleEn || "",
    newsletterTitleVi: config?.newsletterTitleVi || "",
    newsletterTitleEn: config?.newsletterTitleEn || "",
    newsletterDescVi: config?.newsletterDescVi || "",
    newsletterDescEn: config?.newsletterDescEn || "",
    copyrightText: config?.copyrightText || "",
    sloganText: config?.sloganText || "",
  };

  return <FooterClient data={data} />;
}
