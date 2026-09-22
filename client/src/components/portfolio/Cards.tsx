import Link from "next/link";
import { ArrowUpRight, ArrowRight, LockKeyhole } from "lucide-react";
import type { Project, Showcase } from "@/content/portfolio";
import { ProjectVisual } from "./ProjectVisual";
import { AssetImage } from "./AssetImage";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="work-card">
      <Link
        href={`/projects/${project.slug}`}
        className="card-visual-link"
        aria-label={`View ${project.title} concept`}
      >
        <ProjectVisual project={project} />
      </Link>
      <div className="work-card-body">
        <div className="card-kicker">
          <span>{project.category}</span>
          <span>CONCEPT</span>
        </div>
        <h2>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h2>
        <p>{project.description}</p>
        <div className="card-bottom">
          <Link href={`/projects/${project.slug}`} className="text-link">
            Explore project <ArrowRight size={16} />
          </Link>
          <span className="card-round-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </article>
  );
}

export function ShowcasePreview({ showcase }: { showcase: Showcase }) {
  return (
    <div
      className={`showcase-preview preview-${showcase.visualKey}`}
      aria-hidden="true"
    >
      <div className="browser-chrome">
        <span>
          <i />
          <i />
          <i />
        </span>
        <small>
          <LockKeyhole size={8} />
          {showcase.brand.toLowerCase().replaceAll(" ", "")}.example
        </small>
        <span>↗</span>
      </div>
      <div className="mini-website">
        <div className="mini-nav">
          <strong>{showcase.brand}</strong>
          <span>
            Our story &nbsp; Explore &nbsp; <b>Discover ↗</b>
          </span>
        </div>
        <div className="mini-hero">
          <AssetImage
            asset={{ ...showcase.visual, alt: "" }}
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="mini-copy">
            <span>{showcase.subtitle}</span>
            <strong>{showcase.headline}</strong>
            <em>
              {showcase.visualKey === "retail"
                ? "Shop the collection"
                : showcase.visualKey === "restaurant"
                  ? "Explore the menu"
                  : "Discover more"}{" "}
              ↗
            </em>
          </div>
        </div>
        <div className="mini-foot">
          {showcase.direction}
          <span>Thoughtfully made. Beautifully experienced.</span>
        </div>
      </div>
    </div>
  );
}

export function ShowcaseCard({ showcase }: { showcase: Showcase }) {
  return (
    <article className="work-card showcase-card">
      <Link
        className="card-visual-link"
        href={`/showcase/${showcase.slug}`}
        aria-label={`Open ${showcase.brand} ${showcase.category} demo`}
      >
        <ShowcasePreview showcase={showcase} />
      </Link>
      <div className="work-card-body">
        <div className="card-kicker">
          <span>{showcase.category}</span>
          <span>WEBSITE CONCEPT</span>
        </div>
        <h2>
          <Link href={`/showcase/${showcase.slug}`}>{showcase.title}</Link>
        </h2>
        <p>{showcase.description}</p>
        <div className="card-bottom">
          <Link href={`/showcase/${showcase.slug}`} className="text-link">
            Explore live demo <ArrowRight size={16} />
          </Link>
          <span className="card-round-arrow" aria-hidden="true">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </article>
  );
}
