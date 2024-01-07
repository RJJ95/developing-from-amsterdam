"use client";

import { useState } from "react";
import Button from "../button";
import Input from "../input";
import styles from "./navigation.module.css";

const Navigation = () => {
  const [search, setSearch] = useState("");

  return (
    <nav className={styles.navigation}>
      <Button text="Menu" variant="ghost" onClick={() => null} />
      <div className={styles.searchContainer}>
        <Input
          value={search}
          onChange={setSearch}
          placeholder="What's your question about?"
          disabled={false}
          id="search-input"
        />
      </div>
      <Button
        text="Developing in Amsterdam"
        variant="ghost"
        onClick={() => null}
      />
    </nav>
  );
};

export default Navigation;
