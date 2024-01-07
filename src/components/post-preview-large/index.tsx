import Image from "next/image";
import styles from "./post-preview-large.module.css";
import PostPreviewLargeProps from "./post-preview-large.types";
import { FC } from "react";
import Button from "../button";

const PostPreviewLarge: FC<PostPreviewLargeProps> = ({
  imageUrl,
  altText,
  title,
  previewText,
}) => (
  <div>
    <Image
      className={styles.image}
      src={`https://${imageUrl}`}
      alt={altText}
      width={680}
      height={200}
    />
    <h3>{title}</h3>
    <p className={styles.description}>{previewText}</p>
    <Button text="Read" variant="outline" size="small" />
  </div>
);

export default PostPreviewLarge;
