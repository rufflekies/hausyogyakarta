"use client";
export default function Contact() {
  return (
    <section
      id="kontak"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">Alamat</h2>
          <p>Jl. Contoh No. 123, Yogyakarta</p>
          <p>Buka setiap hari: 08.00 - 17.00</p>
        </div>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nama"
            className="w-full p-3 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
          />
          <textarea
            placeholder="Pesan"
            className="w-full p-3 border rounded h-32"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Kirim
          </button>
        </form>
      </div>
    </section>
  );
}
