"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import logo from "../EnquiryForm/images/e-bid_app_1_red.png";

const highlightCards = [
  {
    title: "Auction-ready briefs",
    subtitle: "Strategy, design, product, dev & compliance",
  },
  {
    title: "Global vendor graph",
    subtitle: "Freelancers & agencies across 40+ hubs",
  },
];

export default function HeroSection() {
  const [liveAuctions, setLiveAuctions] = useState(132);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAuctions((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Why Ebidit", href: "#why" },
    { label: "Business plan", href: "#business-plan" },
    { label: "Comparison", href: "#comparison" },
    { label: "Pricing", href: "#pricing" },
  ];

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white"
    >
      <div
        className="absolute top-16 -right-10 h-72 w-72 rounded-full bg-rose-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt="Ebidit logo"
              width={44}
              height={44}
              className="rounded-full bg-white/10 p-2"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-white/70">
                Ebidit
              </p>
              <p className="text-sm text-white/60">Global service auctions</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.25em] text-white/60">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
          <Link
            href="#requirements"
            className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-lg shadow-rose-500/30 transition hover:bg-white"
          >
            Get started
          </Link>
        </header>
      </div>

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-20 pt-4 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-rose-100">
            Industry focus
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
              Live
            </span>
          </div>

          <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-5xl">
            Auction-based procurement for global services.
          </h1>
          <p className="mt-4 text-base text-slate-200">
            Our mission is to revolutionize how importers, wholesalers, and
            service buyers discover talent. Post a brief, invite pre-vetted
            vendors, and watch bids land with clarity on price, credentials, and
            delivery confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#auctions"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-rose-500/30 transition hover:bg-white"
            >
              Browse live auctions
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#requirements"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white hover:text-white"
            >
              List a requirement
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-4">
              <p className="text-sm uppercase tracking-[0.3em] text-rose-200">
                Live auctions
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-semibold">{liveAuctions}</span>
              </div>
              <p className="text-sm text-slate-300">
                Service briefs refreshing every few seconds
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-100">
              <Sparkles className="h-4 w-4 text-rose-200" />
              Ratings, case files, and compliance-ready docs bundled in.
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="space-y-6 rounded-[28px] bg-gradient-to-br from-rose-500/30 via-slate-900/60 to-slate-950/80 p-6">
              <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                <p className="text-xs uppercase tracking-[0.4em] text-rose-200">
                  Bid studio
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  Service auctions in motion
                </h3>
                <p className="mt-2 text-sm text-slate-200">
                  Showcase scope, deliverables, evaluation criteria, and pricing
                  expectations while live bids animate beside credential-rich
                  vendor cards.
                </p>
              </div>

              <div className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-emerald-200">
                    Live
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    Get started
                  </h4>
                  <p className="text-sm text-slate-200">
                    $200 onboarding credit
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-rose-200">
                    Business
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    Bid-ready teams
                  </h4>
                  <p className="text-sm text-slate-200">
                    $100 audit per auction
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-sky-200">
                    Industry
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    Regulated workflows
                  </h4>
                  <p className="text-sm text-slate-200">
                    Docs, NDAs, compliance
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-purple-200">
                    Freelancer
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    Global talent
                  </h4>
                  <p className="text-sm text-slate-200">
                    Bid, win, and showcase
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {highlightCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-100"
                >
                  <p className="text-base font-semibold text-white">
                    {card.title}
                  </p>
                  <p className="mt-1 text-slate-300">{card.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-100">
              Preview service scopes, drag milestone timelines, and pin
              compliance docs—everything stays synced with the live auction
              feed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
