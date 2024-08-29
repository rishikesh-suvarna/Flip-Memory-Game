import type { Metadata } from "next";
import { Handjet } from "next/font/google";
import "./globals.css";

const handjet = Handjet({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flip Card Game | Rishikesh Suvarna",
  description: "This is a 4x4 image flip game built using Next.js. The objective of the game is to flip all the images to their correct positions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={handjet.className}>{children}</body>
    </html>
  );
}
