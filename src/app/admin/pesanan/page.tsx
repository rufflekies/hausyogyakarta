"use client";
import NavbarAdmin from "@/components/NavbarAdmin";
import { useState, useId, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ordersApi } from "@/lib/api";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  isAvailable: boolean;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: number;
  userId: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  total: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  orderItems: OrderItem[];
}

export default function PesananContent() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const inputId = useId();

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const tabs = ["Semua", "Selesai", "Proses", "Dibatalkan"];

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      setIsLoading(true);
      await ordersApi.updateOrderStatus(id, {
        status: newStatus as 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED'
      });
      toast.success("Status pesanan berhasil diubah");
      fetchOrders(); // Refresh the orders list
    } catch {
      toast.error("Gagal mengubah status pesanan");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      if (activeTab === "Semua") return true;
      const status = order.status;
      switch (activeTab) {
        case "Proses": return status === "PROCESSING" || status === "PENDING";
        case "Selesai": return status === "COMPLETED";
        case "Dibatalkan": return status === "CANCELLED";
        default: return true;
      }
    })
    .filter((order) =>
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await ordersApi.getAllOrders(page, 10);
      setOrders(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch {
      toast.error("Gagal memuat data pesanan");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchCategories = useCallback(() => {
    // Your fetching logic here
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [page, fetchCategories]);
  
  return (
    <>
      <NavbarAdmin title="Pesanan" />

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex gap-2 flex-wrap">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? "default" : "outline"}
              onClick={() => setActiveTab(tab)}
              className={`text-sm ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : isDarkMode
                  ? "bg-zinc-900 text-primary hover:bg-zinc-800"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </Button>
          ))}
        </div>

        <div className="relative flex w-full max-w-xs">
          <Input
            id={inputId}
            placeholder="Cari nama..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`ps-9 ${
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            }`}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground pointer-events-none">
            <Search size={16} />
          </div>
        </div>
      </div>

      {/* Tabel Pesanan */}
      <div
        className={`rounded-lg p-4 shadow overflow-x-auto ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-primary text-white">
              <th className="p-3 text-left rounded-l-lg">ID</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Tanggal</th>
              <th className="p-3 text-left rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 dark:border-zinc-700 transition"
              >
                <td className="p-3">{String(order.id).padStart(4, "0")}</td>
                <td className="p-3">{order.user.name}</td>
                <td className="p-3">Rp{order.total.toLocaleString()}</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
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
                        {order.status === "PROCESSING"
                          ? "Proses"
                          : order.status === "COMPLETED"
                          ? "Selesai"
                          : order.status === "CANCELLED"
                          ? "Dibatalkan"
                          : order.status}
                        <ChevronDown size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className={`w-40 ${isDarkMode ? "bg-black" : "bg-white"}`}
                    >
                      {["PROCESSING", "COMPLETED", "CANCELLED"].map(
                        (status) => (
                          <DropdownMenuItem
                            key={status}
                            onClick={() => handleStatusChange(order.id, status)}
                            className={`${
                              isDarkMode
                                ? "text-white hover:bg-zinc-700"
                                : "text-black hover:bg-gray-100"
                            }`}
                          >
                            {status === "PROCESSING"
                              ? "Proses"
                              : status === "COMPLETED"
                              ? "Selesai"
                              : status === "CANCELLED"
                              ? "Dibatalkan"
                              : status}
                          </DropdownMenuItem>
                        )
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
