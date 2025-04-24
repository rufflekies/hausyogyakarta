"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { MdNightsStay } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface NavbarAdminProps {
  title?: string;
}

export default function NavbarAdmin({ title }: NavbarAdminProps) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent server-side rendering issues
  }

  const isDarkMode = theme === "dark";

  return (
    <header
      className={`shadow mb-6 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      } rounded-b-lg`}
    >
      <div className="w-full flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo Haus"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="mt-2 text-xl font-bold">haus!</span>
        </div>

        {/* Navigation */}
        <nav
          className={`flex gap-6 text-lg font-semibold items-center ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <Link href="/admin" className="hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/pesanan" className="hover:text-primary">
            Pesanan
          </Link>
          <Link href="/admin/kategori" className="hover:text-primary">
            Kategori
          </Link>
          <Link href="/admin/produk" className="hover:text-primary">
            Produk
          </Link>
          <Link href="/admin/pelanggan" className="hover:text-primary">
            Pelanggan
          </Link>
        </nav>

        {/* Theme Toggle & Profile Icon */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            className="p-2 rounded transition-colors"
          >
            {isDarkMode ? (
              <IoSunny className="w-6 h-6 text-white hover:text-primary" />
            ) : (
              <MdNightsStay className="w-6 h-6 text-gray-800 hover:text-primary" />
            )}
          </button>

          {/* Profil/Admin */}
          <Dialog>
            <DialogTrigger asChild>
              <button className="hover:text-primary">
                <FaUserCircle className="w-6 h-6" />
              </button>
            </DialogTrigger>
            <DialogContent
              className={`max-w-sm ${
                isDarkMode ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <p className="text-center py-4">
                Profil admin atau opsi lainnya bisa ditempatkan di sini.
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Judul Halaman */}
      {title && (
        <div className="w-full px-4 pb-4">
          <h1 className="mt-8 text-xl md:text-2xl font-semibold tracking-wide">
            {title}
          </h1>
        </div>
      )}
    </header>
  );
}
