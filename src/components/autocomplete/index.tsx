"use client";

import { useState, useRef, useEffect } from "react";
import Input from "../input";
import useAutocomplete, { UseAutocompleteProps } from "./use-autocomplete";
import styles from "./autocomplete.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Autocomplete(props: UseAutocompleteProps) {
  const [showHits, setShowHits] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { indices, currentRefinement, refine } = useAutocomplete(props);
  const pathname = usePathname();

  const handleFocusOut = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget as Node | null;

    if (containerRef.current && !containerRef.current.contains(relatedTarget)) {
      setShowHits(false);
    }
  };

  useEffect(() => {
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    refine("");
  }, [pathname, refine]);

  return (
    <div ref={containerRef} className={styles.container}>
      <Input
        type="text"
        value={currentRefinement}
        onChange={refine}
        placeholder="What's your question about?"
        disabled={false}
        id="autocomplete-input"
        onFocus={() => setShowHits(true)}
      />

      {showHits && currentRefinement && (
        <ul className={styles.list}>
          {indices.map((index) =>
            index.hits.map((hit) => (
              <li className={styles.listItem} key={hit.objectID}>
                <Link href={`/${hit.fields.slug["en-US"]}`}>
                  <h6>{hit.fields.blogTitle["en-US"]}</h6>
                </Link>
                <p className={styles.description}>
                  {hit.fields.subTitle["en-US"]}
                </p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
