"use client";
import { useState, useEffect, useId, ReactNode } from "react";
import { useTheme } from "next-themes";
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
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { LoaderCircle, ArrowRightIcon, Search, Plus } from "lucide-react";
import NavbarAdmin from "@/components/NavbarAdmin";
import { authApi } from "@/lib/api";
import { toast } from "sonner";

export default function PelangganContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const id = useId();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  interface User {
    role: ReactNode;
    createdAt: string | number | Date;
    id: string;
    name: string;
    email: string;
    // add other properties if needed
  }

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      // getAllUsers already has a default limit of 5
      const response = await authApi.getAllUsers(page);
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch {
      toast.error("Gagal memuat data pengguna");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Handle create user
  const handleCreateUser = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await authApi.register({
        name: formData.get("nama") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });
      toast.success("Berhasil menambah pengguna");
      setOpenDialog(false);
      fetchUsers(); // Refresh the users list
    } catch {
      toast.error("Gagal menambah pengguna");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete user
  const handleDelete = async (id: string) => {
    const konfirmasi = confirm("Yakin ingin menghapus pelanggan ini?");
    if (konfirmasi) {
      try {
        setIsLoading(true);
        // Remove the /api prefix from the endpoint
        await authApi.deleteUser(Number(id));
        toast.success("Berhasil menghapus pengguna");
        fetchUsers();
        } catch (error: unknown) {
          if (error instanceof Error) {
            toast.error(error.message || "Gagal menghapus pengguna");
          } else {
            toast.error("Gagal menghapus pengguna");
          }
      } finally {
        setIsLoading(false);
      }
    }
  };

    // Add these handler functions
    const handleDetail = (userId: number) => {
      console.log("Tombol Detail Ditekan untuk User ID:", userId); // Tambahkan log
      const user = users.find((u: User) => u.id === userId);
      if (user) {
        console.log("User ditemukan:", user); // Tambahkan log untuk memastikan data ditemukan
        setSelectedUser(user);
        setOpenDetailDialog(true); // Membuka dialog
      } else {
        console.log("User tidak ditemukan"); // Tambahkan log jika user tidak ditemukan
      }
    };

  const filteredData = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const PaginationControls = () => (
    <div className="mt-4 flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <p className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
          Halaman {page} dari {totalPages}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className={isDarkMode ? "text-white" : "text-black"}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous Page</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className={isDarkMode ? "text-white" : "text-black"}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next Page</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <NavbarAdmin title="Pelanggan" />

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
              className={` max-sm:p-0 ${
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
              <span className="max-sm:sr-only">Tambah Pelanggan</span>
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
                    Tambah Pelanggan
                  </h2>
                </DialogTitle>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  Masukkan detail pelanggan baru.
                </p>
              </div>
            </div>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateUser(new FormData(e.target as HTMLFormElement));
              }}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="nama"
                  className={isDarkMode ? "text-white" : "text-black"}
                >
                  Nama
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Masukkan Nama"
                  type="text"
                  required
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={isDarkMode ? "text-white" : "text-black"}
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Masukkan Email"
                  type="email"
                  required
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className={isDarkMode ? "text-white" : "text-black"}
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Masukkan Password"
                  type="password"
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

      {/* Data Table Section */}
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
          Data Pelanggan
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`bg-primary text-white`}>
                <th className="p-3 text-left rounded-l-lg">ID</th>
                <th className="p-3 text-left">Nama</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item: User) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 transition"
                >
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        item.role === "admin"
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
                        <Button
                          className={`border border-black text-black ${
                            isDarkMode
                              ? "bg-black text-white hover:bg-gray-700 border-black"
                              : "bg-white text-black hover:bg-gray-100 border-white"
                          }`}
                        >
                          Aksi <ChevronDown size={16} className="ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white w-40">
                        <DropdownMenuItem
                          className="text-black"
                          onClick={() => handleDetail(Number(item.id))}
                        >
                          Lihat Detail
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(item.id)}
                        >
                          Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationControls />
        </div>
      </div>

      {selectedUser && (
        <Dialog open={openDetailDialog} onOpenChange={setOpenDetailDialog}>
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
                    Detail Pelanggan
                  </h2>
                </DialogTitle>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Nama
                </p>
                <p className={isDarkMode ? "text-white" : "text-black"}>
                  {selectedUser.name}
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Email
                </p>
                <p className={isDarkMode ? "text-white" : "text-black"}>
                  {selectedUser.email}
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Role
                </p>
                <p className={isDarkMode ? "text-white" : "text-black"}>
                  {selectedUser.role}
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Tanggal Bergabung
                </p>
                <p className={isDarkMode ? "text-white" : "text-black"}>
                  {new Date(selectedUser.createdAt).toLocaleDateString(
                    "id-ID",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
