import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Code2, Compass, PenTool, Rocket } from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { CallToAction } from "@/components/portfolio/CallToAction";
import { PageIntro } from "@/components/portfolio/PageIntro";
import { visuals } from "@/content/visuals";
export const metadata: Metadata = {
  title: "About Kumar — Designer & developer",
};
const process = [
  {
    Icon: Compass,
    title: "Discover",
    copy: "Understand the business, the people, and the problem worth solving.",
  },
  {
    Icon: PenTool,
    title: "Design",
    copy: "Shape the content, the journey, and a visual identity that fits.",
  },
  {
    Icon: Code2,
    title: "Develop",
    copy: "Build the experience and connect the systems it depends on.",
  },
  {
    Icon: Rocket,
    title: "Refine",
    copy: "Test real interactions, polish the details, and prepare for launch.",
  },
];
export default function AboutPage() {
  return (
    <main id="main" className="portfolio">
      <div className="pf-container">
        <PageIntro
          eyebrow="DESIGN MIND. DEVELOPER HANDS."
          title={
            <>
              Good ideas deserve
              <br />
              <span>thoughtful execution.</span>
            </>
          }
          description="I’m Kumar Thapa, a designer and developer focused on websites, applications, and software that solves practical business problems."
          visual={
            <AssetImage
              asset={visuals.studio}
              priority
              sizes="(max-width: 900px) 100vw, (max-width: 1336px) 50vw, 600px"
            />
          }
        />
        <section className="about-story">
          <div>
            <span className="pf-eyebrow">HOW I THINK ABOUT THE WORK</span>
            <h2>
              Understand first.
              <br />
              Build with purpose.
            </h2>
          </div>
          <div>
            <p>
              A useful product starts with understanding the people who need it.
              I connect the visual experience with the systems behind it, so the
              result feels clear on the surface and works reliably underneath.
            </p>
            <p>
              Whether it’s a small business website or a connected operations
              dashboard, my approach is the same: ask good questions, simplify
              the workflow, and give every detail a reason to be there.
            </p>
            <Link href="/contact" className="text-link">
              Tell me what you’re building <ArrowRight size={17} />
            </Link>
          </div>
        </section>
        <section className="pf-section">
          <div className="section-heading">
            <div>
              <span className="pf-eyebrow">FROM BRIEF TO BROWSER</span>
              <h2>A clear path forward.</h2>
            </div>
          </div>
          <div className="process-grid">
            {process.map(({ Icon, title, copy }, i) => (
              <article key={title}>
                <div>
                  <Icon size={24} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <CallToAction />
      </div>
    </main>
  );
}
