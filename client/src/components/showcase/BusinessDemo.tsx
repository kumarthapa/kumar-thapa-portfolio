"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Layers3,
  MoveUpRight,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { DemoAction } from "./DemoAction";
export function BusinessDemo() {
  const [annual, setAnnual] = useState(false);
  return (
    <>
      <nav className="demo-nav business-nav" aria-label="Orbit navigation">
        <a href="#orbit-home" className="demo-brand">
          <span className="orbit-mark" />
          orbit
        </a>
        <div>
          <a href="#features">Why orbit</a>
          <a href="#pricing">Pricing</a>
          <a href="#questions">Questions</a>
        </div>
        <DemoAction
          label="Try orbit"
          title="A fresh start for your team."
          kind="trial"
        />
      </nav>
      <section className="business-hero demo-wrap" id="orbit-home">
        <div>
          <span className="orbit-label">
            <Sparkles size={13} /> BIG IDEAS NEED A LITTLE SPACE.
          </span>
          <h1>
            Make room for
            <br />
            your <span>best work.</span>
          </h1>
          <p>
            Your projects, plans, and people, together in one calm workspace.
            Less chasing updates. More moving things forward.
          </p>
          <DemoAction
            label="Find your flow"
            title="Your next project starts here."
            kind="trial"
          />
          <span className="business-microcopy">
            A workspace that works the way you do.
          </span>
        </div>
        <div className="business-art">
          <AssetImage
            asset={visuals.business}
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="orbit-task">
            <span>
              <CheckCircle2 size={18} /> Website launch
            </span>
            <strong>Good work is taking shape.</strong>
            <div>
              <i />
              <i />
              <i />
              <span>
                Ready for the next step <MoveUpRight size={13} />
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="business-marquee demo-wrap">
        <span>FOR TEAMS WHO MAKE THINGS HAPPEN</span>
        <strong>Creative studios</strong>
        <strong>Small businesses</strong>
        <strong>Independent makers</strong>
      </div>
      <section id="features" className="business-features demo-wrap">
        <div className="demo-section-heading">
          <div>
            <span className="demo-overline">LESS FRICTION. MORE FOCUS.</span>
            <h2>
              Everything in its place.
              <br />
              Everyone on the same page.
            </h2>
          </div>
          <p>
            A little structure goes a long way.
            <br />
            Keep the useful bits. Skip the busywork.
          </p>
        </div>
        <div className="orbit-feature-grid">
          <article>
            <Layers3 size={29} />
            <h3>See the whole picture.</h3>
            <p>
              Bring tasks, timelines, and decisions together. Know what’s moving
              and what needs a hand.
            </p>
            <div className="orbit-board">
              <span>UP NEXT</span>
              <div>
                Refine the first concept <i />
              </div>
              <div>
                Review with the team <i />
              </div>
              <div>
                Share the next version <i />
              </div>
            </div>
          </article>
          <article>
            <Zap size={29} />
            <h3>Keep your momentum.</h3>
            <p>
              Give every task a clear owner and a sensible next step. Spend less
              time figuring out what comes next.
            </p>
            <div className="orbit-checklist">
              <span>
                <Check size={15} /> Brief in place
              </span>
              <span>
                <Check size={15} /> Team aligned
              </span>
              <span>
                <Plus size={15} /> Something great, in progress
              </span>
            </div>
          </article>
          <article>
            <Sparkles size={29} />
            <h3>Make it your space.</h3>
            <p>
              Start simple, then shape your workspace around your team. A place
              for your projects to feel at home.
            </p>
            <div className="orbit-colors">
              <i />
              <i />
              <i />
              <span>
                Your team.
                <br />
                Your rhythm.
              </span>
            </div>
          </article>
        </div>
      </section>
      <section id="pricing" className="business-pricing demo-wrap">
        <div>
          <span className="demo-overline">SMALL TEAM. BIG POSSIBILITIES.</span>
          <h2>
            Room to grow.
            <br />
            <span>Without the guesswork.</span>
          </h2>
          <p>Start with the essentials. Add more space as your work grows.</p>
          <div className="billing-toggle" role="group" aria-label="Billing period">
            <button aria-pressed={!annual} onClick={() => setAnnual(false)}>
              Monthly
            </button>
            <button aria-pressed={annual} onClick={() => setAnnual(true)}>
              Yearly <span>Save 25%</span>
            </button>
          </div>
        </div>
        <article>
          <span className="demo-overline">THE TEAM PLAN</span>
          <div className="orbit-price" aria-live="polite">
            <strong>£{annual ? 9 : 12}</strong>
            <span>
              per person / month
              <br />
              {annual ? "£108 billed yearly" : "billed monthly"}
            </span>
          </div>
          <ul>
            {[
              "Unlimited projects and tasks",
              "Shared notes and project spaces",
              "Flexible boards and timelines",
              "Friendly email support",
            ].map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
          <DemoAction
            label="Picture your team here"
            title="Let’s set up your workspace."
            detail={
              (annual ? "Yearly" : "Monthly") + " team plan · Sample pricing"
            }
            kind="trial"
          />
        </article>
      </section>
      <section id="questions" className="business-faq demo-wrap">
        <h2>A few good questions.</h2>
        {[
          [
            "Who is orbit for?",
            "This concept is designed for small teams, independent studios, and people who need a simple home for their projects.",
          ],
          [
            "Can I try the workspace?",
            "You can explore the sign-up form in this demo. A live product workspace and account creation would be connected in a production build.",
          ],
          [
            "Can we bring our existing projects?",
            "The proposed product would support a guided import. Exact formats and integrations would be confirmed during product development.",
          ],
        ].map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <Plus size={18} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <footer className="business-footer demo-wrap">
        <strong>orbit</strong>
        <span>Good work needs a little space.</span>
        <a href="#orbit-home">
          Back to the big picture <ArrowUpRight size={16} />
        </a>
      </footer>
    </>
  );
}
