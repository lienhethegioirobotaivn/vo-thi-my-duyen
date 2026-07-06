import { Hero } from "@/app/(home)/_components/Hero";
import { Stats } from "@/app/(home)/_components/Stats";
import { ProfileHighlights } from "@/app/(home)/_components/ProfileHighlights";
import { AreasOfExpertise } from "@/app/(home)/_components/AreasOfExpertise";
import { Services } from "@/app/(home)/_components/Services";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <ProfileHighlights />
      <AreasOfExpertise />
      <Services />
    </div>
  );
}
