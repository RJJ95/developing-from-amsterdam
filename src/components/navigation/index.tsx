"use client";

import { useState, useEffect } from "react";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Autocomplete } from "../autocomplete";
import styles from "./navigation.module.css";
import Link from "next/link";
import algoliaClient from "@/algolia/client";
import Image from "next/image";
import homeIcon from "@/assets/icons/home.svg";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPod|Android/i.test(navigator.userAgent));
  }, []);

  if (isMobile) {
    return (
      <nav className={styles.mobileMenu}>
        <Link className={styles.home} href="/">
          <Image src={homeIcon} alt="menu-icon" />
        </Link>
        <div className={styles.searchContainerMobile}>
          <InstantSearchNext
            searchClient={algoliaClient}
            indexName="blog-posts"
          >
            <Autocomplete />
          </InstantSearchNext>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navigation}>
      <Link className={styles.navItem} href="/">
        Home
      </Link>
      <div className={styles.searchContainer}>
        <InstantSearchNext searchClient={algoliaClient} indexName="blog-posts">
          <Autocomplete />
        </InstantSearchNext>
      </div>
      <Link className={styles.navItem} href="/about">
        Developing from Amsterdam
      </Link>
    </nav>
  );
};

export default Navigation;
