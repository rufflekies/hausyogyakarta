"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import NavbarAdmin from "@/components/NavbarAdmin";
import { Overview } from "@/components/ui/overview-chart"
import { ordersApi, productsApi, authApi } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false); // To prevent SSR mismatch

  const isDarkMode = theme === "dark";

  useEffect(() => {
    setIsMounted(true); // Set to true once the component has mounted
  }, []);

  // Add states for dashboard data
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          productsApi.getAllProducts(1, 1),
          ordersApi.getAllOrders(1, 4), // Get only 4 recent orders
          authApi.getAllUsers(1, 1),
        ]);

        // Fix the stats access paths
        setStats({
          totalProducts: productsRes.pagination.total,
          totalOrders: ordersRes.data.pagination.total,
          totalCustomers: usersRes.data.pagination.total,
        });

        // Format recent orders
        const formattedOrders = ordersRes.data.data.map((order) => ({
          id: String(order.id).padStart(4, "0"),
          nama: order.user.name,
          tanggal: new Date(order.createdAt).toLocaleString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status:
            order.status === "PENDING"
              ? "Proses"
              : order.status === "PROCESSED"
              ? "Diproses"
              : order.status === "COMPLETED"
              ? "Selesai"
              : order.status === "CANCELLED"
              ? "Dibatalkan"
              : "Proses",
          statusClass:
            order.status === "PENDING"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "PROCESSED"
              ? "bg-blue-100 text-blue-800"
              : order.status === "COMPLETED"
              ? "bg-green-100 text-green-800"
              : order.status === "CANCELLED"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800",
        }));

        setRecentOrders(formattedOrders);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prevent SSR issues by rendering after the component is mounted
  if (!isMounted) {
    return null; // You can return a loading spinner here as well
  }

  return (
    <>
      <NavbarAdmin title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Total Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className={`shadow-lg rounded-lg p-6 ${isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="12" r="2" fill="white" />
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                Total Produk
              </h3>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>

            {/* Card 2 */}
            <div className={`shadow-lg rounded-lg p-6 ${isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="stroke-primary"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="9"
                      x2="16"
                      y2="9"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="13"
                      x2="16"
                      y2="13"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="17"
                      x2="12"
                      y2="17"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                Total Pesanan
              </h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>

            {/* Card 3 */}
            <div className={`shadow-lg rounded-lg p-6 ${isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
                Total Pelanggan
              </h3>
              <p className="text-3xl font-bold">{stats.totalCustomers}</p>
            </div>
          </div>

          {/* Data Pesanan Table */}
          <div className={`shadow-lg pb-6 rounded-lg p-6 ${isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"}`}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Data Pesanan Terbaru</h2>
              <Link
                href="/admin/pesanan"
                className="text-primary hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-2 px-4 text-left rounded-l-lg">ID</th>
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-left">Tanggal</th>
                    <th className="py-2 px-4 text-left rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        Tidak ada pesanan
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.nama}</td>
                        <td className="py-3 px-4">{order.tanggal}</td>
                        <td className="py-3 px-4">
                          <span className={`${order.statusClass} px-2 py-1 rounded text-sm`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Grafik Section */}
        <div className="col-span-1">
          <Overview />
        </div>
      </div>
    </>
  );
}
