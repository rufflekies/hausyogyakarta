"use client";
export default function Footer() {
  return (
    <footer className="py-10 px-6 text-sm">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-2">Toko Biramti</h4>
          <p>Jl. Contoh No. 123, Yogyakarta</p>
          <p>08.00 - 17.00</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Menu</h4>
          <ul className="space-y-1">
            <li>Haus Klasik</li>
            <li>Haus Cheese</li>
            <li>Makanan</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Jelajah</h4>
          <ul className="space-y-1">
            <li>
              <a href="#beranda">Beranda</a>
            </li>
            <li>
              <a href="#tentang">Tentang</a>
            </li>
            <li>
              <a href="#menu">Menu</a>
            </li>
            <li>
              <a href="#kontak">Kontak</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Kontak</h4>
          <p>Telp: 0812-3456-7890</p>
          <p>Email: biramti@example.com</p>
        </div>
      </div>
    </footer>
  );
}
