import type { Metadata } from "next";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { CallToAction } from "@/components/portfolio/CallToAction";
import { PageIntro } from "@/components/portfolio/PageIntro";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { projectImages } from "@/content/visuals";
export const metadata: Metadata = {
  title: "Software projects — Kumar Thapa",
  description:
    "Explore manufacturing, RFID tracking, fleet, POS, inventory, B2B, CRM, and laundry software projects.",
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
          description="Software and connected systems for the challenges behind the scenes. Explore projects for manufacturing, logistics, retail, and everyday operations."
          note="Manufacturing · Tracking · Business software"
          visual={
            <AssetImage
              asset={projectImages.b2b}
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
