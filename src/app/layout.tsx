import type { Metadata } from "next";
import "./globals.css";
import varela_Round from "@/fonts/varela-round";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${varela_Round.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
