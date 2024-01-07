import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import "./styles.css";
import Navigation from "@/components/navigation";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Developing in Amsterdam",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Navigation />
        {children}{" "}
      </body>
    </html>
  );
}
