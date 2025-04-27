"use client"; // Add this line at the top of your file

import { useState, useEffect, useId, useCallback } from "react"; // useCallback to memoize fetchCategories
import { useTheme } from "next-themes"; // import useTheme
import {
  ChevronDown,
  PencilIcon,
  TrashIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { categoriesApi } from "@/lib/api";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  parent: Category | null;
  children: Category[];
  productCount: number;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export default function KategoriContent() {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5);
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const id = useId();

  // Add state for editing
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await categoriesApi.getAllCategories(page, itemsPerPage);
      setCategories(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      toast.error("Gagal memuat data kategori");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, itemsPerPage]); // Add itemsPerPage as dependency

  // Handle create category
  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      await categoriesApi.createCategory({
        name: formData.get("nama") as string,
        parentId: Number(formData.get("parentId")) || undefined,
      });
      toast.success("Berhasil menambah kategori");
      setOpenDialog(false);
      fetchCategories();
    } catch (error) {
      toast.error("Gagal menambah kategori");
    } finally {
      setIsLoading(false);
    }
  };

  // Add handleEdit function
  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setEditDialogOpen(true);
  };

  // Add handleUpdate function
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editCategory) return;

    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      await categoriesApi.updateCategory(editCategory.id, {
        name: formData.get("name") as string,
        parentId: Number(formData.get("parentId")) || undefined,
      });
      toast.success("Berhasil mengupdate kategori");
      setEditDialogOpen(false);
      fetchCategories();
    } catch (error) {
      toast.error("Gagal mengupdate kategori");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete category
  const handleDelete = async (id: number) => {
    const konfirmasi = confirm("Yakin ingin menghapus kategori ini?");
    if (konfirmasi) {
      try {
        setIsLoading(true);
        await categoriesApi.deleteCategory(id);
        toast.success("Berhasil menghapus kategori");
        fetchCategories();
      } catch (error) {
        toast.error("Gagal menghapus kategori");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const filteredData = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
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
            <form className="space-y-5" onSubmit={handleCreateCategory}>
              <div className="space-y-2">
                <Label
                  htmlFor="nama"
                  className={isDarkMode ? "text-white" : "text-black"}
                >
                  Nama Kategori
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  placeholder="Masukkan Nama Kategori"
                  type="text"
                  required
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="parentId"
                  className={isDarkMode ? "text-white" : "text-black"}
                >
                  Parent Kategori (Optional)
                </Label>
                <Input
                  id="parentId"
                  name="parentId"
                  placeholder="ID Kategori Parent"
                  type="number"
                  className="text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="text-white w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin mr-2" size={16} />
                ) : null}
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        {editCategory && (
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent
              className={`max-w-md ${isDarkMode ? "bg-black" : "bg-white"}`}
            >
              <DialogTitle className={isDarkMode ? "text-white" : "text-black"}>
                Edit Kategori
              </DialogTitle>
              <form onSubmit={handleUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className={isDarkMode ? "text-white" : "text-black"}
                  >
                    Nama Kategori
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editCategory.name}
                    required
                    className="text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="parentId"
                    className={isDarkMode ? "text-white" : "text-black"}
                  >
                    Parent Kategori
                  </Label>
                  <div className="text-sm text-gray-500 mb-2">
                    {editCategory.parent
                      ? `Current: ${editCategory.parent.name}`
                      : "No parent"}
                  </div>
                  <Input
                    id="parentId"
                    name="parentId"
                    type="number"
                    placeholder="ID Kategori Parent (kosongkan jika tidak ada)"
                    defaultValue={editCategory.parentId || ""}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditDialogOpen(false)}
                    className={isDarkMode ? "text-white" : "text-black"}
                  >
                    Batal
                  </Button>
                  <Button type="submit" className="text-white">
                    {isLoading ? (
                      <LoaderCircle className="animate-spin mr-2" size={16} />
                    ) : null}
                    Simpan
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
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
                  <td className="p-3">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      {item.parent && (
                        <span className="text-xs text-gray-500">
                          Parent: {item.parent.name}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{item.productCount}</td>
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
                          className="text-black"
                          onClick={() => handleEdit(item)}
                        >
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-500"
                          onClick={() => handleDelete(item.id)}
                        >
                          <TrashIcon className="mr-2 h-4 w-4" />
                          Hapus
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
        <div className="mt-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <p
              className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}
            >
              Halaman {page} dari {totalPages}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || isLoading}
              className={isDarkMode ? "text-white" : "text-black"}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous Page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || isLoading}
              className={isDarkMode ? "text-white" : "text-black"}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next Page</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
