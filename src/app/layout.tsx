import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode, Suspense } from "react";
import "./styles.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { GoogleTagManager } from "@next/third-parties/google";

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
        <Suspense>
          <Navigation />
        </Suspense>
        {children}
        <Footer />
      </body>
      <GoogleTagManager gtmId="GTM-KT6R8H64" />
    </html>
  );
}
