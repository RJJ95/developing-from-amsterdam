import { FC } from "react";
import LeadProps from "./lead.types";
import styles from "./lead.module.css";

const Lead: FC<LeadProps> = ({ children }) => (
  <p className={styles.lead}>{children}</p>
);

export default Lead;
