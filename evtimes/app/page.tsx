"use client";

import { useEffect } from "react";
import { homepageHtml } from "./homepage-html";

export default function Home() {
  useEffect(() => {
    const categoryItems = Array.from(
      document.querySelectorAll(".cat-item")
    ) as HTMLElement[];
    const newsletterInput = document.querySelector(
      ".nl-input"
    ) as HTMLInputElement | null;
    const newsletterButton = document.querySelector(
      ".btn-green-full"
    ) as HTMLButtonElement | null;
    const tagPills = Array.from(
      document.querySelectorAll(".tag-pill")
    ) as HTMLElement[];
    const bars = Array.from(document.querySelectorAll(".bar-fill")) as HTMLElement[];
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

    const dataWidget = document.querySelector(".data-widget") as Element | null;
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
