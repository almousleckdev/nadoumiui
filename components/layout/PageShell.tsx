import { type ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Hero from "@/components/ui/Hero";
import { cn } from "@/utils/cn";

interface PageShellProps {
  title: string;
  description?: string;
  eyebrow?: string;
  heroActions?: ReactNode;
  /** Override the content area background, e.g. "bg-gray-50 min-h-screen". Defaults to white. */
  mainClassName?: string;
  children: ReactNode;
}

export function PageShell({ title, description, eyebrow, heroActions, mainClassName, children }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main className={cn("flex-grow font-sans pb-20", mainClassName ?? "bg-white")}>
        <Hero title={title} description={description} eyebrow={eyebrow}>
          {heroActions}
        </Hero>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default PageShell;
