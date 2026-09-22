import type { Metadata } from "next";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { CallToAction } from "@/components/portfolio/CallToAction";
import { PageIntro } from "@/components/portfolio/PageIntro";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
export const metadata: Metadata = {
  title: "Project concepts — Kumar Thapa",
  description:
    "Explore RFID, fleet, billing, and inventory software concepts designed around everyday business workflows.",
};
export default function ProjectsPage() {
  return (
    <main id="main" className="portfolio">
      <div className="pf-container">
        <PageIntro
          eyebrow="CONNECTED THINKING. PRACTICAL SOFTWARE."
          title={
            <>
              Built around
              <br />
              <span>the way you work.</span>
            </>
          }
          description="Software and connected systems for the challenges behind the scenes. Explore concepts for manufacturing, logistics, retail, and everyday operations."
          note="Illustrative project concepts · Sample interfaces and data"
          visual={
            <AssetImage
              asset={visuals.studio}
              priority
              sizes="(max-width: 900px) 100vw, (max-width: 1336px) 50vw, 600px"
            />
          }
        />
        <WorkGallery kind="projects" />
        <CallToAction />
      </div>
    </main>
  );
}
