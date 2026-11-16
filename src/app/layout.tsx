import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Crimson_Pro } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const heading = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Quillcheck — AI writing detection", template: "%s · Quillcheck" },
  description:
    "Check essays and documents for AI-generated writing. Sentence-level highlighting, clear explanations and shareable reports.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:shadow"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="no-print border-t border-border py-6 text-center text-sm text-muted-foreground">
          <p className="mx-auto max-w-3xl px-4">
            AI detection is probabilistic. Results are an indicator to inform a conversation, never
            proof of misconduct on their own.
          </p>
        </footer>
      </body>
    </html>
  );
}
