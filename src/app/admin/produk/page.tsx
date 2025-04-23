// app/admin/pesanan/page.tsx
"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState } from "react";

export default function ProdukContent() {
  const [activeTab, setActiveTab] = useState("Semua");

  const produkData = [
    {
      id: "P001",
      nama: "Es Teh Manis",
      kategori: "Haus",
      harga: "Rp5.000",
    },
    {
      id: "P002",
      nama: "Nasi Goreng Spesial",
      kategori: "Makanan",
      harga: "Rp15.000",
    },
  ];

  const tabs = ["Semua", "Haus", "Haus Panas", "Makanan"];

  return (
    <>
      <NavbarAdmin title="Data Produk" />

      {/* Tabs + Button Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
          + Tambah
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-white text-black rounded-lg p-4 shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Gambar</th>
                <th className="p-3 text-left">Nama Produk</th>
                <th className="p-3 text-left">Kategori</th>
                <th className="p-3 text-left">Harga</th>
                <th className="p-3 text-left rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produkData
                .filter(
                  (produk) =>
                    activeTab === "Semua" || produk.kategori === activeTab
                )
                .map((produk) => (
                  <tr
                    key={produk.id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{produk.id}</td>
                    <td className="p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    </td>
                    <td className="p-3">{produk.nama}</td>
                    <td className="p-3">{produk.kategori}</td>
                    <td className="p-3">{produk.harga}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button className="p-1 hover:text-blue-600">📝</button>
                        <button className="p-1 hover:text-gray-600">▼</button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
