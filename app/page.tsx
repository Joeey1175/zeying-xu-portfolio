"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  {
    tab: "Profile",
    kicker: "Marketing & Business Analytics",
    title: "Portfolio",
    copy:
      "Turning marketing data into actionable business insights through analytics, visualization, and storytelling.",
    range: "Pages 1-3",
    cardTitle: "Meet Zeying Xu",
    cardCopy:
      "3+ years of marketing analytics experience, performance analysis, creative tools, and data storytelling.",
    image: "/assets/pdf-pages/page-001.png",
    alt: "Preview of the portfolio cover page",
    actions: [],
  },
  {
    tab: "Analytics",
    kicker: "Marketing",
    title: "Analytics",
    copy:
      "Exploring content performance, campaign effectiveness, and competitive benchmarking through data analysis.",
    range: "Pages 4-7",
    cardTitle: "Competitive Benchmarking",
    cardCopy:
      "Benchmarked six academic publishers across Q1 2025 content analysis and comparative visualizations.",
    image: "/assets/pdf-pages/page-005.png",
    alt: "Preview of the competitive benchmarking overview page",
    actions: [],
  },
  {
    tab: "Content",
    kicker: "Content",
    title: "Analysis",
    copy:
      "Exploring how different content categories contribute to overall publishing performance.",
    range: "Pages 8-13",
    cardTitle: "Interactive Dashboard",
    cardCopy:
      "Built a Tableau dashboard to monitor genre performance, investment efficiency, revenue trends, and KPI summaries.",
    image: "/assets/pdf-pages/page-012.png",
    alt: "Preview of the interactive dashboard page",
    actions: [
      {
        label: "View Tableau Dashboard",
        href: "https://public.tableau.com/app/profile/zeying.xu1662/viz/GenreInvestmentInsights/GenreInvestmentStrategyInsights",
      },
    ],
  },
  {
    tab: "Creative",
    kicker: "Creative",
    title: "Works",
    copy:
      "Showcasing visual design, multimedia production, and creative storytelling across marketing projects.",
    range: "Pages 14-15",
    cardTitle: "Selected Video Works",
    cardCopy:
      "Edited research, academic training, and scientific webinar videos with synchronized graphics and subtitles.",
    image: "/assets/pdf-pages/page-015.png",
    alt: "Preview of the selected video works page",
    actions: [
      {
        label: "Video previews only - unpublished work",
        note: true,
      },
    ],
  },
  {
    tab: "Contact",
    kicker: "Let's",
    title: "Build Insights Together",
    copy:
      "Thanks for your time and consideration. Always excited to discuss analytics, marketing, and data-driven solutions.",
    range: "Pages 16-17",
    cardTitle: "Project Results",
    cardCopy:
      "Delivered monthly reports, benchmarked publishers, created videos, and supported long-term publishing decisions.",
    image: "/assets/pdf-pages/page-017.png",
    alt: "Preview of the portfolio contact page",
    actions: [
      {
        label: "Connect on LinkedIn",
        href: "https://www.linkedin.com/in/zeying-joeey-xu-1b3a76356/",
      },
    ],
  },
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const touchStartX = useRef(0);
  const section = sections[currentSection];

  const goToSection = (nextSection: number) => {
    setIsTurning(true);
    window.setTimeout(() => {
      setCurrentSection((nextSection + sections.length) % sections.length);
      setIsTurning(false);
    }, 180);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goToSection(currentSection - 1);
      if (event.key === "ArrowRight") goToSection(currentSection + 1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [currentSection]);

  return (
    <main className="portfolio-shell" aria-live="polite">
      <section className="folder-stage" aria-label="Zeying Xu portfolio folder">
        <div className="folder-back" aria-hidden="true">
          <div className="folder-tab folder-tab-main" />
          <div className="folder-tab folder-tab-shadow" />
        </div>

        <nav className="folder-tabs" aria-label="Portfolio sections">
          {sections.map((item, index) => (
            <button
              className={`folder-tab-button ${index === currentSection ? "is-active" : ""}`}
              type="button"
              key={item.tab}
              aria-current={index === currentSection ? "page" : undefined}
              onClick={() => goToSection(index)}
            >
              {item.tab}
            </button>
          ))}
        </nav>

        <article className="file-stack">
          <div className="paper paper-shadow paper-shadow-one" aria-hidden="true" />
          <div className="paper paper-shadow paper-shadow-two" aria-hidden="true" />
          <section
            className={`paper active-paper ${isTurning ? "is-turning" : ""}`}
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0].clientX;
            }}
            onTouchEnd={(event) => {
              const delta = event.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) < 48) return;
              goToSection(delta > 0 ? currentSection - 1 : currentSection + 1);
            }}
          >
            <div className="paper-clip" aria-hidden="true" />
            <p className="script-label">{section.kicker}</p>
            <h1>{section.title}</h1>
            <p className="section-copy">{section.copy}</p>

            <div className="content-grid">
              <div className="insight-card">
                <span className="card-label">{section.range}</span>
                <h2>{section.cardTitle}</h2>
                <p>{section.cardCopy}</p>
              </div>

              <figure className="preview-frame">
                <img src={section.image} alt={section.alt} />
              </figure>
            </div>

            <div className="action-row" aria-label="Related links">
              {section.actions.map((action) =>
                action.note ? (
                  <span className="action-note" key={action.label}>
                    {action.label}
                  </span>
                ) : (
                  <a
                    className="action-link"
                    href={action.href}
                    key={action.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {action.label}
                  </a>
                ),
              )}
            </div>
          </section>
        </article>

        <div className="folder-front" aria-hidden="true" />

        <div className="controls" aria-label="Folder navigation controls">
          <button
            className="icon-button"
            type="button"
            aria-label="Previous file"
            onClick={() => goToSection(currentSection - 1)}
          >
            <span aria-hidden="true">‹</span>
          </button>
          <p className="page-indicator">
            {String(currentSection + 1).padStart(2, "0")} /{" "}
            {String(sections.length).padStart(2, "0")}
          </p>
          <button
            className="icon-button"
            type="button"
            aria-label="Next file"
            onClick={() => goToSection(currentSection + 1)}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </section>
    </main>
  );
}
