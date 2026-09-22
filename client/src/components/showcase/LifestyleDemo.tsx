"use client";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Compass,
  Footprints,
  Mountain,
  Tent,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { journeys } from "@/content/demo-content";
import { DemoAction } from "./DemoAction";
export function LifestyleDemo() {
  const [pace, setPace] = useState("All");
  return (
    <>
      <nav className="demo-nav lifestyle-nav" aria-label="Roam navigation">
        <a href="#roam-home" className="demo-brand">
          <Mountain size={29} />
          ROAM<span>GO A LITTLE FURTHER.</span>
        </a>
        <div>
          <a href="#journeys">The journeys</a>
          <a href="#our-way">Our way</a>
        </div>
        <a className="demo-button" href="#journeys">
          Find your outside <ArrowUpRight size={16} />
        </a>
      </nav>
      <section className="lifestyle-hero" id="roam-home">
        <AssetImage asset={visuals.lifestyle} priority sizes="100vw" />
        <div className="demo-wrap">
          <span className="demo-overline">SMALL GROUPS. BIG LANDSCAPES.</span>
          <h1>
            LESS SCROLLING.
            <br />
            MORE
            <br />
            <em>WANDERING.</em>
          </h1>
          <p>
            For the mornings you’ll remember.
            <br />
            And the paths you haven’t found yet.
          </p>
          <a className="demo-button" href="#journeys">
            Let’s get out there <ArrowDownRight size={20} />
          </a>
        </div>
        <div className="roam-hero-bottom">
          <span>TAKE THE LONG WAY HOME.</span>
          <span>GOOD COMPANY. OPEN COUNTRY.</span>
        </div>
      </section>
      <section id="our-way" className="roam-story demo-wrap">
        <span className="demo-overline">
          YOU DON’T HAVE TO GO FAR TO FEEL DIFFERENT.
        </span>
        <h2>
          A little fresh air.
          <br />A whole new <em>perspective.</em>
        </h2>
        <div>
          <p>
            We take small groups into big, beautiful places. No racing to the
            summit. No packed itineraries. Just good trails, local guides, and
            the kind of company that makes the miles feel shorter.
          </p>
          <div className="roam-values">
            <span>
              <Compass size={21} /> Locally guided
            </span>
            <span>
              <Footprints size={21} /> Your kind of pace
            </span>
            <span>
              <Tent size={21} /> Leave it better
            </span>
          </div>
        </div>
      </section>
      <section id="journeys" className="roam-journeys">
        <div className="demo-wrap">
          <div className="demo-section-heading">
            <div>
              <span className="demo-overline">
                YOUR NEXT GOOD STORY STARTS HERE.
              </span>
              <h2>PICK YOUR PATH.</h2>
            </div>
            <div className="roam-filters" role="group" aria-label="Filter by pace">
              {["All", "Gentle", "Moderate", "Challenging"].map((item) => (
                <button
                  key={item}
                  aria-pressed={pace === item}
                  onClick={() => setPace(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="journey-grid">
            {journeys
              .filter((journey) => pace === "All" || journey.type === pace)
              .map((journey) => (
                <article key={journey.name}>
                  <div className="journey-image">
                    <AssetImage
                      asset={journey.visual}
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                    <span>{journey.type} pace</span>
                  </div>
                  <div className="journey-copy">
                    <span className="demo-overline">
                      {journey.duration} · {journey.terrain}
                    </span>
                    <h3>{journey.name}</h3>
                    <p>{journey.description}</p>
                    <div>
                      <span>
                        From <strong>£{journey.price}</strong> / person
                      </span>
                      <DemoAction
                        label="Take a look"
                        title={journey.name}
                        detail={
                          journey.duration +
                          " · " +
                          journey.type +
                          " pace · From £" +
                          journey.price +
                          " per person"
                        }
                        kind="booking"
                      />
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>
      <section className="roam-signoff demo-wrap">
        <Compass size={40} />
        <h2>
          THE OUTSIDE
          <br />
          IS CALLING.
        </h2>
        <DemoAction
          label="Find a journey for me"
          title="Where do you want to wander?"
          detail="Tell us a little about yourself. A real guide would help you find a journey that fits."
        />
        <p>
          No perfect gear. No perfect plan.
          <br />
          Just a little curiosity.
        </p>
      </section>
      <footer className="lifestyle-footer demo-wrap">
        <strong>ROAM</strong>
        <span>Leave only footprints. Take the good memories.</span>
        <a href="#journeys">Find your path ↗</a>
      </footer>
    </>
  );
}
