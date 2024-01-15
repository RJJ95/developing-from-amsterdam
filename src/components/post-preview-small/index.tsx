import Image from "next/image";
import styles from "./post-preview-small.module.css";
import PostPreviewSmallProps from "./post-preview-small.types";
import { FC } from "react";
import Button from "../button";
import Link from "next/link";
import contentfulImageLoader from "@/utils/image-loader";

const PostPreviewSmall: FC<PostPreviewSmallProps> = ({
  imageUrl,
  altText,
  title,
  previewText,
  slug,
}) => (
  <div className={styles.container}>
    <Link href={slug}>
      <Image
        loader={contentfulImageLoader}
        className={styles.image}
        src={imageUrl}
        alt={altText}
        width={330}
        height={100}
      />
    </Link>

    <Link href={slug}>
      <h5>{title}</h5>
    </Link>

    <p className={styles.description}>{previewText}</p>
    <Link href={slug}>
      <Button text="Read" variant="outline" size="tiny" />
    </Link>
  </div>
);

export default PostPreviewSmall;
