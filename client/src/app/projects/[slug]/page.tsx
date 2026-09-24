import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/content/portfolio";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { CallToAction } from "@/components/portfolio/CallToAction";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project ? project.title + " — Kumar Thapa" : "Project not found",
    description: project?.description,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const images = [project.visual, ...(project.gallery ?? [])];
  return (
    <main id="main" className="portfolio">
      <div className="pf-container">
        <header className="page-intro project-intro">
          <Link className="back-link" href="/projects">
            <ArrowLeft size={16} /> All projects
          </Link>
          <span className="pf-eyebrow">{project.category}</span>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </header>
        <div className="project-showroom">
          {images.map((asset, index) => (
            <figure className="project-figure" key={asset.src}>
              <a
                className="project-screenshot"
                style={{ aspectRatio: `${asset.width} / ${asset.height}` }}
                href={asset.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${asset.caption} full size (opens in a new tab)`}
              >
                <AssetImage
                  asset={asset}
                  priority={index === 0}
                  sizes="(max-width: 1336px) 100vw, 1240px"
                />
              </a>
              <figcaption>
                <span>{asset.caption}</span>
                <a
                  className="text-link"
                  href={asset.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${asset.caption} full size (opens in a new tab)`}
                >
                  View full size <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
        <section className="project-story pf-section">
          <div>
            <span className="pf-eyebrow">01 / THE CHALLENGE</span>
            <h2>{project.eyebrow}</h2>
            <p>{project.challenge}</p>
          </div>
          <div>
            <span className="pf-eyebrow">02 / THE APPROACH</span>
            <h2>A more connected workflow.</h2>
            <p>{project.approach}</p>
          </div>
        </section>
        <section className="project-features">
          <div>
            <span className="pf-eyebrow">DESIGNED TO SUPPORT</span>
            <h2>
              Inside the
              <br />
              workflow.
            </h2>
          </div>
          <ul>
            {project.features.map((feature) => (
              <li key={feature}>
                <CheckCircle2 size={20} />
                {feature}
              </li>
            ))}
          </ul>
        </section>
        <section className="project-stack">
          <span className="pf-eyebrow">PROPOSED TOOLKIT</span>
          <div className="tech-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>
            Scope, integrations, and technology would be confirmed around your
            business requirements.
          </p>
        </section>
        <Link className="next-project" href={"/projects/" + next.slug}>
          <span>
            EXPLORE ANOTHER PROJECT<strong>{next.title}</strong>
          </span>
          <ArrowRight size={30} />
        </Link>
        <CallToAction />
      </div>
    </main>
  );
}
