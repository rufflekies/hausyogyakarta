"use client";
import { Instagram } from "lucide-react";


export default function About() {
  return (
    <section
      id="tentang"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="flex flex-col-reverse md:flex-row items-center gap-12">
        {/* Kiri - Gambar */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/shared.jpg"
            alt="Tentang Kami"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Kanan - Teks */}
        <div className="md:w-1/2 space-y-4 text-center md:text-left">
          <span className="uppercase text-sm tracking-widest text-primary font-semibold">
            Tentang Kami
          </span>
          <h2 className="text-3xl font-bold leading-snug">
            Kami Menyediakan Berbagai <br className="hidden md:block" /> Varian
            Menu Terbaru
          </h2>
          <p className="text-gray-600">
            Haus merupakan salah satu franchise minuman manis menyegarkan
            favorit banyak orang. Selain rasanya yang enak, Haus dibanderol
            dengan harga terjangkau sehingga siapa saja bisa mencicipinya.
          </p>
          <a
            href="https://www.instagram.com/haus.indonesia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
