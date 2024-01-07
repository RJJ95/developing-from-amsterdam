import Lead from "@/components/lead";
import client from "@/contentful/client";
import styles from "./blog-post.module.css";
import { DateTime } from "luxon";
import Image from "next/image";
import { Asset } from "contentful";

const readingTime = (text: string): string => {
  const wordCount = text.split(" ").length;
  const minutes = Math.ceil(wordCount / 225);
  return `${minutes} minute read`;
};

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

  return (
    <main>
      <section>
        <span className={styles.tag}>{post.metadata.tags[0].sys.id}</span>
        <h1>{post.fields.blogTitle as string}</h1>
        <Lead>{post.fields.subTitle as string}</Lead>
        <div className={styles.metadata}>
          <label>{DateTime.fromISO(post.sys.createdAt).toISODate()}</label>
          <label>{post.fields.level as string}</label>
          <label>{readingTime(post.fields.body as string)}</label>
        </div>
        <Image
          className={styles.image}
          src={`https://${
            (post.fields.image! as Asset).fields.file!.url as string
          }`}
          alt={post.fields.description as string}
          width={680}
          height={200}
        />
      </section>
    </main>
  );
}
