"use client";
export default function About() {
  return (
    <section
      id="tentang"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      <img src="/logo.svg" alt="Logo" className="w-32 h-32 mx-auto mb-6" />
      <h2 className="text-3xl font-bold mb-4">Tentang Kami</h2>
      <p className="mb-4">
        Kami adalah toko tradisional modern yang menyediakan berbagai pilihan
        makanan dan minuman khas Nusantara.
      </p>
      <div className="flex justify-center gap-4">
        <a href="#" className="hover:underline">
          Instagram
        </a>
        <a href="#" className="hover:underline">
          WhatsApp
        </a>
      </div>
    </section>
  );
}
