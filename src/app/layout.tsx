// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins font dari Google Fonts
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type React from "react";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"], // Menentukan berat font yang dibutuhkan
  subsets: ["latin"], // Menggunakan subset latin
  variable: "--font-poppins", // Variabel CSS untuk font
  display: "swap", // Menggunakan swap untuk font loading
});

export const metadata: Metadata = {
  title: "Haus Yogyakarta",
  description: "Produk Haus Yogyakarta",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ThemeProvider defaultTheme="system">
          <main className="flex-1">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
