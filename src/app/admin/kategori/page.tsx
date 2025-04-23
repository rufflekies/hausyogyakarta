// app/admin/pesanan/page.tsx
"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState } from "react";

export default function PesananContent() {
  const [activeTab, setActiveTab] = useState("Semua");

  const orderData = [
    {
      id: "0001",
      nama: "Noval Noval Noval",
      total: "Rp50.000",
      status: "Selesai",
      tanggal: "21/4/25 14:30",
    },
    {
      id: "0002",
      nama: "Cahyo Cahyo Cahyo",
      total: "Rp14.000",
      status: "Dibatalkan",
      tanggal: "21/4/25 14:32",
    },
    
  ];
  
  const tabs = ["Semua", "Selesai", "Proses", "Dibatalkan"];

  return (
    <>
      <NavbarAdmin title="Kategori" />

      {/* Tabs Section */}
      <div className="flex gap-2 mb-4">
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

      {/* Data Table Section */}
      <div className="bg-white text-black rounded-lg p-4 shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.nama}</td>
                  <td className="p-3">{order.total}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "Selesai"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Proses"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.tanggal}</td>
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
