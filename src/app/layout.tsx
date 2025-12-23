import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Standing Bear | AI Solutions. Built to Stand.",
  description:
    "Standing Bear is an AI application development and consulting company. We build intelligent applications and provide expert consulting to help businesses harness the power of AI.",
  keywords: [
    "AI development",
    "AI consulting",
    "machine learning",
    "custom AI applications",
    "AWS",
    "Houston",
    "Texas",
  ],
  authors: [{ name: "Standing Bear" }],
  openGraph: {
    title: "Standing Bear | AI Solutions. Built to Stand.",
    description:
      "AI application development and consulting. From concept to production, we deliver solutions that endure.",
    type: "website",
    url: "https://standingbear.ai",
    siteName: "Standing Bear",
  },
  twitter: {
    card: "summary_large_image",
    title: "Standing Bear | AI Solutions. Built to Stand.",
    description:
      "AI application development and consulting. From concept to production, we deliver solutions that endure.",
  },
  metadataBase: new URL("https://standingbear.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
