import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <div className={styles.breadcrumb}>
        <div className="container">
          <Link href="/blog" className={styles.breadcrumbLink}>← Blog</Link>
        </div>
      </div>

      <article>
        <header className={styles.header}>
          <div className="container">
            <span className={styles.category}>{post.category}</span>
            <h1 className={`h1 ${styles.title}`}>{post.title}</h1>
            <p className={`lead ${styles.desc}`}>{post.description}</p>
            <div className={styles.meta}>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} min de lecture</span>
            </div>
          </div>
        </header>

        <div className={`section ${styles.body}`}>
          <div className="container">
            <div
              className={styles.prose}
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
            />
          </div>
        </div>
      </article>

      <section className={styles.cta}>
        <div className="container">
          <h2 className={`h3 ${styles.ctaTitle}`}>Essayez Habizy gratuitement</h2>
          <p className={styles.ctaDesc}>
            Toutes les astuces de cet article sont déjà intégrées dans l&apos;app.
          </p>
          <div className={styles.ctaBtns}>
            <a href={siteConfig.appStoreUrl} className={styles.ctaBtn}>App Store</a>
            <a href={siteConfig.playStoreUrl} className={styles.ctaBtn}>Google Play</a>
          </div>
        </div>
      </section>
    </>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hul])/gm, "")
    .replace(/^<\/p><p>(<[hul2-3])/gm, "$1")
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<li")) return trimmed;
      return `<p>${trimmed}</p>`;
    })
    .join("\n");
}
