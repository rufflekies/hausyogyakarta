"use client";
import { useState, useEffect, useId } from "react";
import { useTheme } from "next-themes"; // import useTheme
import { ChevronDown, PencilIcon, TrashIcon} from "lucide-react";
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
import { LoaderCircle, ArrowRightIcon, Search, Plus } from "lucide-react";
import NavbarAdmin from "@/components/NavbarAdmin";

export default function KategoriContent() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const { theme } = useTheme(); // Hook for theme
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const isDarkMode = theme === "dark"; // Check if dark mode is enabled
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
      item.nama.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <NavbarAdmin title="Kategori" />

      {/* Search & Tambah Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex w-full max-w-xs">
          <Input
            id={id}
            className={`peer ps-9 ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
            placeholder="Cari nama atau email..."
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div
            className={`pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 ${
              isDarkMode ? "text-white/80" : "text-muted-foreground/80"
            } peer-disabled:opacity-50`}
          >
            {isLoading ? (
              <LoaderCircle
                className="animate-spin"
                size={16}
                strokeWidth={2}
                role="status"
                aria-label="Loading..."
              />
            ) : (
              <Search size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </div>

          <button
            className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Press to speak"
            type="submit"
          >
            <ArrowRightIcon size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={`aspect-square max-sm:p-0 ${
                isDarkMode
                  ? "text-white bg-black hover:bg-white/20"
                  : "text-black bg-white hover:bg-gray-100"
              }`}
            >
              <Plus
                className="opacity-60 sm:-ms-1 sm:me-2"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <span className="max-sm:sr-only">Tambah Kategori</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className={`max-w-md ${
              isDarkMode ? "bg-black text-white" : "bg-white"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-center">
                <DialogTitle asChild>
                  <h2 className="text-lg font-bold">Tambah Kategori</h2>
                </DialogTitle>
                <p className="text-sm">Masukkan detail kategori baru.</p>
              </div>
            </div>
            <form className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor={`${id}-id`}
                  className={isDarkMode ? "text-white" : "text-black"}
                >
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
                <Label
                  htmlFor={`${id}-kategori`}
                  className={isDarkMode ? "text-white" : "text-black"}
                >
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
                <Label
                  htmlFor={`${id}-total`}
                  className={isDarkMode ? "text-white" : "text-black"}
                >
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
              <Button
                type="submit"
                className="text-white w-full mt-4 bg-primary"
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Data Table Section */}
      <div
        className={`text-${isDarkMode ? "white" : "black"} bg-${
          isDarkMode ? "black" : "white"
        } rounded-lg p-4 shadow`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Data Kategori
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`bg-primary text-white`}>
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
                  className="border-b border-gray-200 transition"
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.nama}</td>
                  <td className="p-3">{item.totalProduk}</td>
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
                          Aksi <ChevronDown size={16} />
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
