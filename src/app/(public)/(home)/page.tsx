import { Hero } from "@/app/(public)/(home)/_components/Hero";
import { Stats } from "@/app/(public)/(home)/_components/Stats";
import { ProfileHighlights } from "@/app/(public)/(home)/_components/ProfileHighlights";
import { AreasOfExpertise } from "@/app/(public)/(home)/_components/AreasOfExpertise";
import { Services } from "@/app/(public)/(home)/_components/Services";
import { ConnectionsAndMedia } from "@/app/(public)/(home)/_components/ConnectionsAndMedia";
import { ConnectAndTraining } from "@/app/(public)/(home)/_components/ConnectAndTraining";
import { ActivityHighlights } from "@/app/(public)/(home)/_components/ActivityHighlights";
import { StrategicClients } from "@/app/(public)/(home)/_components/StrategicClients";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <ProfileHighlights />
      <AreasOfExpertise />
      <Services />
      <ConnectionsAndMedia />
      <ConnectAndTraining />
      <ActivityHighlights />
      <StrategicClients />
    </div>
  );
}
