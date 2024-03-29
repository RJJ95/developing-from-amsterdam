import Image from "next/image";
import styles from "./post-preview-large.module.css";
import PostPreviewLargeProps from "./post-preview-large.types";
import { FC } from "react";
import Button from "../button";
import Link from "next/link";
import contentfulImageLoader from "@/utils/image-loader";

const PostPreviewLarge: FC<PostPreviewLargeProps> = ({
  imageUrl,
  altText,
  title,
  previewText,
  slug,
}) => (
  <div>
    <Link href={slug}>
      <div className={styles.imageContainer}>
        <Image
          loader={contentfulImageLoader}
          className={styles.image}
          src={imageUrl}
          alt={altText}
          fill
        />
      </div>
    </Link>

    <Link href={slug}>
      <h3>{title}</h3>
    </Link>

    <p className={styles.description}>{previewText}</p>
    <Link href={slug}>
      <Button text="Read" variant="outline" size="small" />
    </Link>
  </div>
);

export default PostPreviewLarge;
