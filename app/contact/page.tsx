"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { SECTION_WIDTH } from "@/lib/constants";
import { siteConfig } from "@/data/site";
import { PageHeader } from "@/components/shared/PageHeader";
import { BookCallButton } from "@/components/shared/BookCallButton";
import { CopyEmailButton } from "@/components/shared/CopyEmailButton";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

const emptyForm = { name: "", phone: "", email: "", message: "", company: "" };

const inputClass =
  "mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 transition-[border-color,box-shadow] duration-150 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-accent/40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100";

function mailtoFallback(form: typeof emptyForm) {
  const subject = encodeURIComponent(`Portfolio message from ${form.name || "a visitor"}`);
  const body = encodeURIComponent(
    `${form.message}\n\n— ${form.name}${form.phone ? ` (${form.phone})` : ""}${form.email ? `\n${form.email}` : ""}`
  );
  return `${siteConfig.socialLinks.email}?subject=${subject}&body=${body}`;
}

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <PageHeader
          title="Contact"
          description={
            <>
              Send a message below, book a call, or email me directly at{" "}
              <a
                href={siteConfig.socialLinks.email}
                className="font-medium text-zinc-900 underline decoration-zinc-400 underline-offset-2 transition-colors hover:decoration-accent dark:text-zinc-100"
              >
                {siteConfig.email}
              </a>
              .
            </>
          }
        />

        <div className="grid gap-6">
          <section
            className="enter rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-6 md:p-8"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
              Send me a message
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              I read every message.
            </p>

            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-700 dark:bg-zinc-800/50"
                  role="status"
                  aria-live="polite"
                >
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 sm:text-base">
                    Thanks, {form.name.split(" ")[0] || "friend"}. Your message is on its way.
                  </p>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    I&apos;ll get back to you at {form.email}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("idle");
                      setForm(emptyForm);
                    }}
                    className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-900 transition-[background-color,transform] duration-150 ease-snappy hover:bg-zinc-100 active:scale-[0.97] dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="mt-8 space-y-6"
                >
                  {/* Honeypot (hidden from people and assistive tech) */}
                  <div className="hidden" aria-hidden="true">
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.company}
                        onChange={handleChange}
                      />
                    </label>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        autoComplete="name"
                        required
                        maxLength={100}
                        value={form.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                        required
                        maxLength={200}
                        value={form.email}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder="you@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Phone <span className="font-normal text-zinc-500">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      maxLength={40}
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Your phone"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={5000}
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="What are you working on?"
                    />
                  </div>

                  <AnimatePresence>
                    {status === "error" ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p
                          role="alert"
                          className="rounded-lg border border-amber-300/60 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200"
                        >
                          The message couldn&apos;t be sent from here.{" "}
                          <a href={mailtoFallback(form)} className="font-semibold underline underline-offset-2">
                            Open it in your email app instead
                          </a>{" "}
                          (it&apos;s already filled in).
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={cn(
                      "group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 font-medium text-white transition-[background-color,transform,opacity] duration-150 ease-snappy hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    )}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-snappy group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </section>

          <section
            className="enter flex flex-col items-center gap-4 rounded-xl border border-dashed border-zinc-300 p-6 text-center dark:border-zinc-700 sm:flex-row sm:justify-between sm:text-left"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <div>
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Prefer to talk?</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Grab a free 30-minute slot that suits you.
              </p>
            </div>
            <BookCallButton />
          </section>

          <div className="enter flex justify-center" style={{ "--i": 5 } as React.CSSProperties}>
            <CopyEmailButton />
          </div>
        </div>
      </div>
    </div>
  );
}
