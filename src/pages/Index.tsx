import { DirectionTestHero } from "@/components/sections/DirectionTestHero";
import { Origin } from "@/components/sections/Origin";
import { FirstRiskAndCliff } from "@/components/sections/FirstRiskAndCliff";
import { TheSystem } from "@/components/sections/TheSystem";
import { SchoolWithNoMarks } from "@/components/sections/SchoolWithNoMarks";
import { ZohoSchoolsCounter } from "@/components/sections/ZohoSchoolsCounter";
import { QuietPolicyHacker } from "@/components/sections/QuietPolicyHacker";
import { TheReturn } from "@/components/sections/TheReturn";
import { Philosophy } from "@/components/sections/Philosophy";
import { Tension } from "@/components/sections/Tension";
import { Finale } from "@/components/sections/Finale";
import { NumberThatDoesNotExist } from "@/components/sections/NumberThatDoesNotExist";
import { ScrollProgress } from "@/components/overlays/ScrollProgress";

const Index = () => {
  return (
    <main className="relative">
      <ScrollProgress />
      <h1 className="sr-only">Sridhar Vembu - The man who walked back. A Brokai Labs tribute.</h1>
      <DirectionTestHero />
      <Origin />
      <FirstRiskAndCliff />
      <TheSystem />
      <SchoolWithNoMarks />
      <NumberThatDoesNotExist />
      <ZohoSchoolsCounter />
      <QuietPolicyHacker />
      <TheReturn />
      <Philosophy />
      <Tension />
      <Finale />
    </main>
  );
};

export default Index;
