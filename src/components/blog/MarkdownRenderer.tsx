"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({ children, className }: { children: any; className?: string }) {
  const [copied, setCopied] = useState(false);

  // Extract text content from children (handle both strings and React nodes)
  const getTextContent = (node: any): string => {
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(getTextContent).join('');
    if (node?.props?.children) return getTextContent(node.props.children);
    return String(node || '');
  };

  const textContent = getTextContent(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className="group relative my-8 block">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute right-4 top-4 z-10 rounded-lg bg-white/5 p-2 opacity-0 backdrop-blur-xl transition-all duration-200 hover:bg-white/10 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {/* Code block - using spans to avoid nesting errors */}
      <span className={`block overflow-x-auto rounded-xl border border-white/10 bg-[#0a0a0a] p-6 ${className || ""}`}>
        <code className="font-jetbrains text-sm leading-relaxed text-gray-300 whitespace-pre">{textContent}</code>
      </span>
    </span>
  );
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose-blog">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="mb-6 mt-12 font-syne text-4xl font-bold text-white first:mt-0 md:text-5xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-4 mt-12 border-l-4 border-blue-500 pl-6 font-syne text-3xl font-bold text-white md:text-4xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-4 mt-8 font-syne text-2xl font-semibold text-white md:text-3xl">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mb-3 mt-6 font-syne text-xl font-semibold text-white md:text-2xl">
              {children}
            </h4>
          ),

          // Paragraphs and text
          p: ({ children }) => (
            <p className="mb-6 font-crimson text-lg leading-[1.8] text-gray-300">{children}</p>
          ),
          em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
          strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,

          // Lists
          ul: ({ children }) => (
            <ul className="mb-6 ml-6 space-y-2 font-crimson text-lg text-gray-300">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-6 ml-6 space-y-2 font-crimson text-lg text-gray-300">{children}</ol>
          ),
          li: ({ children }) => <li className="pl-2">{children}</li>,

          // Code
          code: ({ inline, children, className }: any) => {
            if (inline) {
              return (
                <code className="rounded bg-blue-500/10 px-2 py-0.5 font-jetbrains text-sm text-blue-300 ring-1 ring-blue-500/20">
                  {children}
                </code>
              );
            }
            return <CodeBlock className={className}>{children}</CodeBlock>;
          },

          // Blockquotes (pull quotes)
          blockquote: ({ children }) => (
            <blockquote className="relative my-10 border-l-4 border-amber-500 bg-amber-500/5 py-6 pl-8 pr-6 font-syne text-xl font-medium italic text-gray-200 md:text-2xl">
              <div className="absolute -left-3 top-4 h-6 w-6 rounded-full bg-amber-500/20" />
              {children}
            </blockquote>
          ),

          // Tables
          table: ({ children }) => (
            <span className="my-8 block overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full border-collapse font-crimson text-base text-gray-300">
                {children}
              </table>
            </span>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-white/10 bg-white/[0.02]">{children}</thead>
          ),
          tbody: ({ children }) => <tbody className="divide-y divide-white/5">{children}</tbody>,
          tr: ({ children }) => (
            <tr className="transition-colors duration-200 hover:bg-white/[0.02]">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-6 py-4 text-left font-syne font-semibold text-white">{children}</th>
          ),
          td: ({ children }) => <td className="px-6 py-4">{children}</td>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="font-semibold text-blue-400 underline decoration-blue-400/30 underline-offset-4 transition-colors duration-200 hover:text-blue-300 hover:decoration-blue-300/50"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),

          // Images
          img: ({ src, alt }) => (
            <span className="my-10 block">
              <img src={src} alt={alt} className="w-full rounded-xl border border-white/10" />
              {alt && (
                <span className="mt-4 block text-center font-crimson text-sm italic text-gray-400">
                  {alt}
                </span>
              )}
            </span>
          ),

          // Horizontal rule
          hr: () => <hr className="my-12 border-t border-white/10" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
