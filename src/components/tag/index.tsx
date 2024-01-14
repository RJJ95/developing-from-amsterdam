import { FC } from "react";
import styles from "./tag.module.css";

interface TagProps {
  name: string;
}

const Tag: FC<TagProps> = ({ name }) => (
  <span className={`${styles.tag} ${styles[name]}`}>{name}</span>
);

export default Tag;
