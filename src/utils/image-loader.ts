"use client";

import type { ImageLoaderProps } from "next/image";

export default function contentfulImageLoader({ src }: ImageLoaderProps) {
  return `https://${src}`;
}
