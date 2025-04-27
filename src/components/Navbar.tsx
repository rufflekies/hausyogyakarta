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

const handleApiError = (err) => {
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
    err.response?.data?.message ||
    "Gagal terhubung ke server. Harap coba lagi nanti."
  );
};

const Navbar = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
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
  const [user, setUser] = useState(null);

  // Untuk menghindari hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserProfile();
    }
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

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    const fieldName = id.split("-")[1]; // Extract field name from id

    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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
      const errorMessage = handleApiError(err);
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

  // Active Section Tracking
  const [activeSection, setActiveSection] = useState("");

  // Function to update active section based on scroll position
  const handleScroll = () => {
    const sections = ["home", "about", "menu", "contact"];
    let currentSection = "";

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (
        element &&
        element.getBoundingClientRect().top <= window.innerHeight / 2
      ) {
        currentSection = section;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    // Set active section on scroll
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          <ul className="flex space-x-6">
            <li>
              <Link
                href="#home"
                className={`font-semibold text-lg hover:text-primary ${
                  activeSection === "home" ? "text-primary" : ""
                }`}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="#about"
                className={`font-semibold text-lg hover:text-primary ${
                  activeSection === "about" ? "text-primary" : ""
                }`}
              >
                Tentang
              </Link>
            </li>
            <li>
              <Link
                href="#menu"
                className={`font-semibold text-lg hover:text-primary ${
                  activeSection === "menu" ? "text-primary" : ""
                }`}
              >
                Menu
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={`font-semibold text-lg hover:text-primary ${
                  activeSection === "contact" ? "text-primary" : ""
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
                            className="text-black w-full mb-2"
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
                        <div className="text-sm text-red-500 text-center mt-2">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        {authMode === "signup" && (
                          <div>
                            <Label htmlFor="name" className="block">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="mt-2"
                            />
                          </div>
                        )}
                        <div>
                          <Label htmlFor="email" className="block">
                            Email address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password" className="block">
                            Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2"
                          />
                        </div>
                        {authMode === "signup" && (
                          <div>
                            <Label htmlFor="confirmPassword" className="block">
                              Confirm Password
                            </Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              className="mt-2"
                            />
                          </div>
                        )}

                        <div>
                          <Button
                            type="submit"
                            className="w-full mt-4"
                            disabled={isLoading}
                          >
                            {isLoading
                              ? "Loading..."
                              : authMode === "signin"
                              ? "Sign In"
                              : "Sign Up"}
                          </Button>
                        </div>
                      </form>

                      <div className="text-center mt-4">
                        <button
                          onClick={() =>
                            setAuthMode(
                              authMode === "signin" ? "signup" : "signin"
                            )
                          }
                          className="text-blue-500 text-sm"
                        >
                          {authMode === "signin"
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                        </button>
                      </div>
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
