"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { categoriesApi, ordersApi } from "@/lib/api";

// Interface untuk data chart
interface ChartData {
  name: string;
  value: number;
  color: string;
}

// Interface untuk item di order
interface Product {
  id: string;
  categoryId: string;
}

interface OrderItem {
  product: Product;
  price: number;
  quantity: number;
}

interface Order {
  status: string;
  orderItems: OrderItem[];
}

// Interface untuk kategori
interface Category {
  id: string;
  name: string;
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#8a489c",
];

export function Overview() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);

        // Fetch orders and categories
        const [ordersResponse, categoriesResponse] = await Promise.all([
          ordersApi.getAllOrders(1, 100),
          categoriesApi.getAllCategories(1, 100),
        ]);

        // Pastikan types data yang diterima
        const orders: Order[] = ordersResponse.data.data;
        const categories: Category[] = categoriesResponse.data.data;

        const salesByCategory = new Map<string, number>();

        orders.forEach((order) => {
          if (order.status === "COMPLETED") {
            order.orderItems.forEach((item) => {
              const product = item.product;
              const category = categories.find(
                (c) => c.id === product.categoryId
              );
              if (category) {
                const currentTotal = salesByCategory.get(category.name) || 0;
                salesByCategory.set(
                  category.name,
                  currentTotal + item.price * item.quantity
                );
              }
            });
          }
        });

        // Convert ke format ChartData
        const chartData: ChartData[] = Array.from(
          salesByCategory.entries()
        ).map(([name, value], index) => ({
          name,
          value,
          color: COLORS[index % COLORS.length],
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) {
    return (
      <div
        className={`rounded-lg p-6 shadow-lg ${
          isDarkMode ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <div className="flex justify-center items-center h-[350px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-lg p-6 shadow-lg ${
        isDarkMode ? "bg-neutral-900" : "bg-white"
      }`}
    >
      <h2
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Penjualan per Kategori
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `Rp${value.toLocaleString()}`}
            contentStyle={{
              backgroundColor: isDarkMode ? "#1f1f1f" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            labelStyle={{ color: isDarkMode ? "#ffffff" : "#000000" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
