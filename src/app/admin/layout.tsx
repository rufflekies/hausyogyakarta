"use client";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen">
      <main className="flex-1 px-8 max-w-screen mx-auto">{children}</main>
    </div>
  );
}