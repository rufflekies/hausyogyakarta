// app/admin/pesanan/page.tsx
"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState } from "react";

export default function PelangganContent() {
  const [search, setSearch] = useState("");

  const pelangganData = [
    {
      id: "0001",
      nama: "Noval Noval Noval",
      email: "noval@mail.com",
      role: "User",
    },
    {
      id: "0002",
      nama: "Cahyo Cahyo Cahyo",
      email: "cahyo@mail.com",
      role: "Admin",
    },
  ];

  const filteredData = pelangganData.filter(
    (pelanggan) =>
      pelanggan.nama.toLowerCase().includes(search.toLowerCase()) ||
      pelanggan.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NavbarAdmin title="Pelanggan" />

      {/* Search & Tambah Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Cari
          </button>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          + Tambah
        </button>
      </div>

      {/* Data Table Section */}
      <div className="bg-white text-black rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">Data Pelanggan</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.role === "Admin"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="p-1 hover:text-blue-600">📝</button>
                      <button className="p-1 hover:text-red-600">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
