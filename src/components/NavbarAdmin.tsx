"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { MdNightsStay } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import withAdminAuth from "@/components/withAdminAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface NavbarAdminProps {
  title?: string;
}

function NavbarAdmin({ title }: NavbarAdminProps) {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuthContext();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Prevent SSR issues
  }

  const isDarkMode = theme === "dark";

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Menentukan apakah link sedang aktif berdasarkan path halaman
  const getActiveLinkClass = (path: string) => {
    return router.pathname === path ? "text-primary" : "";
  };

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
          <Link
            href="/admin"
            className={`hover:text-primary ${getActiveLinkClass("/admin")}`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/pesanan"
            className={`hover:text-primary ${getActiveLinkClass(
              "/admin/pesanan"
            )}`}
          >
            Pesanan
          </Link>
          <Link
            href="/admin/kategori"
            className={`hover:text-primary ${getActiveLinkClass(
              "/admin/kategori"
            )}`}
          >
            Kategori
          </Link>
          <Link
            href="/admin/produk"
            className={`hover:text-primary ${getActiveLinkClass(
              "/admin/produk"
            )}`}
          >
            Produk
          </Link>
          <Link
            href="/admin/pelanggan"
            className={`hover:text-primary ${getActiveLinkClass(
              "/admin/pelanggan"
            )}`}
          >
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

          {/* Profile/Admin */}
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
              {user ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-center">
                    <DialogTitle asChild>
                      <h2 className="text-lg font-bold">Profil Admin</h2>
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Welcome, {user.name}!
                    </p>
                  </div>
                  <div className="text-sm w-full text-left space-y-2">
                    <p>
                      <strong>Nama:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                      <strong>Role:</strong> {user.role}
                    </p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full text-white mt-4"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>Belum login.</p>
                </div>
              )}
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

export default withAdminAuth(NavbarAdmin);
