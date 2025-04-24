import React, { useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Menambahkan tipe untuk item menu
type MenuItem = {
  name: string;
  image: string;
  sizes: { [key: string]: string }; // Ukuran yang berbeda dengan harga
  price: string;
};


const menuHausKlasik: MenuItem[] = [
  {
    name: "Thai Tea",
    image: "/klasik/thai.png",
    sizes: { Small: "Rp 6.000", Large: "Rp 9.000" },
    price: "Rp 6.000",
  },
  {
    name: "Green Thai Tea",
    image: "/klasik/green.png",
    sizes: { Small: "Rp 8.000", Large: "Rp 10.000" },
    price: "Rp 8.000",
  },
  {
    name: "Ovaltine",
    image: "/klasik/oval.png",
    sizes: { Medium: "Rp 12.000", Large: "Rp 13.000" },
    price: "Rp 12.000",
  },
  {
    name: "Taro",
    image: "/klasik/taro.png",
    sizes: { Medium: "Rp 12.000", Large: "Rp 13.000" },
    price: "Rp 12.000",
  },
  {
    name: "Oreo",
    image: "/klasik/oreo.png",
    sizes: { Medium: "Rp 12.000", Large: "Rp 13.000" },
    price: "Rp 12.000",
  },
  {
    name: "MILO® Green Tea",
    image: "/klasik/milo.png",
    sizes: { Medium: "Rp 12.000", Large: "Rp 13.000" },
    price: "Rp 12.000",
  },
];

const menuHausChoco: MenuItem[] = [
  {
    name: "Choco Lava MILO®",
    image: "/choco/milo.png",
    sizes: { Medium: "Rp 13.000", Large: "Rp 14.000" },
    price: "Rp 13.000",
  },
  {
    name: "Choco Hazelnut",
    image: "/choco/hazel.png",
    sizes: { Medium: "Rp 13.000", Large: "Rp 14.000" },
    price: "Rp 13.000",
  },
  {
    name: "Choco Avocado",
    image: "/choco/avo.png",
    sizes: { Medium: "Rp 14.000", Large: "Rp 15.000" },
    price: "Rp 14.000",
  },
];

const menuHausBoba: MenuItem[] = [
  {
    name: "Boba Fresh Milk",
    image: "/boba/fresh.png",
    sizes: { Medium: "Rp 14.000", Large: "Rp 17.000" },
    price: "Rp 14.000",
  },
  {
    name: "Boba Milk Tea",
    image: "/boba/tea.png",
    sizes: { Medium: "Rp 14.000", Large: "Rp 17.000" },
    price: "Rp 14.000",
  },
];

const menuHausPanas: MenuItem[] = [
  {
    name: "Hot Lemon Tea",
    image: "/panas/lemon.png",
    sizes: { Hot: "Rp 10.000" },
    price: "Rp 10.000",
  },
  {
    name: "Hot Thai Tea",
    image: "/panas/thai.png",
    sizes: { Hot: "Rp 11.000" },
    price: "Rp 11.000",
  },
  {
    name: "Hot Coffee",
    image: "/panas/coffee.png",
    sizes: { Hot: "Rp 14.000" },
    price: "Rp 14.000",
  },
  {
    name: "Hot Ovaltine",
    image: "/panas/oval.png",
    sizes: { Hot: "Rp 14.000" },
    price: "Rp 14.000",
  },
  {
    name: "Hot Lava MILO®",
    image: "/panas/milo.png",
    sizes: { Hot: "Rp 14.000" },
    price: "Rp 14.000",
  },
];

const menuRotiBakar: MenuItem[] = [
  {
    name: "Roti Bakar Coklat",
    image: "/roti/bakarcoklat.png",
    sizes: { "": "Rp 24.000" },
    price: "Rp 24.000",
  },
  {
    name: "Roti Bakar Keju",
    image: "/roti/bakarkeju.png",
    sizes: { "": "Rp 25.000" },
    price: "Rp 25.000",
  },
  {
    name: "Roti Bakar Coklat Keju",
    image: "/roti/bakarcoklatkeju.png",
    sizes: { "": "Rp 27.000" },
    price: "Rp 27.000",
  },
];

const menuMaryam: MenuItem[] = [
  {
    name: "Roti Maryam Coklat",
    image: "/roti/maryamcoklat.png",
    sizes: { "": "Rp 13.000" },
    price: "Rp 13.000",
  },
  {
    name: "Roti Maryam Keju",
    image: "/roti/maryamkeju.png",
    sizes: { "": "Rp 14.000" },
    price: "Rp 14.000",
  },
  {
    name: "Roti Maryam Coklat Keju",
    image: "/roti/maryamcoklatkeju.png",
    sizes: { "": "Rp 16.000" },
    price: "Rp 16.000",
  },
];

const menuKukus: MenuItem[] = [
  {
    name: "Kukus Coklat",
    image: "/roti/kukuscoklat.png",
    sizes: { "": "Rp 10.000" },
    price: "Rp 10.000",
  },
  {
    name: "Kukus Keju",
    image: "/roti/kukuskeju.png",
    sizes: { "": "Rp 11.000" },
    price: "Rp 11.000",
  },
  {
    name: "Kukus Coklat Keju",
    image: "/roti/kukuscoklatkeju.png",
    sizes: { "": "Rp 14.000" },
    price: "Rp 14.000",
  },
];

const menuSections = [
  { id: "menu1", title: "Menu Haus Klasik", items: menuHausKlasik },
  { id: "menu2", title: "Menu Choco", items: menuHausChoco },
  { id: "menu3", title: "Menu Boba", items: menuHausBoba },
  { id: "menu4", title: "Menu Panas", items: menuHausPanas },
  { id: "menu5", title: "Roti Bakar", items: menuRotiBakar },
  { id: "menu6", title: "Roti Maryam", items: menuMaryam },
  { id: "menu7", title: "Kukus", items: menuKukus },
];

const MenuFull = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [alamat, setAlamat] = useState<string>(""); // Menyimpan alamat
  const [selectedSize, setSelectedSize] = useState<string>(""); // Menyimpan ukuran yang dipilih

  const handleAddToCart = (item: MenuItem) => {
    setSelectedItem(item);
    setSelectedSize(Object.keys(item.sizes)[0]); // Default memilih ukuran pertama
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem || !selectedItem.sizes[selectedSize]) {
      alert("Ukuran tidak tersedia untuk menu ini.");
      return;
    }

    // Mengambil harga sesuai ukuran yang dipilih
    const hargaStr = selectedItem.sizes[selectedSize];
    const totalHarga =
      parseInt(hargaStr.replace("Rp ", "").replace(".", "")) * quantity;

    alert(
      `Order Details:\nNama: ${alamat}\nMenu: ${
        selectedItem?.name
      }\nJumlah: ${quantity}\nUkuran: ${selectedSize}\nTotal Harga: ${formatRupiah(
        totalHarga.toString()
      )}`
    );
    setOpenDialog(false);
  };

  // Menghitung total harga berdasarkan ukuran dan jumlah
  const calculateTotalPrice = () => {
    if (selectedItem && selectedSize) {
      const hargaStr = selectedItem.sizes[selectedSize];
      const totalHarga =
        parseInt(hargaStr.replace("Rp ", "").replace(".", "")) * quantity;
      return formatRupiah(totalHarga.toString());
    }
    return "Rp 0";
  };

  return (
    <>
      {menuSections.map((section) => (
        <section key={section.id} id={section.id} className="mb-12">
          <h2
            className={`text-2xl font-bold mb-6 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {section.title}
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {section.items.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 w-fit relative ${
                  isDarkMode ? "bg-black" : "bg-white"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-48 h-48 object-contain rounded-md"
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
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-64 h-64 object-contain rounded-md mx-auto"
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
                    : "bg-white text-black border-gray-300"
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
