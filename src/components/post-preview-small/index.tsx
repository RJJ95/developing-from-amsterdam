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
  priority,
}) => (
  <div className={styles.container}>
    <Link href={`https://www.developing-from-amsterdam.dev/${slug}`}>
      <Image
        priority={priority ?? false}
        loader={contentfulImageLoader}
        className={styles.image}
        src={imageUrl}
        alt={altText}
        width={300}
        height={300}
        style={{
          height: "auto",
        }}
      />
    </Link>

    <Link href={`https://www.developing-from-amsterdam.dev/${slug}`}>
      <h5>{title}</h5>
    </Link>

    <p className={styles.description}>{previewText}</p>
    <Link href={`https://www.developing-from-amsterdam.dev/${slug}`}>
      <Button text="Read" variant="outline" size="tiny" />
    </Link>
  </div>
);

export default PostPreviewSmall;
