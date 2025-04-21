"use client";

export default function Hero() {
  return (
    <section
      id="beranda"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-12"
    >
      {/* Kiri - Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Haus!{" "}
          <span className="block">
            Semua Orang Berhak Minum Enak
          </span>
        </h1>
        <p className="text-lg">
          "Hmm, asli seger banget! Bahan bakunya berkualitas, harganya
          murah-murah lagi. Cuss ke Haus!" – Ria Ricis
        </p>
        <a
          href="#menu"
          className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Beli Sekarang
        </a>
      </div>

      {/* Kanan - Gambar */}
      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src="/home.png"
          alt="Minuman Segar Haus"
          className="w-full max-w-md object-contain"
        />
      </div>
    </section>
  );
}
