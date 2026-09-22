import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  note,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  note?: string;
  visual: ReactNode;
}) {
  return (
    <header className="page-intro page-intro-split">
      <div className="page-intro-copy">
        <span className="pf-eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {note && (
          <div className="concept-note">
            <i aria-hidden="true" /> {note}
          </div>
        )}
      </div>
      <div className="page-intro-visual">{visual}</div>
    </header>
  );
}
