import { prisma } from "@/lib/prisma";
import { StrategicClientsClient } from "./StrategicClientsClient";

export async function StrategicClients() {
  const config = await prisma.clientConfig.findFirst({
    include: {
      tabs: {
        orderBy: { order: "asc" },
        include: { logos: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!config || !config.tabs || config.tabs.length === 0) return null;

  const titleVi = config.titleVi || "";
  const titleEn = config.titleEn || "";
  const footerVi = config.footerVi || "";
  const footerEn = config.footerEn || "";

  const tabs = config.tabs.map((t) => ({
    id: t.tabKey,
    vi: t.vi || "",
    en: t.en || "",
  }));

  const clientData: Record<string, string[]> = {};
  config.tabs.forEach((t) => {
    clientData[t.tabKey] = t.logos.map((l) => l.src || "");
  });

  return (
    <StrategicClientsClient
      titleVi={titleVi}
      titleEn={titleEn}
      footerVi={footerVi}
      footerEn={footerEn}
      tabs={tabs}
      clientData={clientData}
    />
  );
}
