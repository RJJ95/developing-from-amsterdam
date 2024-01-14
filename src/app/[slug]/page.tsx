import Lead from "@/components/lead";
import client from "@/contentful/client";
import styles from "./blog-post.module.css";
import { DateTime } from "luxon";
import Image from "next/image";
import { Asset } from "contentful";
import "highlight.js/styles/intellij-light.css";
import PostPreviewSmall from "@/components/post-preview-small";
import Tag from "@/components/tag";
import { markdownToHtml } from "@/utils/markdown-to-html";
import contentfulImageLoader from "@/utils/image-loader";

export async function generateStaticParams() {
  const { items } = await client.getEntries({
    content_type: "blog-post",
    order: ["sys.createdAt"],
    limit: 10,
  });

  return items.map((item) => ({
    slug: item.fields.slug as string,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { items } = await client.getEntries({
    content_type: "blog-post",
    "fields.slug": params.slug,
  });

  const [post] = items;

  const relatedPosts = await client.getEntries({
    content_type: "blog-post",
    "metadata.tags.sys.id[in]": [post.metadata.tags[0].sys.id],
    limit: 4,
  });

  const readingTime = (text: string): string => {
    const wordCount = text.split(" ").length;
    const minutes = Math.ceil(wordCount / 225);
    return `${minutes} minute read`;
  };

  return (
    <main>
      <section>
        <div className={styles.tagContainer}>
          {post.metadata.tags.map((tag) => (
            <Tag key={tag.sys.id} name={tag.sys.id} />
          ))}
        </div>
        <h1 className={styles.postHeader}>{post.fields.blogTitle as string}</h1>
        <Lead>{post.fields.subTitle as string}</Lead>
        <div className={styles.metadata}>
          <label>{DateTime.fromISO(post.sys.createdAt).toISODate()}</label>
          <label>{post.fields.level as string}</label>
          <label>{readingTime(post.fields.body as string)}</label>
        </div>
        <Image
          loader={contentfulImageLoader}
          className={styles.image}
          src={(post.fields.image! as Asset).fields.file!.url as string}
          alt={post.fields.description as string}
          width={680}
          height={200}
        />
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{
            __html: await markdownToHtml(post.fields.body as string),
          }}
        />
      </section>
      <hr />
      <section>
        <h4>More like this</h4>
        <div className={styles.related}>
          {relatedPosts.items.map((item) => (
            <PostPreviewSmall
              key={item.sys.id}
              imageUrl={
                (item.fields.image! as Asset).fields.file!.url as string
              }
              title={item.fields.blogTitle as string}
              previewText={item.fields.subTitle as string}
              altText={item.fields.description as string}
              slug={item.fields.slug as string}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
