"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { SECTION_WIDTH } from "@/lib/constants";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Formspree, Resend, or your backend
    console.log("Form submitted:", formState);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 md:pt-32 md:pb-20">
      <div className={SECTION_WIDTH}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-2xl md:text-3xl">
            Contact
          </h1>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 sm:text-base">
            Get in touch with me. I will get back to you as soon as possible.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-6 md:p-8"
        >
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg">
            Send me a message
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Fill out the form below and I will get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formState.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Phone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formState.phone}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                placeholder="Your phone"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formState.email}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                placeholder="Your email"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formState.message}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                placeholder="Your message"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[48px] rounded-full bg-zinc-900 py-3 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
