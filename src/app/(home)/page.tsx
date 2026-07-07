import { Hero } from "@/app/(home)/_components/Hero";
import { Stats } from "@/app/(home)/_components/Stats";
import { ProfileHighlights } from "@/app/(home)/_components/ProfileHighlights";
import { AreasOfExpertise } from "@/app/(home)/_components/AreasOfExpertise";
import { Services } from "@/app/(home)/_components/Services";
import { ConnectionsAndMedia } from "@/app/(home)/_components/ConnectionsAndMedia";
import { ConnectAndTraining } from "@/app/(home)/_components/ConnectAndTraining";
import { ActivityHighlights } from "@/app/(home)/_components/ActivityHighlights";
import { StrategicClients } from "@/app/(home)/_components/StrategicClients";

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
