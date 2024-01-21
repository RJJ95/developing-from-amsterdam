"use client";

import styles from "./post-navigation.module.css";
import Image from "next/image";
import chevronRight from "@/assets/icons/chevron-right.svg";
import chevronLeft from "@/assets/icons/chevron-left.svg";
import { Asset, Entry, EntrySkeletonType } from "contentful";
import PostPreviewSmall from "../post-preview-small";
import { FC, useState } from "react";

interface PostNavigationProps {
  logo: string;
  title: string;
  items: Entry<EntrySkeletonType, undefined, string>[];
  background?: boolean;
  priority?: boolean;
}

const PostNavigation: FC<PostNavigationProps> = ({
  logo,
  items,
  title,
  background,
  priority,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollAmount = 350;

  const handleNext = () => {
    setScrollPosition((prevPosition) => prevPosition - scrollAmount);
  };

  const handlePrev = () => {
    setScrollPosition((prevPosition) => prevPosition + scrollAmount);
  };

  return (
    <section className={background ? styles.fullWidthBackground : ""}>
      <div className={styles.sectionHeader}>
        <div className={styles.languageHeader}>
          <Image src={logo} alt={`${title}-logo`} />
          <h2>{title}</h2>
        </div>
        <div>
          <button
            disabled={scrollPosition === 0}
            className={styles.postNavigationButton}
            onClick={handlePrev}
          >
            <Image src={chevronLeft} alt="chevron-left" />
          </button>
          <button
            disabled={scrollPosition <= -((items.length - 1) * scrollAmount)}
            className={styles.postNavigationButton}
            onClick={handleNext}
          >
            <Image src={chevronRight} alt="chevron-right" />
          </button>
        </div>
      </div>
      <div
        className={styles.postsContainer}
        style={{ transform: `translateX(${scrollPosition}px)` }}
      >
        {items.map((item) => (
          <div className={styles.postWrapper} key={item.sys.id}>
            <PostPreviewSmall
              key={item.sys.id}
              priority={priority}
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default PostNavigation;
