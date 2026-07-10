import { prisma } from "@/lib/prisma";
import { ConnectAndTrainingClient } from "./ConnectAndTrainingClient";

export async function ConnectAndTraining() {
  const config = await prisma.connectTrainingConfig.findFirst({
    include: {
      programs: { orderBy: { order: "asc" } },
      socials: { orderBy: { order: "asc" } },
    },
  });

  if (!config) return null;

  const trainingTitleVi = config.trainingTitleVi || "";
  const trainingTitleEn = config.trainingTitleEn || "";
  const connectTitleVi = config.connectTitleVi || "";
  const connectTitleEn = config.connectTitleEn || "";
  const fanpageTitle = config.fanpageTitle || "";
  const fanpageUrl = config.fanpageUrl || "";
  const logoIcon = config.logoIcon || "";

  const encodedUrl = encodeURIComponent(fanpageUrl);

  const programs = config.programs.map((i) => ({
    vi: i.vi || "",
    en: i.en || "",
    icon: i.icon || "",
  }));

  const socials = config.socials.map((i) => ({
    titleVi: i.titleVi || "",
    titleEn: i.titleEn || "",
    linkText: i.linkText || "",
    url: i.url || "#",
    bgColor: i.bgColor || "#1877F2",
    iconImg: i.iconImg || "",
  }));

  return (
    <ConnectAndTrainingClient
      trainingTitleVi={trainingTitleVi}
      trainingTitleEn={trainingTitleEn}
      connectTitleVi={connectTitleVi}
      connectTitleEn={connectTitleEn}
      fanpageTitle={fanpageTitle}
      encodedUrl={encodedUrl}
      logoIcon={logoIcon}
      programs={programs}
      socials={socials}
    />
  );
}
