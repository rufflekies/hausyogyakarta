"use client";
import { useTheme } from "@/components/ui/theme-provider";
import Link from "next/link";
import Image from "next/image";
import { MdNightsStay } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useId, useState } from "react";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const id = useId();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  return (
    <nav
      className={`sticky top-0 z-50 shadow ${
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
            onClick={toggleTheme}
            className="p-2 rounded transition-colors cursor-pointer"
          >
            {isDarkMode ? (
              <IoSunny className="w-6 h-6 text-white hover:text-primary" />
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
                <DialogContent
                  className={`max-w-sm ${isDarkMode ? "bg-black" : "bg-white"}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full">
                      {/* Ganti SVG dengan gambar logo */}
                      <Image
                        src="/logo.png"
                        alt="Logo"
                        width={40} // Sesuaikan ukuran
                        height={40} // Sesuaikan ukuran
                        className="rounded-full"
                      />
                    </div>
                    <div className="text-center">
                      <DialogTitle asChild>
                        <h2
                          className={`text-lg font-bold ${
                            isDarkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {authMode === "signin"
                            ? "Welcome back"
                            : "Create account"}
                        </h2>
                      </DialogTitle>
                      <p
                        className={`text-sm ${
                          isDarkMode ? "text-muted-foreground" : "text-gray-700"
                        }`}
                      >
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
                          <Label
                            htmlFor={`${id}-username`}
                            className={isDarkMode ? "text-white" : "text-black"}
                          >
                            Username
                          </Label>
                          <Input
                            id={`${id}-username`}
                            placeholder="Enter your username"
                            type="text"
                            required
                            className="text-muted-foreground"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <Label
                          htmlFor={`${id}-email`}
                          className={isDarkMode ? "text-white" : "text-black"}
                        >
                          Email
                        </Label>
                        <Input
                          id={`${id}-email`}
                          placeholder="hi@example.com"
                          type="email"
                          required
                          className="text-muted-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor={`${id}-password`}
                          className={isDarkMode ? "text-white" : "text-black"}
                        >
                          Password
                        </Label>
                        <Input
                          id={`${id}-password`}
                          placeholder="Enter your password"
                          type="password"
                          required
                          className="text-muted-foreground"
                        />
                      </div>

                      {authMode === "signup" && (
                        <div className="space-y-2">
                          <Label
                            htmlFor={`${id}-confirm`}
                            className={isDarkMode ? "text-white" : "text-black"}
                          >
                            Confirm Password
                          </Label>
                          <Input
                            id={`${id}-confirm`}
                            placeholder="Re-type your password"
                            type="password"
                            required
                            className="text-muted-foreground"
                          />
                        </div>
                      )}
                    </div>

                    <Button type="submit" className="text-white w-full">
                      {authMode === "signin" ? "Sign in" : "Sign up"}
                    </Button>
                  </form>

                  <div className="flex items-center gap-3 before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-muted-foreground" : "text-gray-700"
                      }`}
                    >
                      Or
                    </span>
                  </div>

                  <p
                    className={`text-sm text-center mt-4 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
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
