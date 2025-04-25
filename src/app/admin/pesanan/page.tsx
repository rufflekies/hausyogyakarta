"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search } from "lucide-react";

export default function PesananContent() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const inputId = useId();

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

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`text-sm ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : isDarkMode
                  ? "bg-zinc-900 text-primary hover:bg-zinc-800"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="relative flex w-full max-w-xs">
          <Input
            id={inputId}
            placeholder="Cari nama..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`ps-9 ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground pointer-events-none">
            <Search size={16} />
          </div>
        </div>
      </div>

      {/* Tabel Pesanan */}
      <div
        className={`rounded-lg p-4 shadow overflow-x-auto ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary text-white">
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
                className="border-b border-gray-200 dark:border-zinc-700 transition"
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.nama}</td>
                <td className="p-3">{order.total}</td>
                <td className="p-3">{order.tanggal}</td>
                <td className="p-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className={`border border-black text-black ${
                          isDarkMode
                            ? "bg-black text-white hover:bg-gray-700 border-black"
                            : "bg-white text-black hover:bg-gray-100 border-white"
                        }`}
                      >
                        {order.status}
                        <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={`w-40 ${isDarkMode ? "bg-black" : "bg-white"}`}
                    >
                      {["Proses", "Selesai", "Dibatalkan"].map((status) => (
                        <DropdownMenuItem
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                          className={`${
                            isDarkMode
                              ? "text-white hover:bg-zinc-700"
                              : "text-black hover:bg-gray-100"
                          }`}
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
    </>
  );
}
