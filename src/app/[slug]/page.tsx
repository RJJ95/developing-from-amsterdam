import Lead from "@/components/lead";
import client from "@/contentful/client";
import styles from "./blog-post.module.css";
import Image from "next/image";
import { Asset } from "contentful";
import "highlight.js/styles/intellij-light.css";
import PostPreviewSmall from "@/components/post-preview-small";
import Tag from "@/components/tag";
import contentfulImageLoader from "@/utils/image-loader";
import { cache } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import { WithContext, BlogPosting } from "schema-dts";

type Props = {
  params: {
    slug: string;
  };
};

function removeQuotes(str: string) {
  if (str.startsWith('"') && str.endsWith('"')) {
    return str.substring(1, str.length - 1);
  }
  return str;
}

export async function generateMetadata({ params }: Props) {
  const { items } = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": params.slug,
    select: ["fields.blogTitle", "fields.seoDescription", "fields.keywords"],
  });

  return {
    title: items[0].fields.blogTitle,
    description: removeQuotes(items[0].fields.seoDescription as string),
    keywords: items[0].fields.keywords,
    applicationName: "Developing from Amsterdam Blog",
    generator: "Next.js",
    referrer: "origin-when-cross-origin",
    metadataBase: new URL(
      `https://www.developing-from-amsterdam.dev/${params.slug}`
    ),
  };
}

export async function generateStaticParams() {
  const { items } = await client.getEntries({
    content_type: "blog-post",
    select: ["fields.slug"],
    limit: 1000,
  });

  return items.map((item) => ({
    slug: item.fields.slug as string,
  }));
}

const getData = cache(async (slug: string) => {
  const {
    items: [blogPost],
  } = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": slug,
  });

  const { items: relatedPosts } = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": [blogPost.metadata.tags[0].sys.id],
    "fields.slug[nin]": slug,
    limit: 4,
  });

  return {
    blogPost,
    relatedPosts,
  };
});

export default async function BlogPost({ params }: Props) {
  const { blogPost, relatedPosts } = await getData(params.slug);

  const readingTime = (text: string): string => {
    const wordCount = text.split(" ").length;
    const minutes = Math.ceil(wordCount / 225);
    return `${minutes} minute read`;
  };

  const author = JSON.parse(
    (blogPost.fields.image! as Asset).fields.description as string
  );

  const jsonLd: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    name: blogPost.fields!.blogTitle as string,
    url: `http://www.developing-from-amsterdam.dev/${params.slug}`,
    headline: blogPost.fields!.blogTitle as string,
    description: blogPost.fields!.seoDescription as string,
    datePublished: blogPost.fields!.creationDate as string,
    image: (blogPost.fields.image! as Asset).fields.file!.url as string,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section>
        <div className={styles.tagContainer}>
          {blogPost.metadata.tags.map((tag) => (
            <Tag key={tag.sys.id} name={tag.sys.id} />
          ))}
        </div>

        <Markdown
          rehypePlugins={[rehypeRaw]}
          skipHtml={false}
          components={{
            h2({ children }) {
              return <h2 className={styles.paragraphHeader}>{children}</h2>;
            },
            h3({ children }) {
              return <h3 className={styles.paragraphHeader}>{children}</h3>;
            },
            p({ children }) {
              if (children?.toString().includes("Hi there, friend!")) {
                return (
                  <div className={styles.introContainer}>
                    <Lead>{children}</Lead>
                    <div className={styles.metadata}>
                      <label>{blogPost.fields.creationDate as string}</label>
                      <label>{blogPost.fields.level as string} level</label>
                      <label>
                        {readingTime(blogPost.fields.body as string)}
                      </label>
                    </div>
                  </div>
                );
              } else {
                return <p className={styles.body}>{children}</p>;
              }
            },
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={oneLight}
                  codeTagProps={{ className: styles.code }}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
            img: () => (
              <div className={styles.imageContainer}>
                <a
                  href={
                    author.author ??
                    `https://unsplash.com/s/users/${author.firstName}-${author.lastName}`
                  }
                  target="_blank"
                >
                  <Image
                    loader={contentfulImageLoader}
                    src={
                      (blogPost.fields.image! as Asset).fields.file!
                        .url as string
                    }
                    alt={author.altText}
                    width={680}
                    height={500}
                    style={{
                      height: "auto",
                    }}
                  />
                  {author.authorFirstName && (
                    <p className={styles.photoCaption}>
                      Photo by {author.authorFirstName} {author.authorLastName}
                    </p>
                  )}
                </a>
              </div>
            ),
          }}
        >
          {blogPost.fields.body as string}
        </Markdown>
      </section>
      <hr />
      <section>
        <h4>More like this</h4>
        <div className={styles.related}>
          {relatedPosts.map((item) => (
            <PostPreviewSmall
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
