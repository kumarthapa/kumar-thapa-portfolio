import type { Metadata } from "next";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Factory,
  Github,
  Linkedin,
  Mail,
  Radio,
  ReceiptText,
  Store,
  Truck,
  Utensils,
} from "lucide-react";
import { AssetImage } from "@/components/portfolio/AssetImage";
import { projects as portfolioProjects } from "@/content/portfolio";
import {
  profile,
  profileEducation,
  profileExperience,
  profileProjects,
  profileSkillGroups,
} from "@/content/profile";
import styles from "./profile.module.css";

export const metadata: Metadata = {
  title: "Kumar Thapa — Senior Software Developer",
  description:
    "Backend-focused Senior Software Developer with experience in PHP, Laravel, SQL, REST APIs, mobile integrations, and business systems.",
};

const portfolioVisuals = new Map(
  portfolioProjects.map((project) => [project.slug, project.visual] as const),
);

const projectIcons = {
  store: Store,
  factory: Factory,
  radio: Radio,
  truck: Truck,
  utensils: Utensils,
  receipt: ReceiptText,
};

export default function ProfilePage() {
  return (
    <div className={styles.page} id="top">
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label="Kumar Thapa profile home">
            <span className={styles.brandMark}>KT</span>
            <span>
              <strong>{profile.name}</strong>
              <small>{profile.title}</small>
            </span>
          </a>
          <nav className={styles.navigation} aria-label="Profile navigation">
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
          </nav>
          <a
            className={styles.headerContact}
            href={"mailto:" + profile.email}
            aria-label="Email Kumar Thapa"
          >
            Contact <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main className={styles.main} id="main">
        <section className={styles.hero} aria-labelledby="profile-heading">
          <div className={styles.heroGlow} aria-hidden="true" />
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>
                  <i aria-hidden="true" /> {profile.focus}
                </span>
                <h1 id="profile-heading">
                  Building dependable software for{" "}
                  <span>real-world operations.</span>
                </h1>
                <p className={styles.heroSummary}>{profile.summary}</p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryButton} href="#projects">
                    Explore selected projects <ArrowDownRight size={18} />
                  </a>
                  <a className={styles.secondaryButton} href={"mailto:" + profile.email}>
                    <Mail size={17} /> Email me
                  </a>
                </div>
                <div className={styles.socialLinks} role="group" aria-label="Professional links">
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    <Linkedin size={17} aria-hidden="true" /> LinkedIn
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    <Github size={17} aria-hidden="true" /> GitHub
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>

              <aside className={styles.heroAside} aria-label="Profile highlights">
                <div className={styles.asideTop}>
                  <span className={styles.asideIcon}>
                    <Code2 size={21} aria-hidden="true" />
                  </span>
                  <span className={styles.asideLabel}>Engineering focus</span>
                </div>
                <h2>Backend systems, APIs, and integrations.</h2>
                <div className={styles.asideRule} />
                <div className={styles.asideFact}>
                  <strong>5+</strong>
                  <span>years of hands-on software development</span>
                </div>
                <div className={styles.asideFact}>
                  <strong>2020</strong>
                  <span>joined Treewalker Technology</span>
                </div>
                <a href="#experience" className={styles.asideLink}>
                  View experience <ArrowRight size={16} />
                </a>
              </aside>
            </div>
            <div className={styles.heroFoot}>
              <span>BACKEND ENGINEERING</span>
              <span>DATA WORKFLOWS</span>
              <span>MOBILE & HARDWARE INTEGRATIONS</span>
            </div>
          </div>
        </section>

        <section className={styles.impactSection} aria-label="Selected impact">
          <div className={styles.container}>
            <div className={styles.impactCard}>
              <div className={styles.impactIcon}>
                <ArrowDownRight size={23} aria-hidden="true" />
              </div>
              <div className={styles.impactMetric}>
                <span>~4 min</span>
                <ArrowRight size={19} aria-hidden="true" />
                <strong>30–60 sec</strong>
              </div>
              <div className={styles.impactCopy}>
                <h2>Faster report generation</h2>
                <p>
                  Optimized a Laravel CSV/report export workflow, reducing
                  observed generation time from about four minutes to 30–60
                  seconds.
                </p>
              </div>
              <span className={styles.impactNote}>SELECTED ENGINEERING IMPACT</span>
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.projectsSection} id="projects">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionEyebrow}>SELECTED ENGINEERING WORK</span>
                <h2>Systems built around real workflows.</h2>
              </div>
              <p>
                Experience across retail, manufacturing, RFID, logistics, and
                point-of-sale systems. The visuals are portfolio representations;
                project notes describe my engineering contributions.
              </p>
            </div>

            <div className={styles.projectGrid}>
              {profileProjects.map((project, index) => {
                const Icon = projectIcons[project.icon];
                const visual = project.visualSlug
                  ? portfolioVisuals.get(project.visualSlug)
                  : undefined;

                return (
                  <article className={styles.projectCard} key={project.title}>
                    <figure
                      className={
                        styles.projectVisual +
                        (visual ? "" : " " + styles.projectVisualFallback)
                      }
                    >
                      {visual ? (
                        <AssetImage
                          asset={visual}
                          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        />
                      ) : (
                        <div className={styles.fallbackArt} aria-hidden="true">
                          <span>ENGINEERING / {project.category.toUpperCase()}</span>
                          <Icon size={44} strokeWidth={1.4} />
                          <strong>{project.title}</strong>
                        </div>
                      )}
                      <figcaption>PROJECT {String(index + 1).padStart(2, "0")}</figcaption>
                    </figure>
                    <div className={styles.projectBody}>
                      <span className={styles.projectCategory}>{project.category}</span>
                      <h3>{project.title}</h3>
                      <p className={styles.projectDescription}>{project.description}</p>
                      <div className={styles.contributionBlock}>
                        <h4>Engineering contributions</h4>
                        <ul>
                          {project.contributions.map((contribution) => (
                            <li key={contribution}>{contribution}</li>
                          ))}
                        </ul>
                      </div>
                      <ul className={styles.stackList} aria-label="Technology stack">
                        {project.stack.map((technology) => (
                          <li key={technology}>{technology}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.experienceSection} id="experience">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionEyebrow}>PROFESSIONAL EXPERIENCE</span>
                <h2>Growing through hands-on engineering.</h2>
              </div>
              <BriefcaseBusiness className={styles.headingIcon} size={28} aria-hidden="true" />
            </div>

            <article className={styles.experienceCard}>
              <div className={styles.experienceMarker} aria-hidden="true">
                <span />
              </div>
              <div className={styles.experienceContent}>
                <div className={styles.experienceTopline}>
                  <div>
                    <h3>{profileExperience.company}</h3>
                    <p>{profileExperience.title}</p>
                  </div>
                  <span>{profileExperience.period}</span>
                </div>
                <p className={styles.experienceProgression}>
                  {profileExperience.progression}
                </p>
                <ul className={styles.experienceList}>
                  {profileExperience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </article>

            <div className={styles.educationBlock}>
              <div className={styles.educationHeading}>
                <span className={styles.sectionEyebrow}>EDUCATION</span>
                <span className={styles.educationLine} />
              </div>
              <div className={styles.educationGrid}>
                {profileEducation.map((item) => (
                  <article className={styles.educationCard} key={item.qualification}>
                    <h3>{item.qualification}</h3>
                    <p>{item.institution}</p>
                    <span>{item.detail}</span>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.skillsSection} id="skills">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.sectionEyebrow}>TOOLS & STRENGTHS</span>
                <h2>A practical, full-stack toolkit.</h2>
              </div>
              <p>
                Backend-focused, with experience connecting databases, web and
                mobile clients, third-party platforms, and operational devices.
              </p>
            </div>
            <div className={styles.skillGrid}>
              {profileSkillGroups.map((group, index) => (
                <article className={styles.skillCard} key={group.title}>
                  <span className={styles.skillIndex}>0{index + 1}</span>
                  <h3>{group.title}</h3>
                  <div className={styles.skillTags}>
                    {group.skills.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contactSection} id="contact">
          <div className={styles.container}>
            <div className={styles.contactCard}>
              <div>
                <span className={styles.sectionEyebrow}>LET’S CONNECT</span>
                <h2>Open to the next engineering challenge.</h2>
                <p>
                  For opportunities and professional conversations, reach me by
                  email or connect on LinkedIn.
                </p>
              </div>
              <div className={styles.contactActions}>
                <a className={styles.primaryButton} href={"mailto:" + profile.email}>
                  <Mail size={17} /> {profile.email}
                </a>
                <a
                  className={styles.contactSocial}
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn profile <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <a className={styles.footerBrand} href="#top">
            <span className={styles.brandMark}>KT</span>
            <span>{profile.name}</span>
          </a>
          <span>Senior Software Developer · {new Date().getFullYear()}</span>
          <a className={styles.backToTop} href="#top">
            Back to top <ArrowUpRight size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
}
