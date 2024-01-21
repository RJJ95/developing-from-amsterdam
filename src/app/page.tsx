import { cache } from "react";
import client from "@/contentful/client";
import Lead from "@/components/lead";
import javascriptLogo from "@/assets/images/javascript-logo.svg";
import kotlinLogo from "@/assets/images/kotlin-logo.svg";
import reactLogo from "@/assets/images/react-logo.svg";
import typescriptLogo from "@/assets/images/typescript-logo.svg";
import PostNavigation from "@/components/post-navigation";
import type { Metadata } from "next";
import { WebSite, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "Developing from Amsterdam",
  description:
    "Solving coding challenges with insights and tips for software engineers, by an Amsterdam-based developer.",
  keywords:
    "Amsterdam developer, software engineering, coding challenges, programming tips, developer blog, coding insights, JavaScript, React, Java, Kubernetes",
  applicationName: "Developing from Amsterdam Blog",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  metadataBase: new URL("https://www.developing-from-amsterdam.dev/"),
  alternates: {
    canonical: "https://www.developing-from-amsterdam.dev/",
  },
  openGraph: {
    title: "Developing from Amsterdam",
    description:
      "A blog site to help other software engineers in their daily coding challenges.",
    url: "https://www.developing-from-amsterdam.dev/",
    siteName: "Developing from Amsterdam",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://images.ctfassets.net/tddme9p4n2wr/1LOal0mLZwj1JsTpAwqum8/14eb4baa0045596768de7fc1d9fac868/r20_DWxVivo?fm=webp&w=1080",
        width: 1080,
      },
    ],
  },
};

const getData = cache(async () => {
  const javascriptPosts = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": ["javascript"],
    limit: 10,
  });

  const kotlinPosts = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": ["kotlin"],
    limit: 10,
  });

  const azurePosts = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": ["azure"],
    limit: 10,
  });

  const reactPosts = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": ["react"],
    limit: 10,
  });

  const typescriptPosts = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": ["typescript"],
    limit: 10,
  });

  return {
    javascriptPosts,
    kotlinPosts,
    azurePosts,
    reactPosts,
    typescriptPosts,
  };
});

export default async function Home() {
  const { javascriptPosts, kotlinPosts, reactPosts, typescriptPosts } =
    await getData();

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Developing from Amsterdam Blog",
    url: "http://www.developing-from-amsterdam.dev",
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
        target: "http://www.developing-from-amsterdam.dev/about",
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
        <h1>Welcome!</h1>
        <Lead>
          Welcome to Developing from Amsterdam! Check out my latest articles
          where I try to provide you with information on how to solve your
          software development challenges. Take a look below!
        </Lead>
      </section>
      <hr />
      <PostNavigation
        title="Javascript"
        logo={javascriptLogo}
        items={javascriptPosts.items}
        priority={true}
      />
      <PostNavigation
        title="Kotlin"
        logo={kotlinLogo}
        items={kotlinPosts.items}
        priority={true}
        background
      />
      <PostNavigation title="React" logo={reactLogo} items={reactPosts.items} />
      <PostNavigation
        title="Typescript"
        logo={typescriptLogo}
        items={typescriptPosts.items}
        background
      />
    </main>
  );
}
