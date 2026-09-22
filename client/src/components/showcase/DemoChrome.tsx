import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Showcase } from "@/content/portfolio";
export function DemoChrome({
  showcase,
  children,
}: {
  showcase: Showcase;
  children: React.ReactNode;
}) {
  return (
    <div className={"demo-site demo-" + showcase.visualKey}>
      <div className="demo-toolbar">
        <Link href="/showcase">
          <ArrowLeft size={14} />
          <span>Back to showcase</span>
        </Link>
        <span>
          {showcase.category}
          <i /> WEBSITE CONCEPT
        </span>
        <Link href="/contact">
          Build something like this <ArrowUpRight size={14} />
        </Link>
      </div>
      <main id="main">{children}</main>
      <div className="demo-credit">
        <p>
          An original website concept by <Link href="/">Kumar Thapa</Link>.
        </p>
        <span>
          Fictional brand · Generated imagery · Sample content and pricing
        </span>
        <Link href="/showcase">
          Explore all six designs <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
