const sections = [
  {
    tab: "Home",
    kicker: "Marketing & Business Analytics",
    title: "Portfolio",
    copy:
      "Turning marketing data into actionable business insights through analytics, visualization, and storytelling.",
    range: "Pages 1-3",
    cardTitle: "Meet Zeying Xu",
    cardCopy:
      "3+ years of marketing analytics experience, performance analysis, creative tools, and data storytelling.",
    image: "page-001.png",
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
    image: "page-005.png",
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
    image: "page-012.png",
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
    image: "page-015.png",
    alt: "Preview of the selected video works page",
    actions: [],
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
    image: "page-017.png",
    alt: "Preview of the portfolio contact page",
    actions: [
      {
        label: "Connect on LinkedIn",
        href: "https://www.linkedin.com/in/zeying-joeey-xu-1b3a76356/",
      },
    ],
  },
];

const activePaper = document.querySelector(".active-paper");
const tabButtons = [...document.querySelectorAll(".folder-tab-button")];
const prevButton = document.querySelector("#prev-section");
const nextButton = document.querySelector("#next-section");
const pageIndicator = document.querySelector("#page-indicator");
const homeSubtabs = [...document.querySelectorAll(".home-subtab")];
const homeDetails = [...document.querySelectorAll(".home-detail")];
const fields = {
  kicker: document.querySelector("#section-kicker"),
  title: document.querySelector("#section-title"),
  copy: document.querySelector("#section-copy"),
  range: document.querySelector("#section-range"),
  cardTitle: document.querySelector("#card-title"),
  cardCopy: document.querySelector("#card-copy"),
  image: document.querySelector("#section-image"),
  actions: document.querySelector("#action-row"),
};

let currentSection = 0;
let touchStartX = 0;

function renderHomePanel(panelName) {
  homeSubtabs.forEach((button) => {
    const isActive = button.dataset.homePanel === panelName;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });

  homeDetails.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.homeDetail === panelName);
  });
}

function renderSection(nextSection) {
  const normalized = (nextSection + sections.length) % sections.length;
  currentSection = normalized;
  const section = sections[currentSection];

  activePaper.classList.add("is-turning");

  window.setTimeout(() => {
    fields.kicker.textContent = section.kicker;
    fields.title.textContent = section.title;
    fields.copy.textContent = section.copy;
    fields.range.textContent = section.range;
    fields.cardTitle.textContent = section.cardTitle;
    fields.cardCopy.textContent = section.cardCopy;
    fields.image.src = section.image;
    fields.image.alt = section.alt;
    activePaper.dataset.sectionName = section.tab.toLowerCase();
    activePaper.classList.toggle("is-home", currentSection === 0);
    fields.actions.replaceChildren(
      ...section.actions.map((action) => {
        if (action.note) {
          const note = document.createElement("span");
          note.className = "action-note";
          note.textContent = action.label;
          return note;
        }

        const link = document.createElement("a");
        link.className = "action-link";
        link.href = action.href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = action.label;
        return link;
      }),
    );

    tabButtons.forEach((button, index) => {
      button.classList.toggle("is-active", index === currentSection);
      button.setAttribute("aria-current", index === currentSection ? "page" : "false");
    });

    pageIndicator.textContent = `${String(currentSection + 1).padStart(2, "0")} / ${String(
      sections.length,
    ).padStart(2, "0")}`;
    activePaper.classList.remove("is-turning");
    activePaper.focus({ preventScroll: true });
  }, 180);
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderSection(Number(button.dataset.section));
  });
});

homeSubtabs.forEach((button) => {
  button.addEventListener("click", () => {
    renderHomePanel(button.dataset.homePanel);
  });
});

prevButton.addEventListener("click", () => renderSection(currentSection - 1));
nextButton.addEventListener("click", () => renderSection(currentSection + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    renderSection(currentSection - 1);
  }

  if (event.key === "ArrowRight") {
    renderSection(currentSection + 1);
  }
});

activePaper.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
});

activePaper.addEventListener("touchend", (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) < 48) return;
  renderSection(delta > 0 ? currentSection - 1 : currentSection + 1);
});

renderSection(0);
renderHomePanel("introduction");
