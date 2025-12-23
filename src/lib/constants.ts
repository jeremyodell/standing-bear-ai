export const siteConfig = {
  name: "Standing Bear",
  tagline: "AI Solutions. Built to Stand.",
  description:
    "We build intelligent applications and provide expert consulting to help businesses harness the power of AI. From concept to production, we deliver solutions that endure.",
  email: "jeremy@standingbear.ai",
  location: "Houston, TX",
  url: "https://standingbear.ai",
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact", isCta: true },
];

export const services = [
  {
    id: "development",
    title: "AI Application Development",
    description:
      "We build custom AI-powered applications from the ground up. Whether you need a prototype to prove a concept or a production system ready to scale, we handle it all.",
    icon: "code",
    features: [
      "Custom AI-powered applications",
      "Prototype to production pipeline",
      "Modern cloud architecture (AWS)",
      "API design and integration",
      "Scalable, maintainable code",
    ],
  },
  {
    id: "consulting",
    title: "AI Consulting",
    description:
      "Need guidance on your AI strategy? We provide hands-on consulting that goes beyond slide decks. We'll help you understand what's possible and how to get there.",
    icon: "compass",
    features: [
      "AI strategy and roadmapping",
      "Technical leadership",
      "Architecture review and design",
      "Team augmentation",
      "Implementation support",
    ],
  },
];

export const projects = [
  {
    id: "doc-processing",
    title: "Intelligent Document Processing",
    category: "AI Application",
    description:
      "Automated document classification and data extraction system processing thousands of documents daily with 98%+ accuracy.",
    tags: ["Python", "AWS", "LLM", "OCR"],
  },
  {
    id: "conversational-ai",
    title: "Conversational AI Platform",
    category: "AI Application",
    description:
      "Custom chatbot platform with RAG capabilities, enabling businesses to deploy AI assistants trained on their own knowledge base.",
    tags: ["RAG", "Vector DB", "Node.js", "React"],
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics Engine",
    category: "Consulting + Dev",
    description:
      "End-to-end ML pipeline for demand forecasting, reducing inventory costs and improving supply chain efficiency.",
    tags: ["ML", "Python", "AWS SageMaker"],
  },
  {
    id: "ai-strategy",
    title: "AI Integration Strategy",
    category: "Consulting",
    description:
      "Comprehensive AI roadmap and implementation plan for a mid-size enterprise, identifying high-impact opportunities and technical requirements.",
    tags: ["Strategy", "Architecture", "Training"],
  },
];

export const values = [
  {
    id: "craftsmanship",
    title: "Craftsmanship",
    description:
      "Every line of code, every architecture decision — we build things right the first time.",
  },
  {
    id: "clarity",
    title: "Clarity",
    description:
      "No buzzwords. No fluff. We speak plainly and deliver what we promise.",
  },
  {
    id: "partnership",
    title: "Partnership",
    description:
      "Your project gets our full attention. We're invested in your success, not just the invoice.",
  },
];

export const stats = [
  { value: "100%", label: "Client Focus" },
  { value: "AWS", label: "Cloud Native" },
  { value: "24/7", label: "Production Ready" },
];
