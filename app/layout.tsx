import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zeying Xu Portfolio",
  description:
    "Marketing and Business Analytics portfolio presented as an interactive folder.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
