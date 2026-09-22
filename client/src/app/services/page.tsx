"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Layers,
  Code2,
  Cloud,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { visuals } from "@/content/visuals";
import { ServiceCard } from "@/components/ServiceCard";
import { api } from "@/lib/api";
import type { Service } from "@/lib/types";
export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState("All services");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");
    api<Service[]>("/services", {
      signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]),
    })
      .then(setServices)
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">
              INDEPENDENT THINKING. EXCEPTIONAL DIGITAL.
            </span>
            <h1>
              Your next idea.
              <br />
              Our next <span>great build.</span>
            </h1>
            <p>
              From first impression to final deployment. We bring design,
              development, and technology together to move your business
              forward.
            </p>
            <a href="#services" className="primary">
              Find your service <ArrowUpRight size={20} />
            </a>
            <div className="hero-notes">
              <span>
                <Check size={16} /> Clear package pricing
              </span>
              <span>
                <Check size={16} /> Built for your ambition
              </span>
            </div>
          </motion.div>
        </div>
        <div className="hero-art">
          <AssetImage
            asset={visuals.studio}
            priority
            sizes="(max-width: 760px) 100vw, 50vw"
          />
          <div className="hero-caption">
            <span>
              GOOD IDEAS DESERVE
              <br />
              GREAT EXECUTION.
            </span>
            <ArrowUpRight size={44} />
          </div>
          <div className="art-label">STRATEGY / DESIGN / DEVELOPMENT</div>
        </div>
      </section>
      <div className="disciplines">
        <div className="container">
          <span>
            <Layers /> Design with purpose
          </span>
          <span>
            <Code2 /> Build with precision
          </span>
          <span>
            <Cloud /> Launch with confidence
          </span>
        </div>
      </div>
      <section className="container services-section" id="services">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE RIGHT EXPERTISE, READY TO GO</span>
            <h2>Small starts. Big possibilities.</h2>
          </div>
          <p>
            Choose your next step.
            <br />
            We’ll take care of the craft.
          </p>
        </div>
        <div className="filters" role="group" aria-label="Filter services">
          {["All services", "Design", "Development", "Infrastructure"].map(
            (f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ),
          )}
        </div>
        {loading ? (
          <div
            className="service-grid"
            aria-label="Loading services"
            aria-busy="true"
          >
            {[1, 2, 3].map((i) => (
              <div className="skeleton" key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="error-state" role="alert">
            <h3>We couldn’t load the services.</h3>
            <p>{error}</p>
            <button className="primary" onClick={() => setAttempt(attempt + 1)}>
              Try again
            </button>
          </div>
        ) : services.length === 0 ? (
          <p>No services are available yet.</p>
        ) : (
          <div className="service-grid">
            {services
              .filter((s) => filter === "All services" || s.category === filter)
              .map((s, i) => (
                <ServiceCard key={s.id} service={s} index={i} />
              ))}
          </div>
        )}
      </section>
      <section className="approach container" id="approach">
        <div>
          <span className="eyebrow">LESS FRICTION. MORE FORWARD.</span>
          <h2>
            From “what if”
            <br />
            to what’s next.
          </h2>
          <ArrowDown size={32} />
        </div>
        <div className="approach-steps">
          {[
            [
              "01",
              "Make it yours",
              "Choose the services that fit your goals and review your package.",
            ],
            [
              "02",
              "Align on the details",
              "Agree on scope, milestones, and timing before work begins.",
            ],
            [
              "03",
              "Bring it to life",
              "Design, build, refine, and launch with a clear path forward.",
            ],
          ].map(([n, title, description]) => (
            <div key={n}>
              <span>{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
