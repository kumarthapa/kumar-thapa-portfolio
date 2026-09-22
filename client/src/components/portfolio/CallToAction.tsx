import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="pf-cta">
      <div className="cta-symbol">
        <Sparkles size={30} />
      </div>
      <div>
        <span className="pf-eyebrow">YOUR NEXT CHAPTER</span>
        <h2>
          Have something in mind?
          <br />
          <span>Let’s make it work.</span>
        </h2>
        <p>
          A new website, a smarter workflow, or an idea ready to become a
          product.
        </p>
      </div>
      <Link href="/contact" className="pf-button">
        Let’s talk about it <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
