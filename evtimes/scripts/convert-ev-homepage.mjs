import fs from "node:fs";
import path from "node:path";

const sourcePath = "C:/Users/dell/Downloads/ev-news-homepage.html";
const projectRoot = "D:/evtimes/evtimes";

const source = fs.readFileSync(sourcePath, "utf8");

const titleMatch = source.match(/<title>([\s\S]*?)<\/title>/i);
const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/i);
const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<script>/i);

if (!styleMatch || !bodyMatch) {
  throw new Error("Could not extract the stylesheet or body content from the HTML file.");
}

const css = styleMatch[1]
  .replace(/--serif:\s*'Instrument Serif', Georgia, serif;/, "--serif: var(--font-instrument-serif), Georgia, serif;")
  .replace(/--disp:\s*'Bebas Neue', sans-serif;/, "--disp: var(--font-bebas-neue), sans-serif;")
  .replace(/--sans:\s*'DM Sans', sans-serif;/, "--sans: var(--font-dm-sans), sans-serif;");

const bodyHtml = bodyMatch[1].trim().replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const title = (titleMatch?.[1] ?? "EVTimes").trim();

const globalsCss = `@import "tailwindcss";

${css}
`;

const pageTsx = `"use client";

import { useEffect } from "react";
import { homepageHtml } from "./homepage-html";

export default function Home() {
  useEffect(() => {
    const categoryItems = Array.from(document.querySelectorAll<HTMLElement>(".cat-item"));
    const newsletterInput = document.querySelector<HTMLInputElement>(".nl-input");
    const newsletterButton = document.querySelector<HTMLButtonElement>(".btn-green-full");
    const tagPills = Array.from(document.querySelectorAll<HTMLElement>(".tag-pill"));
    const bars = Array.from(document.querySelectorAll<HTMLElement>(".bar-fill"));
    const originalWidths = bars.map((bar) => bar.style.width);

    const categoryListeners = categoryItems.map((item) => {
      const handler = () => {
        categoryItems.forEach((entry) => entry.classList.remove("active"));
        item.classList.add("active");
      };

      item.addEventListener("click", handler);
      return { item, handler };
    });

    const newsletterHandler = () => {
      if (!newsletterInput || !newsletterButton) {
        return;
      }

      if (newsletterInput.value.includes("@")) {
        newsletterButton.textContent = "✓ You're subscribed!";
        newsletterButton.style.background = "var(--grn-acc)";
        newsletterInput.disabled = true;
        newsletterInput.style.opacity = "0.5";
      } else {
        newsletterInput.style.borderColor = "#c0392b";
        newsletterInput.focus();

        window.setTimeout(() => {
          newsletterInput.style.borderColor = "";
        }, 1500);
      }
    };

    if (newsletterButton) {
      newsletterButton.addEventListener("click", newsletterHandler);
    }

    const tagListeners = tagPills.map((pill) => {
      const handler = () => {
        pill.style.background = "var(--grn-xlight)";
        pill.style.borderColor = "var(--grn)";
        pill.style.color = "var(--grn)";
      };

      pill.addEventListener("click", handler);
      return { pill, handler };
    });

    bars.forEach((bar) => {
      bar.style.width = "0";
    });

    const dataWidget = document.querySelector(".data-widget");
    let observer: IntersectionObserver | undefined;

    if (dataWidget && bars.length > 0) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            bars.forEach((bar, index) => {
              window.setTimeout(() => {
                bar.style.width = originalWidths[index];
              }, index * 100);
            });

            observer?.disconnect();
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(dataWidget);
    }

    return () => {
      categoryListeners.forEach(({ item, handler }) => item.removeEventListener("click", handler));
      tagListeners.forEach(({ pill, handler }) => pill.removeEventListener("click", handler));

      if (newsletterButton) {
        newsletterButton.removeEventListener("click", newsletterHandler);
      }

      observer?.disconnect();
    };
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: homepageHtml }} />;
}
`;

const homepageHtmlTs = `export const homepageHtml = String.raw\`${bodyHtml}\`;
`;

const layoutTsx = `import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: "India's EV news, analysis, and market data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={\`\${dmSans.variable} \${bebasNeue.variable} \${instrumentSerif.variable}\`}
    >
      <body>{children}</body>
    </html>
  );
}
`;

fs.mkdirSync(path.join(projectRoot, "scripts"), { recursive: true });
fs.writeFileSync(path.join(projectRoot, "app", "globals.css"), globalsCss);
fs.writeFileSync(path.join(projectRoot, "app", "homepage-html.ts"), homepageHtmlTs);
fs.writeFileSync(path.join(projectRoot, "app", "page.tsx"), pageTsx);
fs.writeFileSync(path.join(projectRoot, "app", "layout.tsx"), layoutTsx);

console.log(`Converted homepage: ${title}`);
