"use client";
import { Instagram } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Kiri - Gambar */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="/shared.jpg"
            alt="Tentang Kami"
            className="rounded-lg shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Kanan - Teks */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <span className="uppercase text-base tracking-widest text-primary font-semibold">
            Tentang Kami
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold leading-tight">
            Kami Menyediakan Berbagai{" "}
            <span className="block">Varian Menu Terbaru</span>
          </h2>
          <p className="text-lg">
            Haus merupakan salah satu franchise minuman manis menyegarkan
            favorit banyak orang. Selain rasanya yang enak, Haus dibanderol
            dengan harga terjangkau sehingga siapa saja bisa mencicipinya.
          </p>
          <a
            href="https://www.instagram.com/haus.indonesia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Instagram className="w-8 h-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
