"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./page.module.css";

const appScreenshots = [
  { src: "/screenshots/sc1.avif", label: "Accueil" },
  { src: "/screenshots/sc2.avif", label: "Tableau de bord" },
  { src: "/screenshots/sc3.avif", label: "Les courses" },
  { src: "/screenshots/sc4.avif", label: "Ménage" },
  { src: "/screenshots/sc5.avif", label: "Dépenses" },
  { src: "/screenshots/sc6.avif", label: "Liste partagée" },
  { src: "/screenshots/sc7.avif", label: "Signalements" },
  { src: "/screenshots/sc8.avif", label: "Profil" },
];

const SCROLL_AMOUNT = 220;

export function ScreenshotsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    return () => el.removeEventListener("scroll", updateArrows);
  }, [updateArrows]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT, behavior: "smooth" });
  };

  return (
    <div className={styles.screenshotsWrapper}>
      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnLeft}`}
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Précédent"
      >
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>

      <div className={styles.screenshotsScroll} ref={scrollRef}>
        {appScreenshots.map((s) => (
          <div key={s.src} className={styles.screenshotPhone}>
            <div className={styles.phoneMockSmall}>
              <div className={styles.phoneMockScreen}>
                <Image
                  src={s.src}
                  alt={`Habizy — ${s.label}`}
                  width={1080}
                  height={2164}
                  unoptimized
                  className={styles.screenshotImg}
                />
              </div>
            </div>
            <p className={styles.screenshotLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      <button
        className={`${styles.carouselBtn} ${styles.carouselBtnRight}`}
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Suivant"
      >
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
}
