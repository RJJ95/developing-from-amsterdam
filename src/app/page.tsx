import { cache } from "react";
import client from "@/contentful/client";
import Lead from "@/components/lead";
import javascriptLogo from "@/assets/images/javascript-logo.svg";
import kotlinLogo from "@/assets/images/kotlin-logo.svg";

import styles from "./home.module.css";
import PostNavigation from "@/components/post-navigation";

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

  return {
    javascriptPosts,
    kotlinPosts,
    azurePosts,
  };
});

export default async function Home() {
  const { javascriptPosts, kotlinPosts, azurePosts } = await getData();

  return (
    <main>
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
      />
      <PostNavigation
        title="Kotlin"
        logo={kotlinLogo}
        items={kotlinPosts.items}
        background
      />
    </main>
  );
}
