"use client";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { projects, showcases } from "@/content/portfolio";
import { ProjectCard, ShowcaseCard } from "./Cards";

export function WorkGallery({ kind }: { kind: "projects" | "showcase" }) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const items = kind === "projects" ? projects : showcases;
  const categories = ["All", ...new Set(items.map((item) => item.category))];
  const matches = (item: {
    title: string;
    category: string;
    description: string;
    brand?: string;
  }) =>
    (category === "All" || item.category === category) &&
    `${item.title} ${item.category} ${item.description} ${item.brand || ""}`
      .toLowerCase()
      .includes(search.toLowerCase().trim());
  const count = items.filter(matches).length;
  return (
    <section
      className="gallery"
      aria-label={
        kind === "projects" ? "Project concepts" : "Showcase websites"
      }
    >
      <div className="gallery-toolbar">
        <div className="gallery-filters" role="group" aria-label="Filter by industry">
          {categories.map((item) => (
            <button
              key={item}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className="gallery-search">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Find your industry"
            aria-label={`Search ${kind}`}
          />
        </label>
      </div>
      <div className="gallery-caption">
        <span role="status">
          {count}{" "}
          {kind === "projects"
            ? "project concept"
            : "original website concept"}{count === 1 ? "" : "s"}
        </span>
        <span>
          <SlidersHorizontal size={13} /> Designed for real-world needs
        </span>
      </div>
      <div className="work-grid">
        {kind === "projects"
          ? projects
              .filter(matches)
              .map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))
          : showcases
              .filter(matches)
              .map((showcase) => (
                <ShowcaseCard key={showcase.slug} showcase={showcase} />
              ))}
      </div>
      {count === 0 ? (
        <div className="gallery-empty">
          <Search size={30} />
          <h2>No matches just yet.</h2>
          <p>
            Try another industry or clear your filters to explore all the
            concepts.
          </p>
          <button
            className="pf-button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : null}
    </section>
  );
}
