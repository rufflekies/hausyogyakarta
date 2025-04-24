"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, BoltIcon, TrashIcon } from "lucide-react";

export default function ProdukContent() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");

  const produkData = [
    { id: "P001", nama: "Es Teh Manis", kategori: "Haus", harga: "Rp5.000" },
    {
      id: "P002",
      nama: "Nasi Goreng Spesial",
      kategori: "Makanan",
      harga: "Rp15.000",
    },
    { id: "P003", nama: "Teh Tarik", kategori: "Haus Panas", harga: "Rp7.000" },
    { id: "P004", nama: "Mie Ayam", kategori: "Makanan", harga: "Rp12.000" },
    {
      id: "P005",
      nama: "Kopi Susu",
      kategori: "Haus Panas",
      harga: "Rp10.000",
    },
    { id: "P006", nama: "Jus Alpukat", kategori: "Haus", harga: "Rp8.000" },
    { id: "P007", nama: "Air Mineral", kategori: "Haus", harga: "Rp3.000" },
  ];

  const tabs = ["Semua", "Haus", "Haus Panas", "Makanan"];

  const handleEdit = (id: string) => {
    console.log("Edit produk dengan ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Hapus produk dengan ID:", id);
  };

  return (
    <>
      <NavbarAdmin title="Data Produk" />

      {/* Tabs + Search + Tambah */}
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

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Cari produk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                + Tambah
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md bg-white">
              <div className="flex flex-col items-center gap-2">
                <div className="text-center">
                  <DialogTitle asChild>
                    <h2 className="text-lg font-bold text-black">
                      Tambah Produk
                    </h2>
                  </DialogTitle>
                  <p className="text-sm text-gray-700">
                    Masukkan detail produk baru.
                  </p>
                </div>
              </div>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="id" className="text-black">
                    ID
                  </Label>
                  <Input
                    id="id"
                    placeholder="Masukkan ID"
                    type="text"
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nama" className="text-black">
                    Nama Produk
                  </Label>
                  <Input
                    id="nama"
                    placeholder="Masukkan Nama Produk"
                    type="text"
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kategori" className="text-black">
                    Kategori
                  </Label>
                  <Input
                    id="kategori"
                    placeholder="Masukkan Kategori"
                    type="text"
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harga" className="text-black">
                    Harga
                  </Label>
                  <Input
                    id="harga"
                    placeholder="Masukkan Harga"
                    type="text"
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <Button type="submit" className="text-white w-full mt-4">
                  Submit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabel Data Produk */}
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
                    (activeTab === "Semua" || produk.kategori === activeTab) &&
                    (produk.nama.toLowerCase().includes(search.toLowerCase()) ||
                      produk.id.toLowerCase().includes(search.toLowerCase()) ||
                      produk.kategori
                        .toLowerCase()
                        .includes(search.toLowerCase()))
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="bg-white border border-gray-300 text-black hover:bg-gray-100">
                              Aksi <ChevronDown size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white w-40">
                            <DropdownMenuItem
                              className="text-black hover:bg-red-100"
                              onClick={() => handleEdit(produk.id)}
                            >
                              <BoltIcon
                                size={16}
                                className="opacity-60"
                                aria-hidden="true"
                              />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 hover:bg-red-100"
                              onClick={() => handleDelete(produk.id)}
                            >
                              <TrashIcon size={16} className="mr-2" />
                              Hapus Produk
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
