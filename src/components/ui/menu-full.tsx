import React, { useState, useEffect } from "react";
import { MdShoppingCart } from "react-icons/md";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Import Sonner toast instead of useToast
import { categoriesApi, ordersApi } from "@/lib/api";
import Image from "next/image";

// Type definitions based on API response
type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
  categoryId: number;
  imageUrl?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
  };
};

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  parent?: Category;
  children: Category[];
  productCount: number;
  products?: Product[];
};

// Menu item for display
type MenuItem = {
  id: number;
  name: string;
  image: string;
  description: string;
  sizes: { [key: string]: string };
  price: string;
  categoryId: number;
  isAvailable: boolean;
};

type MenuSection = {
  id: number;
  title: string;
  items: MenuItem[];
};

const MenuFull = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [alamat, setAlamat] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [menuSections, setMenuSections] = useState<MenuSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Mendapatkan semua kategori
        const categoriesResponse = await categoriesApi.getAllCategories(1, 100);
        const categories: Category[] = categoriesResponse.data.data;

        if (!categories || categories.length === 0) {
          throw new Error("Kategori tidak ditemukan.");
        }

        const sections: MenuSection[] = [];

        for (const category of categories) {
          // Gunakan produk yang sudah ada di objek kategori daripada mengambilnya terpisah
          const products = category.products || [];

          const menuItems: MenuItem[] = products
            .filter((product) => product.isAvailable)
            .map((product) => {
              // Ukuran default berdasarkan harga produk
              const defaultSizes = {
                Medium: `Rp ${product.price}`,
              };

              // Menangani gambar yang null
              let productImage = "/placeholder.png"; // Default to placeholder

              // Check if product image exists and is a valid URL
              if (product.image) {
                try {
                  // Attempt to create a valid URL
                  const imageUrl = new URL(product.image, process.env.NEXT_PUBLIC_API_URL);
                  productImage = imageUrl.toString();
                } catch (error) {
                  // If URL construction fails, fall back to the placeholder
                  console.error("Invalid image URL:", product.image, error);
                  productImage = "/placeholder.png";
                }
              }

              return {
                id: product.id,
                name: product.name,
                image: productImage,
                description: product.description || "",
                sizes: defaultSizes,
                price: `Rp ${product.price}`,
                categoryId: category.id,
                isAvailable: product.isAvailable,
              };
            });

          if (menuItems.length > 0) {
            sections.push({
              id: category.id,
              title: category.name,
              items: menuItems,
            });
          }
        }

        setMenuSections(sections);
      } catch (error) {
        setError("Gagal memuat data menu. Coba lagi nanti.");
        toast.error("Error Memuat Menu", {
          description: "Gagal memuat data menu. Silakan coba lagi nanti.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  const handleAddToCart = (item: MenuItem) => {
    if (!isLoggedIn) {
      toast.error("Login Required", {
        description: "Silakan login untuk memesan.",
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/login"),
        },
      });
      return;
    }

    setSelectedItem(item);
    setSelectedSize(Object.keys(item.sizes)[0]); // Default ke ukuran pertama
    setOpenDialog(true);
  };

  const formatRupiah = (value: string) => {
    return (
      "Rp " +
      value
        .replace("Rp ", "")
        .replace(".", "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Login Required", {
        description: "Silakan login untuk memesan.",
        action: {
          label: "Login",
          onClick: () => (window.location.href = "/login"),
        },
      });
      return;
    }

    if (!selectedItem || !selectedItem.sizes[selectedSize]) {
      toast.error("Error", {
        description: "Ukuran tidak tersedia untuk menu ini.",
      });
      return;
    }

    try {
      const orderData = {
        items: [
          {
            productId: selectedItem.id,
            quantity: quantity,
          },
        ],
        address: alamat,
      };

      const response = await ordersApi.createOrder(orderData);

      toast.success("Pesanan Berhasil!", {
        description: `Order ID: ${response.data.id}`,
      });

      setOpenDialog(false);
      setQuantity(1);
      setAlamat("");
    } catch (err) {
      console.error(err); // Menambahkan logging error
      toast.error("Pesanan Gagal", {
        description: "Gagal membuat pesanan. Silakan coba lagi nanti.",
      });
    }
  };

  // Calculate total price based on size and quantity
  const calculateTotalPrice = () => {
    if (selectedItem && selectedSize) {
      const hargaStr = selectedItem.sizes[selectedSize];
      const totalHarga =
        parseInt(hargaStr.replace("Rp ", "").replace(".", "")) * quantity;
      return formatRupiah(totalHarga.toString());
    }
    return "Rp 0";
  };

  if (loading) return <div className="text-center py-12">Loading menu...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <>
      {menuSections.map((section) => (
        <section key={section.id} id={`menu${section.id}`} className="mb-12">
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {section.title}
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {section.items.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 w-fit relative ${
                  isDarkMode ? "bg-black" : "bg-white"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={192} // Set image width
                  height={192} // Set image height
                  className="object-contain rounded-md"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/placeholder.png"; // Use placeholder if error occurs
                  }}
                />
                <h3
                  className={`text-xl font-semibold text-center ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.name}
                </h3>
                <span
                  className={`text-sm text-gray-500 whitespace-pre-line text-center mb-2 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {Object.keys(item.sizes).map((size) => (
                    <div key={size}>
                      {size.charAt(0).toUpperCase() + size.slice(1)} -{" "}
                      {item.sizes[size]}
                    </div>
                  ))}
                </span>
                <span
                  className={`font-bold text-primary ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.price}
                </span>

                <div className="absolute bottom-0 flex justify-end w-full">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary p-3 rounded-tl-2xl text-white text-2xl flex"
                  >
                    <MdShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className={`max-w-md ${
            isDarkMode ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-center">
              <DialogTitle asChild>
                <h2
                  className={`text-lg font-bold ${
                    isDarkMode ? "bg-black text-white" : "bg-white text-black"
                  }`}
                >
                  Pesan Menu
                </h2>
              </DialogTitle>
            </div>

            {/* Menampilkan gambar item yang dipilih */}
            {selectedItem && (
              <div className="mb-4 text-center">
                <Image
                  src={selectedItem.image || "/placeholder.png"}
                  alt={selectedItem.name}
                  width={256}
                  height={256}
                  className="object-contain rounded-md mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/placeholder.png";
                  }}
                />

                <h3
                  className={`mt-2 text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {selectedItem.name}
                </h3>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="alamat">Alamat</Label>
              <Input
                id="alamat"
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                required
                className="text-muted-foreground"
                placeholder="Alamat Anda"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="size">Pilih Ukuran</Label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className={`w-full p-2 border rounded-md ${
                  isDarkMode
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-black"
                }`}
                required
              >
                {selectedItem &&
                  Object.keys(selectedItem.sizes).map((size) => (
                    <option key={size} value={size}>
                      {size.charAt(0).toUpperCase() + size.slice(1)} -{" "}
                      {selectedItem.sizes[size]}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mb-4">
              <Label htmlFor="quantity">Jumlah</Label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Menampilkan total harga */}
            <div className="mb-4 text-center">
              <strong>Total Harga: {calculateTotalPrice()}</strong>
            </div>

            <Button type="submit" className="text-white w-full">
              Pesan Sekarang
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuFull;