import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminLayout } from "./_components/AdminLayout";
import { HeroForm } from "./_components/HeroForm";
import { StatsForm } from "./_components/StatsForm";
import { ProfileForm } from "./_components/ProfileForm";
import { ExpertiseForm } from "./_components/ExpertiseForm";
import { ServicesForm } from "./_components/ServicesForm";
import { ConnectionsAndMediaForm } from "./_components/ConnectionsAndMediaForm";
import { ConnectAndTrainingForm } from "./_components/ConnectAndTrainingForm";
import { ActivityHighlightsForm } from "./_components/ActivityHighlightsForm";
import { uploadAndCleanStorage } from "@/utils/supabase/storage";

interface ButtonParam {
  id?: string;
  textVi?: string | null;
  textEn?: string | null;
  href?: string | null;
  primary?: boolean | null;
  order?: number | null;
}
interface StatItemParam {
  id?: string;
  value: string | null;
  titleVi: string | null;
  titleEn: string | null;
  iconSrc: string | null;
  imageFile?: File | null;
}
interface ProfileItemParam {
  id?: string;
  vi: string | null;
  en: string | null;
}
interface ExpertiseItemParam {
  id?: string;
  vi: string | null;
  en: string | null;
  icon: string | null;
  imageFile?: File | null;
}
interface ServiceItemParam {
  id?: string;
  vi: string | null;
  en: string | null;
  img: string | null;
  imageFile?: File | null;
}
interface CountryParam {
  id?: string;
  vi: string;
  en: string;
  flag: string;
  imageFile?: File | null;
}
interface HighlightParam {
  id?: string;
  titleVi: string;
  titleEn: string;
  img: string;
  href: string;
  imageFile?: File | null;
}
interface TvParam {
  id?: string;
  src: string;
  imageFile?: File | null;
}
interface PressParam {
  id?: string;
  logo: string;
  article: string;
  logoFile?: File | null;
  articleFile?: File | null;
}
interface ProgramParam {
  id?: string;
  vi: string;
  en: string;
  icon: string;
  imageFile?: File | null;
}
interface SocialParam {
  id?: string;
  titleVi: string;
  titleEn: string;
  linkText: string;
  url: string;
  bgColor: string;
  iconImg: string;
  imageFile?: File | null;
}

interface ActivityItemParam {
  id?: string;
  src: string;
  imageFile?: File | null;
}

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function logout() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const heroData = await prisma.heroConfig.findFirst({
    include: { buttons: { orderBy: { order: "asc" } } },
  });
  const statsData = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  const profileData = await prisma.profileConfig.findFirst({
    include: { items: { orderBy: { order: "asc" } } },
  });
  const expertiseConfig = await prisma.expertiseConfig.findFirst({
    include: { items: { orderBy: { order: "asc" } } },
  });
  const servicesConfig = await prisma.servicesConfig.findFirst({
    include: { items: { orderBy: { order: "asc" } } },
  });
  const mediaConfig = await prisma.mediaConfig.findFirst({
    include: {
      countries: { orderBy: { order: "asc" } },
      highlights: { orderBy: { order: "asc" } },
      tvStations: { orderBy: { order: "asc" } },
      pressItems: { orderBy: { order: "asc" } },
    },
  });
  const connectTrainingConfig = await prisma.connectTrainingConfig.findFirst({
    include: {
      programs: { orderBy: { order: "asc" } },
      socials: { orderBy: { order: "asc" } },
    },
  });

  const activityConfig = await prisma.activityConfig.findFirst({
    include: { items: { orderBy: { order: "asc" } } },
  });

  async function updateHeroAction(
    formData: FormData,
    buttonsList: ButtonParam[],
    imageFile: File | null,
  ) {
    "use server";
    const topSubtitle = (formData.get("topSubtitle") as string) || "";
    const mainTitleLine1 = (formData.get("mainTitleLine1") as string) || "";
    const mainTitleLine2 = (formData.get("mainTitleLine2") as string) || "";
    const engSubtitle = (formData.get("engSubtitle") as string) || "";
    const descVi = (formData.get("descVi") as string) || "";
    const descEn = (formData.get("descEn") as string) || "";
    const existingHero = await prisma.heroConfig.findFirst();
    const currentBgUrl = await uploadAndCleanStorage({
      bucketName: "hero-images",
      newFile: imageFile,
      oldUrl: existingHero?.bgUrl,
    });
    if (existingHero) {
      await prisma.$transaction([
        prisma.heroButton.deleteMany({
          where: { heroConfigId: existingHero.id },
        }),
        prisma.heroConfig.update({
          where: { id: existingHero.id },
          data: {
            topSubtitle,
            mainTitleLine1,
            mainTitleLine2,
            engSubtitle,
            descVi,
            descEn,
            bgUrl: currentBgUrl,
            buttons: {
              create: buttonsList.map((btn, idx) => ({
                textVi: btn.textVi || "",
                textEn: btn.textEn || "",
                href: btn.href || "",
                primary: btn.primary || false,
                order: idx,
              })),
            },
          },
        }),
      ]);
    } else {
      await prisma.heroConfig.create({
        data: {
          topSubtitle,
          mainTitleLine1,
          mainTitleLine2,
          engSubtitle,
          descVi,
          descEn,
          bgUrl: currentBgUrl,
          buttons: {
            create: buttonsList.map((btn, idx) => ({
              textVi: btn.textVi || "",
              textEn: btn.textEn || "",
              href: btn.href || "",
              primary: btn.primary || false,
              order: idx,
            })),
          },
        },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateStatsAction(
    formData: FormData,
    statsList: StatItemParam[],
  ) {
    "use server";
    const processedStats = [];
    for (let i = 0; i < statsList.length; i++) {
      const item = statsList[i];
      let currentIconSrc = item.iconSrc;
      if (item.imageFile) {
        currentIconSrc = await uploadAndCleanStorage({
          bucketName: "stat-images",
          newFile: item.imageFile,
          oldUrl: item.id ? item.iconSrc : null,
        });
      }
      processedStats.push({
        value: item.value || "",
        titleVi: item.titleVi || "",
        titleEn: item.titleEn || "",
        iconSrc: currentIconSrc || "",
        order: i,
      });
    }
    await prisma.$transaction([
      prisma.stat.deleteMany({}),
      prisma.stat.createMany({ data: processedStats }),
    ]);
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateProfileAction(
    formData: FormData,
    itemsList: ProfileItemParam[],
    avatarFile: File | null,
  ) {
    "use server";
    const titleVi = (formData.get("titleVi") as string) || "";
    const titleEn = (formData.get("titleEn") as string) || "";
    const existingProfile = await prisma.profileConfig.findFirst();
    const currentAvatarUrl = await uploadAndCleanStorage({
      bucketName: "profile-images",
      newFile: avatarFile,
      oldUrl: existingProfile?.avatarUrl,
    });
    if (existingProfile) {
      await prisma.$transaction([
        prisma.profileItem.deleteMany({
          where: { profileConfigId: existingProfile.id },
        }),
        prisma.profileConfig.update({
          where: { id: existingProfile.id },
          data: {
            titleVi,
            titleEn,
            avatarUrl: currentAvatarUrl,
            items: {
              create: itemsList.map((item, idx) => ({
                vi: item.vi || "",
                en: item.en || "",
                order: idx,
              })),
            },
          },
        }),
      ]);
    } else {
      await prisma.profileConfig.create({
        data: {
          titleVi,
          titleEn,
          avatarUrl: currentAvatarUrl,
          items: {
            create: itemsList.map((item, idx) => ({
              vi: item.vi || "",
              en: item.en || "",
              order: idx,
            })),
          },
        },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateExpertiseAction(
    formData: FormData,
    expertiseList: ExpertiseItemParam[],
  ) {
    "use server";
    const titleVi = (formData.get("titleVi") as string) || "";
    const titleEn = (formData.get("titleEn") as string) || "";
    const processedItems = [];
    for (let i = 0; i < expertiseList.length; i++) {
      const item = expertiseList[i];
      let currentIcon = item.icon;
      if (item.imageFile) {
        currentIcon = await uploadAndCleanStorage({
          bucketName: "expertise-images",
          newFile: item.imageFile,
          oldUrl: item.id ? item.icon : null,
        });
      }
      processedItems.push({
        vi: item.vi || "",
        en: item.en || "",
        icon: currentIcon || "",
        order: i,
      });
    }
    const existingConfig = await prisma.expertiseConfig.findFirst();
    if (existingConfig) {
      await prisma.$transaction([
        prisma.expertise.deleteMany({
          where: { expertiseConfigId: existingConfig.id },
        }),
        prisma.expertiseConfig.update({
          where: { id: existingConfig.id },
          data: { titleVi, titleEn, items: { create: processedItems } },
        }),
      ]);
    } else {
      await prisma.expertiseConfig.create({
        data: { titleVi, titleEn, items: { create: processedItems } },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateServicesAction(
    formData: FormData,
    servicesList: ServiceItemParam[],
  ) {
    "use server";
    const titleVi = (formData.get("titleVi") as string) || "";
    const titleEn = (formData.get("titleEn") as string) || "";
    const processedItems = [];
    for (let i = 0; i < servicesList.length; i++) {
      const item = servicesList[i];
      let currentImg = item.img;
      if (item.imageFile) {
        currentImg = await uploadAndCleanStorage({
          bucketName: "services-images",
          newFile: item.imageFile,
          oldUrl: item.id ? item.img : null,
        });
      }
      processedItems.push({
        vi: item.vi || "",
        en: item.en || "",
        img: currentImg || "",
        order: i,
      });
    }
    const existingConfig = await prisma.servicesConfig.findFirst();
    if (existingConfig) {
      await prisma.$transaction([
        prisma.serviceItem.deleteMany({
          where: { servicesConfigId: existingConfig.id },
        }),
        prisma.servicesConfig.update({
          where: { id: existingConfig.id },
          data: { titleVi, titleEn, items: { create: processedItems } },
        }),
      ]);
    } else {
      await prisma.servicesConfig.create({
        data: { titleVi, titleEn, items: { create: processedItems } },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateMediaAction(
    formData: FormData,
    countriesList: CountryParam[],
    highlightsList: HighlightParam[],
    tvList: TvParam[],
    pressList: PressParam[],
    mapFile: File | null,
  ) {
    "use server";
    const titleVi = (formData.get("titleVi") as string) || "";
    const titleEn = (formData.get("titleEn") as string) || "";
    const descVi = (formData.get("descVi") as string) || "";
    const descEn = (formData.get("descEn") as string) || "";
    const existingMedia = await prisma.mediaConfig.findFirst();
    const currentMapUrl = await uploadAndCleanStorage({
      bucketName: "media-core",
      newFile: mapFile,
      oldUrl: existingMedia?.mapImg,
    });
    const finalCountries = [];
    for (let i = 0; i < countriesList.length; i++) {
      const item = countriesList[i];
      let url = item.flag;
      if (item.imageFile) {
        url = await uploadAndCleanStorage({
          bucketName: "media-flags",
          newFile: item.imageFile,
          oldUrl: item.id ? item.flag : null,
        });
      }
      finalCountries.push({
        vi: item.vi,
        en: item.en,
        flag: url || "",
        order: i,
      });
    }
    const finalHighlights = [];
    for (let i = 0; i < highlightsList.length; i++) {
      const item = highlightsList[i];
      let url = item.img;
      if (item.imageFile) {
        url = await uploadAndCleanStorage({
          bucketName: "media-highlights",
          newFile: item.imageFile,
          oldUrl: item.id ? item.img : null,
        });
      }
      finalHighlights.push({
        titleVi: item.titleVi,
        titleEn: item.titleEn,
        img: url || "",
        href: item.href || "#",
        order: i,
      });
    }
    const finalTv = [];
    for (let i = 0; i < tvList.length; i++) {
      const item = tvList[i];
      let url = item.src;
      if (item.imageFile) {
        url = await uploadAndCleanStorage({
          bucketName: "media-tv",
          newFile: item.imageFile,
          oldUrl: item.id ? item.src : null,
        });
      }
      finalTv.push({ src: url || "", order: i });
    }
    const finalPress = [];
    for (let i = 0; i < pressList.length; i++) {
      const item = pressList[i];
      let lUrl = item.logo;
      let aUrl = item.article;
      if (item.logoFile) {
        lUrl = await uploadAndCleanStorage({
          bucketName: "media-press",
          newFile: item.logoFile,
          oldUrl: item.id ? item.logo : null,
        });
      }
      if (item.articleFile) {
        aUrl = await uploadAndCleanStorage({
          bucketName: "media-press",
          newFile: item.articleFile,
          oldUrl: item.id ? item.article : null,
        });
      }
      finalPress.push({ logo: lUrl || "", article: aUrl || "", order: i });
    }
    if (existingMedia) {
      await prisma.$transaction([
        prisma.mediaCountry.deleteMany({
          where: { mediaConfigId: existingMedia.id },
        }),
        prisma.mediaHighlight.deleteMany({
          where: { mediaConfigId: existingMedia.id },
        }),
        prisma.mediaTvStation.deleteMany({
          where: { mediaConfigId: existingMedia.id },
        }),
        prisma.mediaPressItem.deleteMany({
          where: { mediaConfigId: existingMedia.id },
        }),
        prisma.mediaConfig.update({
          where: { id: existingMedia.id },
          data: {
            titleVi,
            titleEn,
            descVi,
            descEn,
            mapImg: currentMapUrl,
            countries: { create: finalCountries },
            highlights: { create: finalHighlights },
            tvStations: { create: finalTv },
            pressItems: { create: finalPress },
          },
        }),
      ]);
    } else {
      await prisma.mediaConfig.create({
        data: {
          titleVi,
          titleEn,
          descVi,
          descEn,
          mapImg: currentMapUrl,
          countries: { create: finalCountries },
          highlights: { create: finalHighlights },
          tvStations: { create: finalTv },
          pressItems: { create: finalPress },
        },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateConnectTrainingAction(
    formData: FormData,
    programsList: ProgramParam[],
    socialsList: SocialParam[],
    logoFile: File | null,
  ) {
    "use server";
    const trainingTitleVi = (formData.get("trainingTitleVi") as string) || "";
    const trainingTitleEn = (formData.get("trainingTitleEn") as string) || "";
    const connectTitleVi = (formData.get("connectTitleVi") as string) || "";
    const connectTitleEn = (formData.get("connectTitleEn") as string) || "";
    const fanpageTitle = (formData.get("fanpageTitle") as string) || "";
    const fanpageUrl = (formData.get("fanpageUrl") as string) || "";
    const existingConfig = await prisma.connectTrainingConfig.findFirst();
    const currentLogoUrl = await uploadAndCleanStorage({
      bucketName: "media-core",
      newFile: logoFile,
      oldUrl: existingConfig?.logoIcon,
    });
    const finalPrograms = [];
    for (let i = 0; i < programsList.length; i++) {
      const item = programsList[i];
      let url = item.icon;
      if (item.imageFile) {
        url = await uploadAndCleanStorage({
          bucketName: "training-icons",
          newFile: item.imageFile,
          oldUrl: item.id ? item.icon : null,
        });
      }
      finalPrograms.push({
        vi: item.vi || "",
        en: item.en || "",
        icon: url || "",
        order: i,
      });
    }
    const finalSocials = [];
    for (let i = 0; i < socialsList.length; i++) {
      const item = socialsList[i];
      let url = item.iconImg;
      if (item.imageFile) {
        url = await uploadAndCleanStorage({
          bucketName: "social-icons",
          newFile: item.imageFile,
          oldUrl: item.id ? item.iconImg : null,
        });
      }
      finalSocials.push({
        titleVi: item.titleVi || "",
        titleEn: item.titleEn || "",
        linkText: item.linkText || "",
        url: item.url || "",
        bgColor: item.bgColor || "#1877F2",
        iconImg: url || "",
        order: i,
      });
    }
    if (existingConfig) {
      await prisma.$transaction([
        prisma.trainingProgram.deleteMany({
          where: { connectTrainingConfigId: existingConfig.id },
        }),
        prisma.socialLink.deleteMany({
          where: { connectTrainingConfigId: existingConfig.id },
        }),
        prisma.connectTrainingConfig.update({
          where: { id: existingConfig.id },
          data: {
            trainingTitleVi,
            trainingTitleEn,
            connectTitleVi,
            connectTitleEn,
            fanpageTitle,
            fanpageUrl,
            logoIcon: currentLogoUrl,
            programs: { create: finalPrograms },
            socials: { create: finalSocials },
          },
        }),
      ]);
    } else {
      await prisma.connectTrainingConfig.create({
        data: {
          trainingTitleVi,
          trainingTitleEn,
          connectTitleVi,
          connectTitleEn,
          fanpageTitle,
          fanpageUrl,
          logoIcon: currentLogoUrl,
          programs: { create: finalPrograms },
          socials: { create: finalSocials },
        },
      });
    }
    revalidatePath("/");
    revalidatePath("/admin");
  }

  async function updateActivityAction(
    formData: FormData,
    activityList: ActivityItemParam[],
  ) {
    "use server";
    const titleVi = (formData.get("titleVi") as string) || "";
    const titleEn = (formData.get("titleEn") as string) || "";

    const processedImages = [];

    for (let i = 0; i < activityList.length; i++) {
      const item = activityList[i];
      let currentSrc = item.src;

      if (item.imageFile) {
        currentSrc = await uploadAndCleanStorage({
          bucketName: "activity-images",
          newFile: item.imageFile,
          oldUrl: item.id ? item.src : null,
        });
      }

      processedImages.push({
        src: currentSrc || "",
        order: i,
      });
    }

    const existingConfig = await prisma.activityConfig.findFirst();

    if (existingConfig) {
      await prisma.$transaction([
        prisma.activityImage.deleteMany({
          where: { activityConfigId: existingConfig.id },
        }),
        prisma.activityConfig.update({
          where: { id: existingConfig.id },
          data: {
            titleVi,
            titleEn,
            items: {
              create: processedImages,
            },
          },
        }),
      ]);
    } else {
      await prisma.activityConfig.create({
        data: {
          titleVi,
          titleEn,
          items: {
            create: processedImages,
          },
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin");
  }

  const sanitizedExpertiseData = expertiseConfig
    ? {
        id: expertiseConfig.id,
        createdAt: expertiseConfig.createdAt,
        updatedAt: expertiseConfig.updatedAt,
        titleVi: expertiseConfig.titleVi || "CÁC MẢNG CHUYÊN MÔN",
        titleEn: expertiseConfig.titleEn || "AREAS OF EXPERTISE",
        items: expertiseConfig.items.map((item) => ({
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          expertiseConfigId: item.expertiseConfigId,
          order: item.order,
          vi: item.vi || "",
          en: item.en || "",
          icon: item.icon || "",
        })),
      }
    : null;
  const sanitizedServicesData = servicesConfig
    ? {
        id: servicesConfig.id,
        createdAt: servicesConfig.createdAt,
        updatedAt: servicesConfig.updatedAt,
        titleVi: servicesConfig.titleVi || "DỊCH VỤ CUNG CẤP",
        titleEn: servicesConfig.titleEn || "SERVICES",
        items: servicesConfig.items.map((item) => ({
          id: item.id,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          servicesConfigId: item.servicesConfigId,
          order: item.order,
          vi: item.vi || "",
          en: item.en || "",
          img: item.img || "",
        })),
      }
    : null;
  const sanitizedMediaData = mediaConfig
    ? {
        id: mediaConfig.id,
        titleVi: mediaConfig.titleVi || "",
        titleEn: mediaConfig.titleEn || "",
        descVi: mediaConfig.descVi || "",
        descEn: mediaConfig.descEn || "",
        mapImg: mediaConfig.mapImg || "",
        countries: mediaConfig.countries.map((i) => ({
          id: i.id,
          vi: i.vi || "",
          en: i.en || "",
          flag: i.flag || "",
        })),
        highlights: mediaConfig.highlights.map((i) => ({
          id: i.id,
          titleVi: i.titleVi || "",
          titleEn: i.titleEn || "",
          img: i.img || "",
          href: i.href || "#",
        })),
        tvStations: mediaConfig.tvStations.map((i) => ({
          id: i.id,
          src: i.src || "",
        })),
        pressItems: mediaConfig.pressItems.map((i) => ({
          id: i.id,
          logo: i.logo || "",
          article: i.article || "",
        })),
      }
    : null;
  const sanitizedConnectTrainingData = connectTrainingConfig
    ? {
        id: connectTrainingConfig.id,
        trainingTitleVi: connectTrainingConfig.trainingTitleVi || "",
        trainingTitleEn: connectTrainingConfig.trainingTitleEn || "",
        connectTitleVi: connectTrainingConfig.connectTitleVi || "",
        connectTitleEn: connectTrainingConfig.connectTitleEn || "",
        fanpageTitle: connectTrainingConfig.fanpageTitle || "",
        fanpageUrl: connectTrainingConfig.fanpageUrl || "",
        logoIcon: connectTrainingConfig.logoIcon || "",
        programs: connectTrainingConfig.programs.map((i) => ({
          id: i.id,
          vi: i.vi || "",
          en: i.en || "",
          icon: i.icon || "",
        })),
        socials: connectTrainingConfig.socials.map((i) => ({
          id: i.id,
          titleVi: i.titleVi || "",
          titleEn: i.titleEn || "",
          linkText: i.linkText || "",
          url: i.url || "",
          bgColor: i.bgColor || "#1877F2",
          iconImg: i.iconImg || "",
        })),
      }
    : null;

  const sanitizedActivityData = activityConfig
    ? {
        id: activityConfig.id,
        titleVi: activityConfig.titleVi || "HÌNH ẢNH HOẠT ĐỘNG",
        titleEn: activityConfig.titleEn || "ACTIVITY HIGHLIGHTS",
        items: activityConfig.items.map((item) => ({
          id: item.id,
          src: item.src || "",
        })),
      }
    : null;

  return (
    <AdminLayout userEmail={user?.email} logoutAction={logout}>
      <div className="space-y-10">
        <HeroForm initialData={heroData} onSave={updateHeroAction} />
        <StatsForm initialData={statsData} onSave={updateStatsAction} />
        <ProfileForm initialData={profileData} onSave={updateProfileAction} />
        <ExpertiseForm
          initialData={sanitizedExpertiseData}
          onSave={updateExpertiseAction}
        />
        <ServicesForm
          initialData={sanitizedServicesData}
          onSave={updateServicesAction}
        />
        <ConnectionsAndMediaForm
          initialData={sanitizedMediaData}
          onSave={updateMediaAction}
        />
        <ConnectAndTrainingForm
          initialData={sanitizedConnectTrainingData}
          onSave={updateConnectTrainingAction}
        />
        <ActivityHighlightsForm
          initialData={sanitizedActivityData}
          onSave={updateActivityAction}
        />
      </div>
    </AdminLayout>
  );
}
