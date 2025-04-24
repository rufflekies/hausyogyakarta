"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MenuFull from "@/components/ui/menu-full";

const categories = [
  {
    title: "Haus",
    image: "/haus.png",
    link: "#menu1",
  },
  {
    title: "Haus Panas",
    image: "/panas.png",
    link: "#menu2",
  },
  {
    title: "Haus Makanan",
    image: "/roti.png",
    link: "#menu3",
  },
];

export default function Menu() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (
    <section
      id="menu"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <span className="text-primary uppercase tracking-wide font-medium">
        Berbagai
      </span>
      <h2
        className={`text-3xl md:text-4xl font-bold mt-2 mb-12 ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
        Menu Yang Tersedia
      </h2>

      {/* Kategori Menu */}
      <div className="flex flex-wrap justify-center gap-6 mb-16">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 w-fit ${
              isDarkMode ? "bg-black" : "bg-white"
            }`}
          >
            <img
              src={category.image}
              alt={`Gambar ${category.title}`}
              className="w-48 h-48 object-contain rounded-md mb-4"
            />
            <h3
              className={`text-xl font-semibold mb-2 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {category.title}
            </h3>
            <a
              href={category.link}
              className="text-primary hover:underline font-medium mt-auto"
            >
              Lihat Menu
            </a>
          </div>
        ))}
      </div>

      {/* Detail Menu */}
      <section>
        <MenuFull />
      </section>
    </section>
  );
}
