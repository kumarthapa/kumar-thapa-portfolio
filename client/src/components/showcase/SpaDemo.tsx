import { Leaf, Flower2, Waves, ArrowDown } from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { spaTreatments } from "@/content/demo-content";
import { DemoAction } from "./DemoAction";
export function SpaDemo() {
  return (
    <>
      <nav className="demo-nav spa-nav" aria-label="Avela navigation">
        <a href="#avela-home" className="demo-brand">
          avela<span>SPA & WELLNESS</span>
        </a>
        <div>
          <a href="#rituals">Our rituals</a>
          <a href="#philosophy">Our philosophy</a>
        </div>
        <DemoAction
          label="Find your calm"
          title="A moment, just for you."
          kind="booking"
        />
      </nav>
      <section className="spa-hero demo-wrap" id="avela-home">
        <div>
          <span className="demo-overline">A SLOWER KIND OF SELF-CARE</span>
          <h1>
            Come back
            <br />
            to <em>yourself.</em>
          </h1>
          <p>
            Step out of the everyday. Settle into thoughtful rituals, warm
            water, and a little space to breathe.
          </p>
          <DemoAction
            label="Explore your ritual"
            title="Let’s find your ritual."
            detail="Tell us when you’d like to visit. A therapist would help you choose a treatment on the live website."
            kind="booking"
          />
          <div className="spa-hero-note">
            <Leaf size={21} />
            <span>
              Rooted in nature.
              <br />
              Made for your moment.
            </span>
          </div>
        </div>
        <div className="spa-hero-image">
          <AssetImage
            asset={visuals.spa}
            priority
            sizes="(max-width: 760px) 100vw, 55vw"
          />
          <span>INHALE. EXHALE. BEGIN AGAIN.</span>
        </div>
      </section>
      <section className="spa-philosophy demo-wrap" id="philosophy">
        <Flower2 size={33} />
        <span className="demo-overline">WELLNESS, WITHOUT THE RUSH</span>
        <h2>
          Sometimes, the best thing
          <br />
          you can do is <em>less.</em>
        </h2>
        <p>
          We believe care should feel personal. Our treatments take their cue
          from nature and from you, with gentle ingredients, attentive hands,
          and enough time to truly switch off.
        </p>
        <a href="#rituals" className="demo-text-link">
          Discover a gentler pace <ArrowDown size={17} />
        </a>
      </section>
      <section className="spa-rituals" id="rituals">
        <div className="demo-wrap">
          <div className="demo-section-heading">
            <div>
              <span className="demo-overline">
                A LITTLE CARE GOES A LONG WAY
              </span>
              <h2>Your moment of calm.</h2>
            </div>
            <Waves size={35} />
          </div>
          <div className="spa-treatment-grid">
            {spaTreatments.map((ritual, i) => (
              <article key={ritual.name}>
                <span className="ritual-number">0{i + 1}</span>
                <h3>{ritual.name}</h3>
                <p>{ritual.description}</p>
                <div>
                  <span>{ritual.duration}</span>
                  <strong>£{ritual.price}</strong>
                </div>
                <DemoAction
                  label="Choose this ritual"
                  title={ritual.name}
                  detail={
                    ritual.duration +
                    " · £" +
                    ritual.price +
                    " · Sample treatment"
                  }
                  kind="booking"
                />
              </article>
            ))}
          </div>
        </div>
      </section>
      <footer className="spa-footer demo-wrap">
        <span className="demo-brand">avela</span>
        <p>Make a little room for you.</p>
        <a href="#avela-home">Back to the calm ↑</a>
      </footer>
    </>
  );
}
