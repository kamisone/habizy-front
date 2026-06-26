import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils pratiques pour réussir votre colocation : organisation, dépenses, ménage et vie commune.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <span className="badge">Blog</span>
          <h1 className={`h1 ${styles.heroTitle}`}>Conseils pour votre coloc</h1>
          <p className={`lead ${styles.heroLead}`}>
            Astuces, guides et bonnes pratiques pour une colocation heureuse.
          </p>
        </div>
      </section>

      <section className={`section ${styles.content}`}>
        <div className="container">
          {featured && (
            <Link href={`/blog/${featured.slug}`} className={styles.featured}>
              <div className={styles.featuredBadge}>
                <span className={styles.featuredCategory}>{featured.category}</span>
                <span className={styles.featuredLabel}>Article à la une</span>
              </div>
              <h2 className={`h2 ${styles.featuredTitle}`}>{featured.title}</h2>
              <p className={styles.featuredDesc}>{featured.description}</p>
              <div className={styles.featuredMeta}>
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span>{featured.readingTime} min de lecture</span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className={styles.grid}>
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.card}>
                  <span className={styles.cardCategory}>{post.category}</span>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardDesc}>{post.description}</p>
                  <div className={styles.cardMeta}>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span>{post.readingTime} min de lecture</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
