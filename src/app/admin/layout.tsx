"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen">
      <ThemeProvider>
        <main className="flex-1 px-8 max-w-screen mx-auto">{children}</main>
      </ThemeProvider>
    </div>
  );
}
