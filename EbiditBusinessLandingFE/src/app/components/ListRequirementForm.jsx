"use client";

import { useState } from "react";
import {
  Building2,
  CalendarRange,
  Mail,
  Package,
  Send,
  User,
} from "lucide-react";

const defaultForm = {
  company: "",
  contact: "",
  email: "",
  commodity: "",
  quantity: "",
  incoterm: "",
  timeline: "",
  notes: "",
};

export default function ListRequirementForm() {
  const [form, setForm] = useState(defaultForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);

    // Simulate server submission so the UI stays responsive without a backend dependency.
    await new Promise((resolve) => setTimeout(resolve, 1100));

    setIsSubmitting(false);
    setSubmitted(true);
    setForm(defaultForm);
  };

  return (
    <section id="requirements" className="bg-slate-900 py-20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
            List a requirement
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight">
            Importers and wholesalers can broadcast a ready-to-buy brief in
            minutes.
          </h2>
          <p className="mt-4 text-slate-300">
            Share volume, quality specs, and fulfilment timelines. Ebidit
            syndicates it to pre-qualified exporters, runs a reverse auction,
            and shortlists compliant bids so you close with confidence.
          </p>

          <ul className="mt-8 space-y-4 text-slate-200">
            {[
              "Dedicated trade co-pilots accelerate vendor verification.",
              "Digital room for Q&A, addendums, and commercial clarifications.",
              "Contracting templates and escrow rails reduce legal back-and-forth.",
            ].map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <span
                  className="mt-1 h-2 w-2 rounded-full bg-rose-400"
                  aria-hidden
                />
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-8 shadow-2xl backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="company"
                className="text-xs uppercase tracking-[0.3em] text-slate-400"
              >
                Company / Organisation
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Building2 className="h-4 w-4 text-rose-300" />
                <input
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                  placeholder="E.g. Harbour Imports Pvt Ltd"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact"
                  className="text-xs uppercase tracking-[0.3em] text-slate-400"
                >
                  Contact name
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <User className="h-4 w-4 text-rose-300" />
                  <input
                    id="contact"
                    name="contact"
                    value={form.contact}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                    placeholder="Dylan Kurian"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.3em] text-slate-400"
                >
                  Work email
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <Mail className="h-4 w-4 text-rose-300" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                    placeholder="dylan@harbourimports.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="commodity"
                className="text-xs uppercase tracking-[0.3em] text-slate-400"
              >
                Commodity / SKU
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <Package className="h-4 w-4 text-rose-300" />
                <input
                  id="commodity"
                  name="commodity"
                  value={form.commodity}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                  placeholder="Malaysian white peppercorns, 550g"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="quantity"
                  className="text-xs uppercase tracking-[0.3em] text-slate-400"
                >
                  Volume & incoterm
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <Package className="h-4 w-4 text-rose-300" />
                  <input
                    id="quantity"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                    placeholder="40 MT • FOB Penang"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="timeline"
                  className="text-xs uppercase tracking-[0.3em] text-slate-400"
                >
                  Target timeline
                </label>
                <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <CalendarRange className="h-4 w-4 text-rose-300" />
                  <input
                    id="timeline"
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-sm placeholder:text-slate-500 focus:outline-none"
                    placeholder="Award by 18 Feb 2026"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="text-xs uppercase tracking-[0.3em] text-slate-400"
              >
                Notes / specifications
              </label>
              <textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                placeholder="Moisture & granulometry requirements, certifications, payment terms, inspection preferences, etc."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-rose-500 py-3 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Publish requirement"}
              <Send className="h-4 w-4" />
            </button>

            {submitted && (
              <p className="text-center text-sm text-emerald-300">
                Requirement captured. A trade desk specialist will reach out
                within 6 business hours.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
