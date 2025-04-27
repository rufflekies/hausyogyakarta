"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState, useEffect, useId, useRef } from "react";
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
import { 
  ChevronDown, ChevronLeft,ChevronRight,
  BoltIcon, 
  TrashIcon, 
  LoaderCircle, 
  ArrowRightIcon, 
  Search, 
  Plus
} from "lucide-react";
import { productsApi } from "@/lib/api"; // Update path as needed
import { toast } from "sonner"; // Import toast from sonner

// Define product type based on API response
interface Product {
  id: number;
  name: string;
  slug?: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  categoryId: number;
  createdAt?: string;
  updatedAt?: string;
  category?: {
    id: number;
    name: string;
    slug?: string;
    parentId?: number | null;
  };
  imageUrl: string;
}

export default function ProdukContent() {
  const [openDialog, setOpenDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    total: 0,
    pages: 1
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    categoryId: "",
    isAvailable: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const id = useId();
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  // Function to fetch products from API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productsApi.getAllProducts(
        pagination.page, 
        pagination.limit,
        undefined,
        search || undefined
      );
      
      if (response.status === "success") {
        setProducts(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load products when component mounts or when page/search changes
  useEffect(() => {
    fetchProducts();
  }, [pagination.page, search]);

  // Handle search input with debounce
  useEffect(() => {
    if (search !== "") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        fetchProducts();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [search]);

  // Reset form function
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      description: "",
      categoryId: "",
      isAvailable: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingProductId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Open dialog for adding new product
  const handleAddProduct = () => {
    resetForm();
    setOpenDialog(true);
  };

  // Open dialog for editing product
  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      description: product.description || "",
      categoryId: product.categoryId.toString(),
      isAvailable: product.isAvailable,
    });
    setImagePreview(product.imageUrl);
    setOpenDialog(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change for isAvailable
  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isAvailable: e.target.checked }));
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Create FormData object for multipart/form-data
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("price", formData.price);
    submitData.append("description", formData.description);
    submitData.append("categoryId", formData.categoryId);
    submitData.append("isAvailable", formData.isAvailable.toString());
    
    // Add image file if it exists
    if (imageFile) {
      submitData.append("image", imageFile);
    }

    try {
      let response;
      
      if (editingProductId) {
        // Update existing product
        response = await productsApi.updateProduct(editingProductId, submitData);
        toast.success("Produk berhasil diperbarui");
      } else {
        // Create new product
        response = await productsApi.createProduct(submitData);
        toast.success("Produk baru berhasil ditambahkan");
      }
      
      // Refresh product list and close dialog
      fetchProducts();
      setOpenDialog(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Gagal menyimpan produk. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle product deletion
  const handleDelete = async (productId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await productsApi.deleteProduct(productId);
        toast.success("Produk berhasil dihapus");
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Gagal menghapus produk. Silakan coba lagi.");
      }
    }
  };

  // Format price to IDR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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
            aria-label="Search"
            type="submit"
            onClick={() => fetchProducts()}
          >
            <ArrowRightIcon size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <Dialog open={openDialog} onOpenChange={(open) => {
          setOpenDialog(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className={`max-sm:p-0 ${
                isDarkMode
                  ? "text-white bg-black hover:bg-white/20"
                  : "text-black bg-white hover:bg-gray-100"
              }`}
              onClick={handleAddProduct}
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
                    {editingProductId ? "Edit Produk" : "Tambah Produk"}
                  </h2>
                </DialogTitle>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-700"
                  }`}
                >
                  {editingProductId ? "Edit detail produk." : "Masukkan detail produk baru."}
                </p>
              </div>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Nama Produk
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Masukkan Nama Produk"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="categoryId"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Kategori
                </Label>
                <Input
                  id="categoryId"
                  name="categoryId"
                  placeholder="ID Kategori Produk"
                  type="number"
                  required
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="price"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Harga
                </Label>
                <Input
                  id="price"
                  name="price"
                  placeholder="Masukkan Harga"
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  className="text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Deskripsi
                </Label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Deskripsi Produk"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    isDarkMode ? "bg-black text-white border-gray-700" : "bg-white text-black border-gray-300"
                  }`}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="image"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Gambar
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="text-muted-foreground"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded" 
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleAvailabilityChange}
                  className="rounded text-primary"
                />
                <Label
                  htmlFor="isAvailable"
                  className={`${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Produk Tersedia
                </Label>
              </div>
              <Button 
                type="submit" 
                className="text-white w-full mt-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
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
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left rounded-r-lg">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    <LoaderCircle className="animate-spin mx-auto" size={24} />
                    <p className="mt-2">Loading products...</p>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    No products found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-200 transition"
                  >
                    <td className="p-3">{product.id}</td>
                    <td className="p-3">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl.replace('http://localhost:80', 'http://103.210.35.189:8111')} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      )}
                    </td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.category?.name || '-'}</td>
                    <td className="p-3">{formatPrice(product.price)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.isAvailable 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                      </span>
                    </td>
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
                              className="text-black hover:bg-blue-100"
                              onClick={() => handleEdit(product)}
                            >
                              <BoltIcon
                                size={16}
                                className="opacity-60 mr-2"
                                aria-hidden="true"
                              />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 hover:bg-red-100"
                              onClick={() => handleDelete(product.id)}
                            >
                              <TrashIcon size={16} className="mr-2" />
                              Hapus Produk
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {pagination.pages > 1 && (
  <div className="mt-4 flex items-center justify-between px-2">
    <div className="flex items-center gap-2">
      <p className={`text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
        Halaman {pagination.page} dari {pagination.pages}
      </p>
    </div>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
        disabled={pagination.page === 1 || isLoading}
        className={isDarkMode ? "text-white" : "text-black"}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
        disabled={pagination.page === pagination.pages || isLoading}
        className={isDarkMode ? "text-white" : "text-black"}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </Button>
    </div>
  </div>
)}
      </div>
    </>
  );
}