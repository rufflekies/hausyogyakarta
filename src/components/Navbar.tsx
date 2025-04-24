"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { MdNightsStay } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId, useState, useEffect } from "react";

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const id = useId();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // Untuk menghindari hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDarkMode = resolvedTheme === "dark";

  return (
    <nav
      className={`sticky top-0 z-50 shadow transition-colors ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo kiri */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="Haus Logo" width={40} height={40} />
          <span className="mt-2 text-xl font-bold">haus!</span>
        </div>

        {/* Menu kanan */}
        <div className="flex items-center space-x-6">
          <div
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            className="p-2 rounded transition-colors cursor-pointer"
          >
            {isDarkMode ? (
              <IoSunny className="w-6 h-6 text-yellow-400 hover:text-primary" />
            ) : (
              <MdNightsStay className="w-6 h-6 text-gray-800 hover:text-primary" />
            )}
          </div>

          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/home"
                className="font-semibold text-lg hover:text-primary"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="font-semibold text-lg hover:text-primary"
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="font-semibold text-lg hover:text-primary"
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-semibold text-lg hover:text-primary"
              >
                Kontak
              </Link>
            </li>

            {/* Dialog Login dari ikon profil */}
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="hover:text-primary">
                    <FaUserCircle className="w-6 h-6" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <div className="flex flex-col items-center gap-2">
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
                        <h2 className="text-lg font-bold">
                          {authMode === "signin"
                            ? "Welcome back"
                            : "Create account"}
                        </h2>
                      </DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        {authMode === "signin"
                          ? "Enter your credentials to login."
                          : "Let's get you set up."}
                      </p>
                    </div>
                  </div>

                  <form className="space-y-5">
                    <div className="space-y-4">
                      {authMode === "signup" && (
                        <div className="space-y-2">
                          <Label htmlFor={`${id}-username`}>Username</Label>
                          <Input
                            id={`${id}-username`}
                            placeholder="Enter your username"
                            required
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor={`${id}-email`}>Email</Label>
                        <Input
                          id={`${id}-email`}
                          type="email"
                          placeholder="hi@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${id}-password`}>Password</Label>
                        <Input
                          id={`${id}-password`}
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      {authMode === "signup" && (
                        <div className="space-y-2">
                          <Label htmlFor={`${id}-confirm`}>
                            Confirm Password
                          </Label>
                          <Input
                            id={`${id}-confirm`}
                            type="password"
                            placeholder="Re-type your password"
                            required
                          />
                        </div>
                      )}
                    </div>
                    <Button type="submit" className="w-full">
                      {" "}
                      {authMode === "signin" ? "Sign in" : "Sign up"}{" "}
                    </Button>
                  </form>

                  <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                  </div>

                  <p className="text-sm text-center mt-4">
                    {authMode === "signin" ? (
                      <>
                        Belum punya akun?{" "}
                        <button
                          onClick={() => setAuthMode("signup")}
                          className="text-primary hover:underline"
                        >
                          Daftar
                        </button>
                      </>
                    ) : (
                      <>
                        Sudah punya akun?{" "}
                        <button
                          onClick={() => setAuthMode("signin")}
                          className="text-primary hover:underline"
                        >
                          Masuk
                        </button>
                      </>
                    )}
                  </p>
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
