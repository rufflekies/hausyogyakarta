"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState, useEffect, useId } from "react";
import { useTheme } from "next-themes"; // import useTheme
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
import { LoaderCircle, ArrowRightIcon, Search, Plus } from "lucide-react";

export default function ProdukContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = useId();
  const { theme, setTheme } = useTheme(); // Hook untuk tema
  const isDarkMode = theme === "dark"; // Cek apakah mode gelap aktif

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

  useEffect(() => {
    if (search) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [search]);

  const handleEdit = (id: string) => {
    console.log("Edit produk dengan ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Hapus produk dengan ID:", id);
  };

  return (
    <>
      <NavbarAdmin title="Data Produk" />

      {/* Search & Tambah Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative flex w-full max-w-xs">
          <Input
            id={id}
            className={`peer ps-9 ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
            placeholder="Cari produk..."
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
              <span className="max-sm:sr-only">Tambah Produk</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            className={`max-w-md ${isDarkMode ? "bg-black" : "bg-white"}`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="text-center">
                <DialogTitle asChild>
                  <h2
                    className={`text-lg font-bold ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Tambah Produk
                  </h2>
                </DialogTitle>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Masukkan detail produk baru.
                </p>
              </div>
            </div>
            <form className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="id"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
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
                <Label
                  htmlFor="nama"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
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
                <Label
                  htmlFor="kategori"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
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
                <Label
                  htmlFor="harga"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
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

      {/* Tabel Data Produk */}
      <div
        className={`text-${
          isDarkMode ? "white" : "black"
        } rounded-lg p-4 shadow ${isDarkMode ? "bg-black" : "bg-white"}`}
      >
        <h2
          className={`text-lg font-semibold mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Data Produk
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white">
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
                    produk.nama.toLowerCase().includes(search.toLowerCase()) ||
                    produk.id.toLowerCase().includes(search.toLowerCase()) ||
                    produk.kategori.toLowerCase().includes(search.toLowerCase())
                )
                .map((produk) => (
                  <tr
                    key={produk.id}
                    className="border-b border-gray-200 transition"
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
