import { getAllPosts } from "@/lib/blog";
import BlogCard from "@/components/blog/BlogCard";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
  title: "Blog | Standing Bear",
  description:
    "Technical insights on AI development, engineering practices, and building intelligent applications. Deep dives from the Standing Bear team.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#050505] pt-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 md:py-32">
          {/* Subtle gradient background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-block">
              <div className="rounded-full bg-amber-500/10 px-4 py-2 ring-1 ring-amber-500/20">
                <span className="font-syne text-sm font-semibold uppercase tracking-wider text-amber-400">
                  Technical Blog
                </span>
              </div>
            </div>
            <h1 className="mb-6 font-syne text-5xl font-bold text-white md:text-7xl">
              Insights & Analysis
            </h1>
            <p className="mx-auto max-w-2xl font-crimson text-xl leading-relaxed text-gray-300 md:text-2xl">
              Deep technical explorations in AI development, engineering practices, and lessons
              learned building intelligent applications.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center backdrop-blur-xl">
                <p className="font-crimson text-lg text-gray-400">
                  No blog posts yet. Check back soon for technical insights and analysis.
                </p>
              </div>
            ) : (
              <div className="grid gap-8">
                {posts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
