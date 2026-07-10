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

  const statsData = await prisma.stat.findMany({
    orderBy: { order: "asc" },
  });

  const profileData = await prisma.profileConfig.findFirst({
    include: { items: { orderBy: { order: "asc" } } },
  });

  const expertiseConfig = await prisma.expertiseConfig.findFirst({
    include: { items: { orderBy: { order: "asc" } } },
  });

  const servicesConfig = await prisma.servicesConfig.findFirst({
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
      prisma.stat.createMany({
        data: processedStats,
      }),
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
          data: {
            titleVi,
            titleEn,
            items: {
              create: processedItems,
            },
          },
        }),
      ]);
    } else {
      await prisma.expertiseConfig.create({
        data: {
          titleVi,
          titleEn,
          items: {
            create: processedItems,
          },
        },
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
          data: {
            titleVi,
            titleEn,
            items: {
              create: processedItems,
            },
          },
        }),
      ]);
    } else {
      await prisma.servicesConfig.create({
        data: {
          titleVi,
          titleEn,
          items: {
            create: processedItems,
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
      </div>
    </AdminLayout>
  );
}
