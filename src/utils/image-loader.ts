"use client";

import type { ImageLoaderProps } from "next/image";

export default function contentfulImageLoader({
  src,
  width,
}: ImageLoaderProps) {
  const url = new URL(`https://${src}`);
  url.searchParams.set("w", width.toString());

  return url.href;
}
