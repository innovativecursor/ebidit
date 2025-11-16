import HeroSection from "./components/HeroSection";
import LiveAuctions from "./components/LiveAuctions";
import BenefitsSection from "./components/BenefitsSection";
import ListRequirementForm from "./components/ListRequirementForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white">
      <HeroSection />
      <LiveAuctions />
      <BenefitsSection />
      <ListRequirementForm />
    </main>
  );
}
