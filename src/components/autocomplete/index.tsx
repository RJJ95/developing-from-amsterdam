"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Input from "../input";
import useAutocomplete, { UseAutocompleteProps } from "./use-autocomplete";
import styles from "./autocomplete.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { debounce } from "lodash";

export function Autocomplete(props: UseAutocompleteProps) {
  const [showHits, setShowHits] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const { indices, currentRefinement, refine } = useAutocomplete(props);
  const pathname = usePathname();

  const handleFocusOut = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget as Node | null;

    if (containerRef.current && !containerRef.current.contains(relatedTarget)) {
      setShowHits(false);
    }
  };

  // Debounce delay in milliseconds
  const debounceDelay = 300; // You can adjust this value

  // Debounced refine function
  const debouncedRefine = useCallback(
    debounce((newValue) => {
      refine(newValue);
    }, debounceDelay),
    [refine, debounceDelay]
  );

  // Call debounced refine when inputValue changes
  useEffect(() => {
    debouncedRefine(inputValue);
  }, [inputValue, debouncedRefine]);

  useEffect(() => {
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    refine("");
  }, [pathname]);

  return (
    <div ref={containerRef} className={styles.container}>
      <Input
        type="text"
        value={inputValue}
        onChange={setInputValue}
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
                  {hit.fields.introduction["en-US"]}
                </p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
