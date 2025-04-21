"use client";
import { useTheme } from "@/components/ui/theme-provider";
import Link from "next/link";
import Image from "next/image";
import { MdWbSunny, MdNightsStay } from "react-icons/md";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav
      className={`sticky top-0 z-50 shadow ${
        isDarkMode ? "bg-black" : "bg-white"
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
              <MdWbSunny className="w-6 h-6 text-yellow-500" />
            ) : (
              <MdNightsStay className="w-6 h-6 text-gray-800" />
            )}
          </div>

          <ul className="flex space-x-6">
            <li>
              <Link href="/home" className="font-semibold hover:underline">
                Beranda
              </Link>
            </li>
            <li>
              <Link href="/about" className="font-semibold hover:underline">
                Tentang
              </Link>
            </li>
            <li>
              <Link href="/menu" className="font-semibold hover:underline">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/contact" className="font-semibold hover:underline">
                Kontak
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
