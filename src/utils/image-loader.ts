"use client";

import type { ImageLoaderProps } from "next/image";

export default function myImageLoader({ src }: ImageLoaderProps) {
  return `https://${src}`;
}
