import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Radio,
  Smartphone,
  PenTool,
  Check,
  Sparkles,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { ProjectCard, ShowcaseCard } from "@/components/portfolio/Cards";
import { CallToAction } from "@/components/portfolio/CallToAction";
import { projects, showcases } from "@/content/portfolio";
import { visuals } from "@/content/visuals";
const capabilities = [
  { Icon: Code2, title: "Web & software", copy: "Built around your business" },
  {
    Icon: Smartphone,
    title: "Mobile experiences",
    copy: "Useful wherever you work",
  },
  {
    Icon: Radio,
    title: "Connected systems",
    copy: "RFID, tracking & operations",
  },
  {
    Icon: PenTool,
    title: "Design & experience",
    copy: "Clarity in every interaction",
  },
];
export default function Home() {
  return (
    <main id="main" className="portfolio">
      <section className="pf-hero">
        <div className="hero-art">
          <AssetImage
            asset={visuals.studio}
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
        </div>
        <div className="pf-container hero-content">
          <span className="pf-eyebrow">
            <i /> DESIGNER · DEVELOPER · SOLUTION PROVIDER
          </span>
          <h1>
            Ideas made real.
            <br />
            Businesses made
            <br />
            <span>better.</span>
          </h1>
          <p>
            I’m Kumar Thapa. I design and build websites, applications, and
            connected systems that make everyday business work better.
          </p>
          <div className="pf-actions">
            <Link className="pf-button" href="/projects">
              Explore projects <ArrowRight size={18} />
            </Link>
            <Link className="pf-button pf-secondary" href="/showcase">
              Discover the showcase <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="hero-signoff">
            <span>Thoughtful design.</span>
            <span>Practical engineering.</span>
            <span>Real purpose.</span>
          </div>
        </div>
        <div className="hero-art-note">
          FROM THE FIRST IDEA TO THE FINAL DETAIL{" "}
          <span>01 / DIGITAL CRAFT</span>
        </div>
      </section>
      <div className="pf-container">
        <section className="capability-strip" aria-label="Areas of expertise">
          {capabilities.map(({ Icon, title, copy }) => (
            <div key={title}>
              <Icon size={25} />
              <div>
                <h2>{title}</h2>
                <p>{copy}</p>
              </div>
            </div>
          ))}
        </section>
        <section className="pf-section">
          <div className="section-heading">
            <div>
              <span className="pf-eyebrow">SOFTWARE WITH A PURPOSE</span>
              <h2>
                Complex workflows.
                <br />
                <span>Clearer solutions.</span>
              </h2>
            </div>
            <div>
              <p>
                From the factory floor to the checkout counter, explore how
                thoughtful software can connect the dots.
              </p>
              <Link className="text-link" href="/projects">
                All projects <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div className="work-grid">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
        <section className="pf-section">
          <div className="section-heading">
            <div>
              <span className="pf-eyebrow">
                DIFFERENT BUSINESSES. DISTINCT IDENTITIES.
              </span>
              <h2>
                A website that feels
                <br />
                <span>like your business.</span>
              </h2>
            </div>
            <div>
              <p>
                Six original website concepts. Six different personalities. Open
                a demo and see what your next chapter could look like.
              </p>
              <Link className="text-link" href="/showcase">
                Explore the showcase <ArrowRight size={17} />
              </Link>
            </div>
          </div>
          <div className="work-grid">
            {showcases.slice(0, 2).map((showcase) => (
              <ShowcaseCard key={showcase.slug} showcase={showcase} />
            ))}
          </div>
        </section>
        <section className="about-bento pf-section">
          <div className="about-intro">
            <span className="pf-eyebrow">THE PERSON BEHIND THE PIXELS</span>
            <h2>
              Hi, I’m Kumar.
              <br />
              <span>A builder at heart.</span>
            </h2>
            <p>
              I bring design and development together to turn a complicated
              brief into something people enjoy using. I care about the details,
              but I always start with the problem.
            </p>
            <Link className="text-link" href="/about">
              A little more about me <ArrowRight size={17} />
            </Link>
          </div>
          <div className="skills-panel">
            <Sparkles size={26} />
            <h3>
              The right tools.
              <br />
              The right approach.
            </h3>
            <div className="tech-tags">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "PHP / Laravel",
                "PostgreSQL",
                "Docker",
                "Figma",
              ].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <p>
              <Check size={16} /> Design, development, and the details in
              between.
            </p>
          </div>
        </section>
        <CallToAction />
      </div>
    </main>
  );
}
