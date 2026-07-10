import { prisma } from "@/lib/prisma";
import { NavbarClient } from "./NavbarClient";

export async function Navbar() {
  const config = await prisma.navbarConfig.findFirst({
    include: { navItems: { orderBy: { order: "asc" } } },
  });

  const logo = config?.logo || "";
  const nameVi = config?.nameVi || "";
  const nameEn = config?.nameEn || "";
  const subtitle1Vi = config?.subtitle1Vi || "";
  const subtitle1En = config?.subtitle1En || "";
  const bookTextVi = config?.bookTextVi || "";
  const bookTextEn = config?.bookTextEn || "";
  const bookHref = config?.bookHref || "";

  const navItems =
    config?.navItems && config.navItems.length > 0
      ? config.navItems.map((i) => ({
          labelVi: i.labelVi || "",
          labelEn: i.labelEn || "",
          href: i.href || "",
        }))
      : [{ labelVi: "", labelEn: "", href: "" }];

  return (
    <NavbarClient
      logo={logo}
      nameVi={nameVi}
      nameEn={nameEn}
      subtitle1Vi={subtitle1Vi}
      subtitle1En={subtitle1En}
      bookTextVi={bookTextVi}
      bookTextEn={bookTextEn}
      bookHref={bookHref}
      navItems={navItems}
    />
  );
}
