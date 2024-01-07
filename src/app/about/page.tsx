import Button from "@/components/button";
import client from "@/contentful/client";
import BlogPost from "@/types/blog-post";
import { Asset } from "contentful";
import Image from "next/image";
import { cache } from "react";
import styles from "./about.module.css";
import Lead from "@/components/lead";
import PostPreviewLarge from "@/components/post-preview-large";

export const getData = cache(async () => {
  const { items } = await client.getEntries<BlogPost>({
    content_type: "blog-post",
    order: ["sys.createdAt"],
    limit: 10,
  });

  return items;
});

export default async function About() {
  const items = await getData();

  return (
    <main>
      <section>
        <h1>Developing from Amsterdam</h1>
        <Lead>
          Hi there, I am a passionate developer from Amsterdam with a knack for
          Javascript, TypeScript, React, Azure, Kotlin, and functional
          programming. Throughout my journey, I've encountered numerous
          challenges and learned valuable lessons that have significantly shaped
          my expertise. Inspired by the hurdles I've overcome, I decided to
          create this blog to share my knowledge and experiences. My aim is to
          simplify the complex world of development for others, providing clear,
          concise, and practical articles that make your coding life easier and
          more efficient. Whether you're a seasoned coder or just starting, join
          me in exploring the limitless possibilities of code!
        </Lead>
      </section>
      <section>
        <h1>Latest articles</h1>
        {items.map((item) => {
          const imageUrl = (item.fields.image! as Asset).fields.file!
            .url as string;
          if (!imageUrl) {
            return null;
          }

          return (
            <PostPreviewLarge
              key={item.sys.id}
              imageUrl={imageUrl}
              title={item.fields.blogTitle as string}
              previewText={item.fields.subTitle as string}
              altText={
                (item.fields.image! as Asset).fields.description as string
              }
            />
          );
        })}
      </section>
    </main>
  );
}
