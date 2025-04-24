"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState, useId } from "react";
import { ChevronDown, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function KategoriContent() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState("Semua");
  const id = useId();

  const kategoriData = [
    { id: "K001", nama: "Haus", totalProduk: 12 },
    { id: "K002", nama: "Haus Panas", totalProduk: 12 },
    { id: "K003", nama: "Makanan", totalProduk: 9 },
  ];

  const handleUpdate = (id: string) => {
    alert(`Update kategori ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    const konfirmasi = confirm("Yakin ingin menghapus kategori ini?");
    if (konfirmasi) {
      alert(`Hapus kategori ID: ${id}`);
    }
  };

  const filteredData = kategoriData.filter(
    (item) =>
      (filter === "Semua" || item.nama === filter) &&
      (item.nama.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()))
  );

  const kategoriFilters = ["Semua", "Haus", "Haus Panas", "Makanan"];

  return (
    <>
      <NavbarAdmin title="Kategori" />

      {/* Tabs + Search + Tambah */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {kategoriFilters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-md font-medium transition ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Cari kategori..."
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
            <DialogContent className="max-w-sm bg-white">
              <div className="flex flex-col items-center gap-2">
                <div className="text-center">
                  <DialogTitle asChild>
                    <h2 className="text-lg font-bold text-black">
                      Tambah Kategori
                    </h2>
                  </DialogTitle>
                  <p className="text-sm text-gray-700">
                    Masukkan detail kategori baru.
                  </p>
                </div>
              </div>
              <form className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-id`} className="text-black">
                    ID
                  </Label>
                  <Input
                    id={`${id}-id`}
                    placeholder="Masukkan ID"
                    type="text"
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-kategori`} className="text-black">
                    Nama Kategori
                  </Label>
                  <Input
                    id={`${id}-kategori`}
                    placeholder="Masukkan Nama Kategori"
                    type="text"
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-total`} className="text-black">
                    Total Produk
                  </Label>
                  <Input
                    id={`${id}-total`}
                    placeholder="Masukkan Total Produk"
                    type="number"
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

      {/* Data Table Section */}
      <div className="bg-white text-black rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-4">Data Kategori</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Nama Kategori</th>
                <th className="p-3 text-left">Total Produk</th>
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
                  <td className="p-3">{item.totalProduk}</td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-white border border-gray-300 text-black hover:bg-gray-100">
                          Aksi <ChevronDown size={16} className="ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white w-40">
                        <DropdownMenuItem
                          className="text-black hover:bg-gray-100"
                          onClick={() => handleUpdate(item.id)}
                        >
                          <PencilIcon size={16} className="mr-2" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 hover:bg-red-100"
                          onClick={() => handleDelete(item.id)}
                        >
                          <TrashIcon size={16} className="mr-2" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
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
