"use client";

import NavbarAdmin from "@/components/NavbarAdmin";
import { useState } from "react";
import { ChevronDown, CircleUserRoundIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

  const handleDetail = (id: string) => {
    alert(`Lihat detail pelanggan ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    const konfirmasi = confirm("Yakin ingin menghapus pelanggan ini?");
    if (konfirmasi) {
      alert(`Hapus pelanggan ID: ${id}`);
    }
  };

  const filteredData = pelangganData.filter(
    (pelanggan) =>
      pelanggan.nama.toLowerCase().includes(search.toLowerCase()) ||
      pelanggan.email.toLowerCase().includes(search.toLowerCase())
  );

  const [openDialog, setOpenDialog] = useState(false);

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
                    Tambah Pelanggan
                  </h2>
                </DialogTitle>
                <p className="text-sm text-gray-700">
                  Masukkan detail pelanggan baru.
                </p>
              </div>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const nama = formData.get("nama") as string;
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;
                alert(
                  `Tambah Pelanggan:\nNama: ${nama}\nEmail: ${email}\nPassword: ${password}`
                );
                setOpenDialog(false);
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="nama" className="text-black">
                  Nama
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Masukkan Nama"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-black">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Masukkan Email"
                  type="email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-black">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Masukkan Password"
                  type="password"
                  required
                />
              </div>
              <Button type="submit" className="text-white w-full mt-4">
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-white border border-gray-300 text-black hover:bg-gray-100">
                          Aksi <ChevronDown size={16} className="ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white w-40">
                        <DropdownMenuItem
                          className="text-black hover:bg-gray-100"
                          onClick={() => handleDetail(item.id)}
                        >
                          <CircleUserRoundIcon size={16} className="mr-2" />
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 hover:bg-red-100"
                          onClick={() => handleDelete(item.id)}
                        >
                          <TrashIcon size={16} className="mr-2" />
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
