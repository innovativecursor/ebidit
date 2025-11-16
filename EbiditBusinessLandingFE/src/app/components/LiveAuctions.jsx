import Link from "next/link";
import {
  ArrowUpRight,
  Globe2,
  Package,
  ShieldCheck,
  Timer,
} from "lucide-react";

const auctions = [
  {
    id: "LOT-3021",
    title: "Go-to-market strategy sprint",
    route: "Singapore HQ → LATAM rollout",
    shipment: "4-week engagement • Fixed milestones",
    topBid: "$18,400",
    change: "+8.2%",
    closesIn: "02:15:42",
    bids: 11,
    watchers: 36,
    tags: ["Deck + GTM kit", "B2B SaaS"],
  },
  {
    id: "LOT-3056",
    title: "Mobile app rebuild (React Native)",
    route: "Dubai fintech → Remote squad",
    shipment: "12-week retainer • Hybrid pricing",
    topBid: "$72,000",
    change: "+4.9%",
    closesIn: "05:22:18",
    bids: 9,
    watchers: 29,
    tags: ["PCI docs", "Design system"],
  },
  {
    id: "LOT-3074",
    title: "Brand + packaging refresh",
    route: "Mumbai D2C → EMEA launch",
    shipment: "6-week sprint • Deliverable based",
    topBid: "$32,500",
    change: "+6.1%",
    closesIn: "11:03:09",
    bids: 14,
    watchers: 41,
    tags: ["F&B", "3 concept boards"],
  },
];

export default function LiveAuctions() {
  return (
    <section id="auctions" className="bg-slate-50 py-20 text-slate-900">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-600">
              Live service auctions
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-900">
              Real-time visibility on vetted delivery squads.
            </h2>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Every brief ships with scope, compliance needs, and rate
              guardrails so procurement teams can shortlist partners with full
              commercial clarity before awarding work.
            </p>
          </div>

          <Link
            href="/get-all-businesses"
            className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-rose-600 transition hover:text-rose-500"
          >
            View marketplace feed
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {auctions.map((auction) => (
            <article
              key={auction.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {auction.id}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    {auction.title}
                  </h3>
                  <p className="text-sm text-slate-500">{auction.route}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  {auction.change}
                </span>
              </div>

              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-slate-400" />
                  {auction.shipment}
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-slate-400" />
                  Current top bid:
                  <span className="text-base font-semibold text-slate-900">
                    {auction.topBid}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {auction.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 font-semibold text-slate-900">
                  <Timer className="h-4 w-4 text-rose-500" />
                  Closes in {auction.closesIn}
                </span>
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <span>{auction.bids} bids</span>
                  <span>{auction.watchers} watching</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Compliance checklists, NDAs, and statement-of-work templates
                locked in via Ebidit assurance.
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
