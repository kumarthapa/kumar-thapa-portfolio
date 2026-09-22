import type { Metadata } from "next";
import { WorkGallery } from "@/components/portfolio/WorkGallery";
import { CallToAction } from "@/components/portfolio/CallToAction";
import { PageIntro } from "@/components/portfolio/PageIntro";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
export const metadata: Metadata = {
  title: "Website showcase — Kumar Thapa",
  description:
    "Six original interactive website concepts for wellness, restaurants, hospitality, retail, SaaS, and outdoor experiences.",
};
export default function ShowcasePage() {
  return (
    <main id="main" className="portfolio">
      <div className="pf-container">
        <PageIntro
          eyebrow="A SMALL COLLECTION OF BIG POSSIBILITIES"
          title={
            <>
              Your business.
              <br />
              <span>Beautifully online.</span>
            </>
          }
          description="Every industry has its own story. These original website concepts show how design, content, and thoughtful interactions can bring yours to life."
          note="Six fictional brands · Original designs · Interactive demos"
          visual={
            <div className="showcase-intro-images">
              <AssetImage
                asset={visuals.spa}
                priority
                sizes="(max-width: 900px) 65vw, 380px"
              />
              <AssetImage
                asset={visuals.restaurant}
                sizes="(max-width: 900px) 35vw, 220px"
              />
              <AssetImage
                asset={visuals.hotel}
                sizes="(max-width: 900px) 35vw, 220px"
              />
            </div>
          }
        />
        <WorkGallery kind="showcase" />
        <CallToAction />
      </div>
    </main>
  );
}
