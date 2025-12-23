"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { isValidEmail } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import type { ContactFormData, ContactFormErrors, FormStatus } from "@/types";

export function Contact() {
  const [ref, isInView] = useInView<HTMLElement>();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (hasError: boolean) =>
    `w-full bg-transparent border-b ${hasError ? "border-red-500" : "border-[var(--border)]"} py-4 text-white placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors`;

  return (
    <section id="contact" ref={ref} className="py-32 md:py-48">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Big statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] block mb-4">
              Get in touch
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8">
              Let&apos;s build something.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-md mb-12">
              Have a project in mind? We&apos;d love to hear about it.
            </p>

            {/* Direct contact */}
            <div className="space-y-4">
              <a
                href="mailto:jeremy@standingbear.ai"
                className="block text-lg text-white hover:text-[var(--accent)] transition-colors"
              >
                jeremy@standingbear.ai
              </a>
              <span className="block text-[var(--text-muted)]">
                Houston, TX
              </span>
            </div>
          </motion.div>

          {/* Right - Form (minimal, no card) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={inputClasses(!!errors.name)}
                />
                {errors.name && (
                  <p className="mt-2 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className={inputClasses(!!errors.email)}
                />
                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company (optional)"
                  className={inputClasses(false)}
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  className={`${inputClasses(!!errors.message)} resize-none`}
                />
                {errors.message && (
                  <p className="mt-2 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center gap-3 text-white font-medium disabled:opacity-50"
              >
                {status === "submitting" ? (
                  "Sending..."
                ) : status === "success" ? (
                  "Sent — we'll be in touch"
                ) : (
                  <>
                    Send message
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>

              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500"
                >
                  Something went wrong. Try emailing us directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
