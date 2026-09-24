import type { Project } from "@/content/portfolio";
import { AssetImage } from "./AssetImage";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <AssetImage
      asset={project.visual}
      className="project-asset"
      sizes="(max-width: 760px) 100vw, (max-width: 1336px) 50vw, 600px"
    />
  );
}
