import client from "@/contentful/client";
import BlogPost from "@/types/blog-post";
import { Asset } from "contentful";
import { cache } from "react";
import Lead from "@/components/lead";
import PostPreviewLarge from "@/components/post-preview-large";
import styles from "./about.module.css";
import { Metadata } from "next/types";
import { WithContext, AboutPage } from "schema-dts";

export const metadata: Metadata = {
  title: "About | Developing from Amsterdam",
  description:
    "A blog site to help other software engineers in their daily coding challenges.",
  keywords:
    "blog, software engineers, javascript, typescript, kotlin, azure, about, developing, amsterdam",
  applicationName: "Developing from Amsterdam Blog",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://www.developing-from-amsterdam.dev/about"),
  alternates: {
    canonical: "https://www.developing-from-amsterdam.dev/about",
  },
  openGraph: {
    title: "About | Developing from Amsterdam",
    description:
      "A blog site to help other software engineers in their daily coding challenges.",
    url: "https://www.developing-from-amsterdam.dev/about",
    siteName: "Developing from Amsterdam",
    locale: "en_US",
    type: "website",
  },
};

const getData = cache(async () => {
  const { items } = await client.getEntries<BlogPost>({
    content_type: "blog-post",
    order: ["-sys.createdAt"],
    limit: 10,
  });

  return items;
});

export default async function About() {
  const items = await getData();

  const jsonLd: WithContext<AboutPage> = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Developing from Amsterdam Blog",
    url: "http://www.developing-from-amsterdam.dev/about",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: "http://www.developing-from-amsterdam.dev/{search_term_string}",
        query: "required name=search_term_string",
      },
      {
        "@type": "ReadAction",
        target: "http://www.developing-from-amsterdam.dev/{search_term_string}",
      },
      {
        "@type": "ViewAction",
        target: "http://www.developing-from-amsterdam.dev/",
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section>
        <h1>Developing from Amsterdam</h1>
        <Lead>
          Hi there, I am a passionate developer from Amsterdam with a knack for
          Javascript, TypeScript, React, Azure, Kotlin, and functional
          programming. Throughout my journey, I&apos;ve encountered numerous
          challenges and learned valuable lessons that have significantly shaped
          my expertise. Inspired by the hurdles I&apos;ve overcome, I decided to
          create this blog to share my knowledge and experiences. My aim is to
          simplify the complex world of development for others, providing clear,
          concise, and practical articles that make your coding life easier and
          more efficient. Whether you&apos;re a seasoned coder or just starting,
          join me in exploring the limitless possibilities of code!
        </Lead>
        <div className={styles.hrContainer}>
          <hr />
        </div>
        <h2>Photos</h2>
        <Lead>
          You might see some strange images above my articles. That&apos;s
          because I find most depictions of software development to be extremely
          boring. That&apos;s why I want to give a platform to photographers on
          my blog. The photo&apos;s link to either the portfolio of the artist,
          their page on Unsplash, or just Unsplash.
        </Lead>
      </section>

      <hr />
      <section>
        <h1>Latest articles</h1>
        <div className={styles.postPreviewContainer}>
          {items.map((item) => (
            <PostPreviewLarge
              key={item.sys.id}
              imageUrl={
                (item.fields.image! as Asset).fields.file!.url as string
              }
              title={item.fields.blogTitle as string}
              previewText={item.fields.introduction as string}
              altText={
                (item.fields.image! as Asset).fields.description as string
              }
              slug={item.fields.slug as string}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
