"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function PesananContent() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const [orders, setOrders] = useState([
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
    {
      id: "0003",
      nama: "Siti Aminah",
      total: "Rp23.000",
      status: "Proses",
      tanggal: "21/4/25 14:40",
    },
    {
      id: "0004",
      nama: "Budi Santoso",
      total: "Rp100.000",
      status: "Selesai",
      tanggal: "21/4/25 14:55",
    },
    {
      id: "0005",
      nama: "Rina Agustina",
      total: "Rp75.000",
      status: "Proses",
      tanggal: "21/4/25 15:00",
    },
  ]);

  const tabs = ["Semua", "Selesai", "Proses", "Dibatalkan"];

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    console.log(`Status pesanan ${id} diubah menjadi ${newStatus}`);
  };

  const filteredOrders = orders
    .filter((order) => activeTab === "Semua" || order.status === activeTab)
    .filter((order) =>
      order.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <NavbarAdmin title="Pesanan" />

      {/* Tabs Section */}
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md font-medium transition ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-zinc-800 dark:text-red-300 dark:hover:bg-zinc-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            placeholder="Cari nama..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
            Cari
          </button>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg p-4 shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Tanggal</th>
                <th className="p-3 text-left rounded-r-lg">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 transition"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.nama}</td>
                  <td className="p-3">{order.total}</td>
                  <td className="p-3">{order.tanggal}</td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-600 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-700">
                          {order.status} <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white dark:bg-zinc-900 w-40">
                        {["Proses", "Selesai", "Dibatalkan"].map((status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            className="text-black dark:text-white hover:bg-red-100 dark:hover:bg-zinc-700"
                          >
                            {status}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
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
