import { FileSearch, Highlighter, History } from "lucide-react";
import { Scanner } from "@/components/scanner";

const features = [
  {
    icon: Highlighter,
    title: "Sentence-level highlighting",
    body: "See exactly which sentences read as machine-written and why, not just a single number.",
  },
  {
    icon: FileSearch,
    title: "PDF, Word and text files",
    body: "Upload a submission as it was handed in, or paste text straight from any source.",
  },
  {
    icon: History,
    title: "Reports and history",
    body: "Save every scan to your account and download a printable report to share.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="no-print mb-8 max-w-2xl">
        <h1 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Was this written by a person or by AI?
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Check essays, articles and assignments for AI-generated writing, with the evidence behind
          every result.
        </p>
      </div>

      <Scanner />

      <ul className="no-print mt-12 grid gap-8 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <li key={title}>
            <Icon aria-hidden className="size-6 text-accent" />
            <h2 className="mt-3 font-serif text-xl font-semibold">{title}</h2>
            <p className="mt-1 text-muted-foreground">{body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
