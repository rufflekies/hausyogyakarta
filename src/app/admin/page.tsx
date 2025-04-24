// app/admin/page.tsx
import Link from "next/link";
import NavbarAdmin from "@/components/NavbarAdmin"; // Import NavbarAdmin

// Data pesanan
const ordersData = [
  {
    id: "0001",
    nama: "Noval Noval Noval",
    tanggal: "21/4/25 14:30",
    status: "Proses",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "0002",
    nama: "Cahyo Cahyo Cahyo",
    tanggal: "21/4/25 14:32",
    status: "Dibatalkan",
    statusClass: "bg-red-100 text-red-800",
  },
  {
    id: "0003",
    nama: "Rafii Rafii Rafii",
    tanggal: "21/4/25 14:34",
    status: "Proses",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "0004",
    nama: "Yefta Yefta Yefta",
    tanggal: "21/4/25 14:36",
    status: "Proses",
    statusClass: "bg-yellow-100 text-yellow-800",
  },
  {
    id: "0005",
    nama: "Dilla Dilla Dilla",
    tanggal: "21/4/25 14:38",
    status: "Selesai",
    statusClass: "bg-green-100 text-green-800",
  },
];

export default function Dashboard() {
  return (
    <>
      <NavbarAdmin title="Dashboard" />{" "}
      {/* Panggil NavbarAdmin dan beri title */}
      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Total Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow-lg text-black rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  {/* Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="red"
                      strokeWidth="2"
                    />
                    <circle cx="12" cy="12" r="2" fill="red" />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-700 mb-2">Total Produk</h3>
              <p className="text-3xl font-bold">500</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow-lg text-black rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {/* Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      stroke="blue"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="9"
                      x2="16"
                      y2="9"
                      stroke="blue"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="13"
                      x2="16"
                      y2="13"
                      stroke="blue"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="17"
                      x2="12"
                      y2="17"
                      stroke="blue"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-700 mb-2">Total Pesanan</h3>
              <p className="text-3xl font-bold">500</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow-lg text-black rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  {/* Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="blue"
                      strokeWidth="2"
                    />
                    <path
                      d="M4 20C4 16.6863 7.58172 14 12 14C16.4183 14 20 16.6863 20 20"
                      stroke="blue"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-sm text-gray-700 mb-2">Total Pelanggan</h3>
              <p className="text-3xl font-bold">500</p>
            </div>
          </div>

          {/* Data Pesanan Table */}
          <div className="bg-white shadow-lg text-black pb-6 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Data Pesanan Terbaru</h2>
              <Link
                href="/admin/pesanan"
                className="text-blue-600 hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="py-2 px-4 text-left rounded-l-lg">ID</th>
                    <th className="py-2 px-4 text-left">Nama</th>
                    <th className="py-2 px-4 text-left">Tanggal</th>
                    <th className="py-2 px-4 text-left rounded-r-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order) => (
                    <tr key={order.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.nama}</td>
                      <td className="py-3 px-4">{order.tanggal}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`${order.statusClass} px-2 py-1 rounded text-sm`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Grafik Section */}
        <div className="bg-white shadow-lg text-black rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">Grafik Pesanan</h2>
          {/* Tempatkan grafik atau komponen chart di sini */}
          <div className="bg-gray-200 w-full h-64 rounded-lg">
            {/* Grafik Placeholder */}
            <p className="text-center py-24 text-gray-500">
              Grafik akan ditampilkan di sini
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
