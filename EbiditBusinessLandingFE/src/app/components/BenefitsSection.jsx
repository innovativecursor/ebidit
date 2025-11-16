import {
  BadgeCheck,
  Clock3,
  Globe2,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Auction platform for services",
    description:
      "Post business plans, design sprints, software builds, or compliance gigs and let pre-vetted vendors bid transparently.",
  },
  {
    icon: Clock3,
    title: "Time-boxed awards",
    description:
      "Live countdowns, nudges, and structured milestones keep every engagement on schedule.",
  },
  {
    icon: Globe2,
    title: "Cross-border collaboration",
    description:
      "Tap exporters, freelancers, and agencies across regions with instant context on currency, compliance, and delivery windows.",
  },
  {
    icon: Workflow,
    title: "Dual role flexibility",
    description:
      "Register as a business or freelancer—bid on auctions or publish your own briefs without switching tools.",
  },
  {
    icon: BadgeCheck,
    title: "Ratings & portfolios",
    description:
      "Profiles highlight past work, certifications, and reviews so procurement gets confidence before awarding.",
  },
  {
    icon: Sparkles,
    title: "Targeted notifications",
    description:
      "Auctioneers control who gets alerted, ensuring relevant bidders see opportunities in real time.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-white py-20" id="why">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-600">
            Why Ebidit
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Built to solve global service procurement pain.
          </h2>
          <p className="mt-4 text-base text-slate-600">
            High cost variability, complex cross-border coordination, and
            limited transparency stall projects. Ebidit flips the script with
            transparent auctions, role-aware onboarding, and data-rich vendor
            intel.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="rounded-3xl border border-slate-100 bg-slate-50/50 p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <benefit.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
