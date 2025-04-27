"use client";

import { Toaster } from "sonner";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext"; // <-- Import AuthProvider
import { ThemeProvider } from "@/components/ui/theme-provider"; // <-- Import ThemeProvider

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthProvider> 
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen">
          <main className="flex-1 px-8 max-w-screen mx-auto">
            {children}
            <Toaster richColors position="top-center" />
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
