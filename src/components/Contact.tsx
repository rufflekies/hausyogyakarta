"use client";

import { useTheme } from "next-themes";
import { Phone, Mail, Instagram, MapPin } from "lucide-react";

export default function Contact() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const locations = [
    "Haus! - Kapten Tendean",
    "Haus! - Palagan",
    "Haus! - Taman Siswa",
    "Haus! - Godean",
    "Haus! - Kaliurang",
    "Haus! - Gejayan",
    "Haus! - Jakal Uii",
    "Haus! - Glagahsari",
    "Haus! - Seturan",
    "Haus! - Malioboro",
  ];

  return (
    <section
      id="kontak"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20"
    >
      {/* Judul */}
      <div className="text-center space-y-2">
        <span
          className={`uppercase text-base tracking-widest font-semibold ${
            isDarkMode ? "text-primary" : "text-primary"
          }`}
        >
          Hubungi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight">
          Kontak & Tempat Kami
        </h2>
      </div>

      {/* Contact Information - Three Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* WhatsApp Column */}
        <div className="bg-primary text-white p-6 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <Phone className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">+62 812-3456-7890</h3>
          <p className="text-sm text-gray-300 mb-4">
            Hubungi kami melalui WhatsApp untuk informasi lebih lanjut tentang
            menu, promosi, atau pemesanan. Kami siap melayani Anda kapan saja.
          </p>
          <a
            href="https://wa.me/6281234567890"
            className="inline-block text-sm hover:underline"
          >
            Hubungi Kami →
          </a>
        </div>

        {/* Email/Website Column */}
        <div
          className={`p-6 rounded-lg text-center ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex justify-center mb-2">
            <Mail className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">mail@haus.com</h3>
          <p className={`mb-4 text-sm ${
             isDarkMode ? "text-white" : "text-gray-800"
          }`}>
            Jika Anda memiliki pertanyaan atau membutuhkan bantuan lebih lanjut,
            Anda dapat menghubungi kami melalui email di alamat di atas.
          </p>
          <a
            href="mailto:mail@haus.com"
            className="inline-block text-sm hover:underline"
          >
            Kirim Email →
          </a>
        </div>

        {/* Instagram Column */}
        <div className="bg-primary text-white p-6 rounded-lg text-center">
          <div className="flex justify-center mb-2">
            <Instagram className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold mb-2">@haus.indonesia</h3>
          <p className="text-sm text-gray-300 mb-4">
            Ikuti kami di Instagram untuk mendapatkan update terbaru, promo
            spesial, dan berbagai inspirasi minuman dari kami.
          </p>
          <a
            href="https://www.instagram.com/haus.indonesia/"
            className="inline-block text-sm hover:underline"
          >
            Ikuti Kami →
          </a>
        </div>
      </div>

      {/* Grid Alamat Cabang */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {locations.map((lokasi, index) => (
          <div
            key={index}
            className={`${
              isDarkMode ? "bg-black" : "bg-white"
            } shadow-md rounded-2xl p-4 hover:shadow-lg transition flex items-center gap-3`}
          >
            <MapPin
              className={`w-6 h-6 ${
                isDarkMode ? "text-white" : "text-primary"
              }`}
            />
            <h3
              className={`text-base font-semibold ${
                isDarkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {lokasi}
            </h3>
          </div>
        ))}
      </div>

      {/* Card Feedback */}
      <div
        className={`${
          isDarkMode ? "bg-primary" : "bg-primary"
        } rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8`}
      >
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Beri Saran atau Kritikan
          </h2>
          <p className="text-lg text-white/90">
            Kami menghargai setiap feedback dari Anda. Berikan saran, kritik,
            atau tanggapan mengenai layanan kami agar kami dapat terus
            memperbaiki diri.
          </p>
          <div
            className={`${
              isDarkMode ? "bg-white" : "bg-white"
            } rounded-2xl p-2 flex shadow-sm`}
          >
            <input
              type="text"
              placeholder="Isi saran atau kritikan"
              className={`w-full p-2 rounded-l text-lg outline-none ${
                isDarkMode ? "text-gray-800" : "text-gray-800"
              }`}
            />
            <button
              type="submit"
              className="bg-primary text-white font-semibold px-6 py-2 rounded-2xl hover:bg-primary/90 transition"
            >
              Kirim
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/feedback.jpg"
              alt="Haus drink shop"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
