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
import { authApi } from "@/lib/api"; // Import API functions
import { useRouter } from "next/navigation"; // Import router
import { AxiosError } from "axios";

const handleApiError = (err: AxiosError) => {
  console.error("API Error:", {
    message: err.message,
    status: err.response?.status,
    data: err.response?.data,
    request: {
      url: err.config?.url,
      method: err.config?.method,
      baseURL: err.config?.baseURL,
    },
  });

  return (
    (err.response?.data as { message?: string })?.message ||
    "Gagal terhubung ke server. Harap coba lagi nanti."
  );
};

const Navbar = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const id = useId();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // User state
  interface User {
    name: string;
    email: string;
    role: string;
  }

  const [user, setUser] = useState<User | null>(null);

  // Untuk menghindari hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Active section state
  const [activeSection, setActiveSection] = useState<string>("home");

  useEffect(() => {
    setMounted(true);

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile();
    }

    // Scroll event listener to change active section
    const handleScroll = () => {
      const sections = ["home", "about", "menu", "contact"];
      const sectionOffsets = sections.map((section) => {
        const element = document.getElementById(section);
        return element ? element.offsetTop : 0;
      });

      const scrollPosition = window.scrollY;

      for (let i = 0; i < sectionOffsets.length; i++) {
        if (
          scrollPosition >= sectionOffsets[i] - 50 &&
          scrollPosition < (sectionOffsets[i + 1] || Infinity) - 50
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user profile if token exists
  const fetchUserProfile = async () => {
    try {
      const response = await authApi.getProfile();
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      localStorage.removeItem("token");
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    const fieldName = id.split("-")[1]; // Extract field name from id

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  }

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (authMode === "signin") {
        // Login
        const response = await authApi.login({
          email: formData.email,
          password: formData.password,
        });

        setUser(response.data);
        router.refresh();
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        // Register
        const response = await authApi.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        setUser(response.data);
        router.refresh(); // Refresh page to update UI
      }

      // Close dialog by triggering ESC key
      const event = new KeyboardEvent("keydown", {
        key: "Escape",
        bubbles: true,
      });
      document.dispatchEvent(event);
    } catch (err) {
      const errorMessage = handleApiError(err as AxiosError);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    authApi.logout();
    setUser(null);
    router.refresh();
  };

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
                href="#home"
                className={`font-semibold text-lg ${
                  activeSection === "home"
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className={`font-semibold text-lg ${
                  activeSection === "about"
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                href="#menu"
                className={`font-semibold text-lg ${
                  activeSection === "menu"
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={`font-semibold text-lg ${
                  activeSection === "contact"
                    ? "text-primary"
                    : "hover:text-primary"
                }`}
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
                  className={`max-w-md ${
                    isDarkMode ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  {user ? (
                    // User is logged in - show profile info
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
                          <h2 className="text-lg font-bold">Profile</h2>
                        </DialogTitle>
                        <p className="text-sm text-muted-foreground mt-2">
                          Welcome back, {user.name}!
                        </p>
                      </div>
                      <div className="w-full mt-4">
                        <div className="text-sm mb-4">
                          <p>
                            <strong>Name:</strong> {user.name}
                          </p>
                          <p>
                            <strong>Email:</strong> {user.email}
                          </p>
                          <p>
                            <strong>Role:</strong> {user.role}
                          </p>
                        </div>

                        {/* Add Admin Dashboard Button */}
                        {user.role === "ADMIN" && (
                          <Button
                            onClick={() => router.push("/admin")}
                            className={`w-full mb-2 ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                            variant="secondary"
                          >
                            Dashboard Admin
                          </Button>
                        )}

                        <Button
                          onClick={handleLogout}
                          className="text-white w-full"
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // User is not logged in - show login/signup form
                    <>
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

                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-sm">
                          {error}
                        </div>
                      )}

                      <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          {authMode === "signup" && (
                            <div className="space-y-2">
                              <Label htmlFor={`${id}-name`}>Username</Label>
                              <Input
                                id={`${id}-name`}
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                required
                                className="text-muted-foreground"
                              />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label htmlFor={`${id}-email`}>Email</Label>
                            <Input
                              id={`${id}-email`}
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="hi@example.com"
                              required
                              className="text-muted-foreground"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`${id}-password`}>Password</Label>
                            <Input
                              id={`${id}-password`}
                              type="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Enter your password"
                              required
                              className="text-muted-foreground"
                            />
                          </div>
                          {authMode === "signup" && (
                            <div className="space-y-2">
                              <Label htmlFor={`${id}-confirmPassword`}>
                                Confirm Password
                              </Label>
                              <Input
                                id={`${id}-confirmPassword`}
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-type your password"
                                required
                                className="text-muted-foreground"
                              />
                            </div>
                          )}
                        </div>
                        <Button
                          type="submit"
                          className="text-white w-full"
                          disabled={isLoading}
                        >
                          {isLoading
                            ? "Processing..."
                            : authMode === "signin"
                            ? "Sign in"
                            : "Sign up"}
                        </Button>
                      </form>
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
                    </>
                  )}
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
