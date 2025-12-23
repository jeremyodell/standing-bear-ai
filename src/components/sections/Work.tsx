"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const projects = [
  {
    id: "doc-processing",
    title: "Intelligent Document Processing",
    category: "AI Application",
    description:
      "Automated document classification and data extraction system processing thousands of documents daily with 98%+ accuracy.",
    tags: ["Python", "AWS", "LLM", "OCR"],
    featured: true,
  },
  {
    id: "conversational-ai",
    title: "Conversational AI Platform",
    category: "AI Application",
    description:
      "Custom chatbot platform with RAG capabilities, enabling businesses to deploy AI assistants trained on their own knowledge base.",
    tags: ["RAG", "Vector DB", "Node.js", "React"],
    featured: false,
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics Engine",
    category: "Consulting + Dev",
    description:
      "End-to-end ML pipeline for demand forecasting, reducing inventory costs and improving supply chain efficiency.",
    tags: ["ML", "Python", "AWS SageMaker"],
    featured: false,
  },
  {
    id: "ai-strategy",
    title: "AI Integration Strategy",
    category: "Consulting",
    description:
      "Comprehensive AI roadmap and implementation plan for a mid-size enterprise, identifying high-impact opportunities and technical requirements.",
    tags: ["Strategy", "Architecture", "Training"],
    featured: false,
  },
];

export function Work() {
  const [ref, isInView] = useInView<HTMLElement>();

  return (
    <section
      id="work"
      ref={ref}
      className="py-32 md:py-48 bg-[var(--bg-secondary)]"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header - left aligned */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[var(--text-muted)] block mb-4">
            Selected work
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Projects that shipped.
          </h2>
        </motion.div>

        {/* Bento grid - varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Featured project - spans more columns */}
          <motion.article
            className="md:col-span-7 lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="group relative h-full min-h-[400px] md:min-h-[500px] p-8 md:p-12 border border-[var(--border)] rounded-2xl bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-colors overflow-hidden">
              {/* Large accent element */}
              <div
                className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-30"
                style={{ background: "var(--accent)" }}
              />

              <div className="relative h-full flex flex-col">
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
                  {projects[0].category}
                </span>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-6">
                  {projects[0].title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mb-auto">
                  {projects[0].description}
                </p>

                {/* Stats callout */}
                <div className="mt-8 pt-8 border-t border-[var(--border)]">
                  <span className="text-5xl md:text-6xl font-bold text-white">98%+</span>
                  <span className="block text-sm text-[var(--text-muted)] mt-2">accuracy rate</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Second project - taller, narrower */}
          <motion.article
            className="md:col-span-5 lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-full min-h-[400px] md:min-h-[500px] p-8 border border-[var(--border)] rounded-2xl bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-colors flex flex-col">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-4">
                {projects[1].category}
              </span>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                {projects[1].title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-auto">
                {projects[1].description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {projects[1].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs text-[var(--text-muted)] border border-[var(--border)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Third project - wide but short */}
          <motion.article
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="h-full min-h-[250px] p-8 border border-[var(--border)] rounded-2xl bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] transition-colors">
              <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3 block">
                {projects[2].category}
              </span>
              <h3 className="text-xl font-bold tracking-tight mb-3">
                {projects[2].title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {projects[2].description}
              </p>
            </div>
          </motion.article>

          {/* Fourth project - minimal treatment */}
          <motion.article
            className="md:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-full min-h-[250px] p-8 border border-[var(--border)] rounded-2xl hover:border-[var(--border-hover)] transition-colors flex items-end">
              <div>
                <span className="text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3 block">
                  {projects[3].category}
                </span>
                <h3 className="text-xl font-bold tracking-tight">
                  {projects[3].title}
                </h3>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
