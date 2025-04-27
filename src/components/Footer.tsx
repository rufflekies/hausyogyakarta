"use client";
import { Instagram, MessageCircle, Music2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for the component to mount before using the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing until the component is mounted

  const isDarkMode = theme === "dark";
  return (
    <footer
      className={`py-12 px-6 text-base ${
        isDarkMode ? "text-white" : "text-gray-700"
      }`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Kolom 1 - Haus & Deskripsi */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/logo.png" alt="Logo Haus" width={40} height={40} />
            <h4
              className={`font-bold text-lg ${
                isDarkMode ? "text-white" : "text-primary"
              }`}
            >
              haus!
            </h4>
          </div>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>

          
            Minuman kekinian dengan rasa yang nikmat dan harga bersahabat.
          </p>
        </div>

        {/* Kolom 2 - Menu */}
        <div className="pl-8">
          <h4
            className={`font-semibold text-lg ${
              isDarkMode ? "text-white" : "text-primary"
            } mb-2`}
          >
            Menu
          </h4>
          <ul className="space-y-1">
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Menu Haus
            </li>
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Menu Haus Panas
            </li>
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Menu Haus Makanan
            </li>
          </ul>
        </div>

        {/* Kolom 3 - Jelajah */}
        <div>
          <h4
            className={`font-semibold text-lg ${
              isDarkMode ? "text-white" : "text-primary"
            } mb-2`}
          >
            Jelajah
          </h4>
          <ul className="space-y-1">
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <a href="#beranda" className="hover:underline">
                Beranda
              </a>
            </li>
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <a href="#tentang" className="hover:underline">
                Tentang
              </a>
            </li>
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <a href="#menu" className="hover:underline">
                Menu
              </a>
            </li>
            <li className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              <a href="#kontak" className="hover:underline">
                Kontak
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 4 - Kontak & Sosial Media */}
        <div>
          <h4
            className={`font-semibold text-lg ${
              isDarkMode ? "text-white" : "text-primary"
            } mb-2`}
          >
            Kontak
          </h4>
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            Telp: 0812-3456-7890
          </p>
          <p
            className={`${isDarkMode ? "text-gray-400" : "text-gray-600"} mb-4`}
          >
            Email:{" "}
            <a href="mailto:haus@example.com" className="hover:underline">
              haus@example.com
            </a>
          </p>
          <div className="flex gap-4 text-primary">
            <a
              href="https://www.instagram.com/haus.indonesia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                className={`w-6 h-6 hover:text-primary/80 ${
                  isDarkMode ? "text-white" : "text-primary"
                }`}
              />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle
                className={`w-6 h-6 hover:text-primary/80 ${
                  isDarkMode ? "text-white" : "text-primary"
                }`}
              />
            </a>
            <a
              href="https://www.tiktok.com/@haus.indonesia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Music2
                className={`w-6 h-6 hover:text-primary/80 ${
                  isDarkMode ? "text-white" : "text-primary"
                }`}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
