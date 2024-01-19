"use client";

import type { ImageLoaderProps } from "next/image";

export default function contentfulImageLoader({ src }: ImageLoaderProps) {
  const url = new URL(`https://${src}`);
  url.searchParams.set("w", "680");

  return url.href;
}
