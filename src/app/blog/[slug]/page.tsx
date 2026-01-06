import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Standing Bear",
    };
  }

  return {
    title: `${post.title} | Standing Bear Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : ["Standing Bear"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#050505] pt-24">
        {/* Header */}
        <article className="px-6 pb-20">
          {/* Back link */}
          <div className="mx-auto mb-8 max-w-3xl">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-syne text-sm font-medium text-gray-400 transition-colors duration-200 hover:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Back to Blog
            </Link>
          </div>

          {/* Post header */}
          <header className="mx-auto mb-16 max-w-3xl">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400 ring-1 ring-amber-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 font-syne text-4xl font-bold leading-tight text-white md:text-6xl">
              {post.title}
            </h1>

            {/* Description */}
            {post.description && (
              <p className="mb-8 font-crimson text-xl leading-relaxed text-gray-300 md:text-2xl">
                {post.description}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 border-y border-white/10 py-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              {post.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              )}
              {post.author && (
                <div className="flex items-center gap-2">
                  <span className="font-syne font-medium text-white">by {post.author}</span>
                </div>
              )}
            </div>
          </header>

          {/* Post content */}
          <div className="mx-auto max-w-3xl">
            <MarkdownRenderer content={post.content} />
          </div>

          {/* Footer CTA */}
          <div className="mx-auto mt-20 max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent p-12 text-center backdrop-blur-xl">
            <h3 className="mb-4 font-syne text-2xl font-bold text-white md:text-3xl">
              Need AI expertise for your project?
            </h3>
            <p className="mb-8 font-crimson text-lg text-gray-300">
              Standing Bear builds intelligent applications and provides expert consulting. Let's
              discuss how we can help.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 font-syne font-semibold text-white transition-all duration-200 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Get in Touch
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
