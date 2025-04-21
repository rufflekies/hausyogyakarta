"use client";
import { MdShoppingCart } from "react-icons/md";

const categories = [
  {
    title: "Menu Haus",
    image: "/milo.jpg",
    link: "#menu1",
  },
  {
    title: "Menu Haus Panas",
    image: "/panas.jpg",
    link: "#menu2",
  },
  {
    title: "Menu Haus Makanan",
    image: "/1L.png",
    link: "#menu3",
  },
];

const menuHausKlasik = [
  {
    name: "Thai Tea",
    image: "/klasik/thai.png",
    sizes: "Small - Rp 6.000\nLarge - Rp 9.000",
    price: "Rp 6.000",
  },
  {
    name: "Green Thai Tea",
    image: "/klasik/green.png",
    sizes: "Small - Rp 8.000\nLarge - Rp 10.000",
    price: "Rp 8.000",
  },
  {
    name: "Ovaltine",
    image: "/klasik/oval.png",
    sizes: "Medium - Rp 12.000\nLarge - Rp 13.000",
    price: "Rp 12.000",
  },
  {
    name: "Taro",
    image: "/klasik/taro.png",
    sizes: "Medium - Rp 12.000\nLarge - Rp 13.000",
    price: "Rp 12.000",
  },
  {
    name: "Oreo",
    image: "/klasik/oreo.png",
    sizes: "Medium - Rp 12.000\nLarge - Rp 13.000",
    price: "Rp 12.000",
  },
  {
    name: "MILO® Green Tea",
    image: "/klasik/milo.png",
    sizes: "Medium - Rp 12.000\nLarge - Rp 13.000",
    price: "Rp 12.000",
  },
];

const menuHausChoco = [
  {
    name: "Choco Lava MILO®",
    image: "/choco/milo.png",
    sizes: "Medium - Rp 13.000\nLarge - Rp 14.000",
    price: "Rp 13.000",
  },
  {
    name: "Choco Hazelnut",
    image: "/choco/hazel.png",
    sizes: "Medium - Rp 13.000\nLarge - Rp 14.000",
    price: "Rp 13.000",
  },
  {
    name: "Choco Avocado",
    image: "/choco/avo.png",
    sizes: "Medium - Rp 14.000\nLarge - Rp 15.000",
    price: "Rp 14.000",
  },
];

const menuHausBoba = [
  {
    name: "Boba Brown Sugar Fresh Milk",
    image: "/boba/fresh.png",
    sizes: "Medium - Rp 14.000\nLarge - Rp 17.000",
    price: "Rp 14.000",
  },
  {
    name: "Boba Brown Sugar Milk Tea",
    image: "/boba/tea.png",
    sizes: "Medium - Rp 14.000\nLarge - Rp 17.000",
    price: "Rp 14.000",
  },
];

const menuHausPanas = [
  {
    name: "Hot Lemon Tea",
    image: "/panas/lemon.png",
    sizes: "Hot - Rp 10.000",
    price: "Rp 10.000",
  },
  {
    name: "Hot Thai Tea",
    image: "/panas/thai.png",
    sizes: "Hot - Rp 11.000",
    price: "Rp 11.000",
  },
  {
    name: "Hot Coffee",
    image: "/panas/coffee.png",
    sizes: "Hot - Rp 14.000",
    price: "Rp 14.000",
  },
  {
    name: "Hot Ovaltine",
    image: "/panas/oval.png",
    sizes: "Hot - Rp 14.000",
    price: "Rp 14.000",
  },
  {
    name: "Hot Choco Lava MILO®",
    image: "/panas/milo.jpg",
    sizes: "Hot - Rp 14.000",
    price: "Rp 14.000",
  },
];

const menuRotiBakar = [
  {
    name: "Roti Bakar Coklat",
    image: "/makanan/bakar-coklat.png",
    sizes: "Rp 24.000",
    price: "Rp 24.000",
  },
  {
    name: "Roti Bakar Keju",
    image: "/makanan/bakar-keju.png",
    sizes: "Rp 25.000",
    price: "Rp 25.000",
  },
  {
    name: "Roti Bakar Coklat Keju",
    image: "/makanan/bakar-coklatkeju.png",
    sizes: "Rp 27.000",
    price: "Rp 27.000",
  },
];

const menuMaryam = [
  {
    name: "Roti Maryam Coklat",
    image: "/makanan/maryam-coklat.png",
    sizes: "Rp 13.000",
    price: "Rp 13.000",
  },
  {
    name: "Roti Maryam Keju",
    image: "/makanan/maryam-keju.png",
    sizes: "Rp 14.000",
    price: "Rp 14.000",
  },
  {
    name: "Roti Maryam Coklat Keju",
    image: "/makanan/maryam-coklatkeju.png",
    sizes: "Rp 16.000",
    price: "Rp 16.000",
  },
];

const menuKukus = [
  {
    name: "Kukus Coklat",
    image: "/makanan/kukus-coklat.png",
    sizes: "Rp 10.000",
    price: "Rp 10.000",
  },
  {
    name: "Kukus Keju",
    image: "/makanan/kukus-keju.png",
    sizes: "Rp 11.000",
    price: "Rp 11.000",
  },
  {
    name: "Kukus Coklat Keju",
    image: "/makanan/kukus-coklatkeju.png",
    sizes: "Rp 14.000",
    price: "Rp 14.000",
  },
];

export default function Menu() {
  return (
    <section
      id="menu"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
    >
      <span className="text-primary uppercase tracking-wide font-medium">
        Berbagai
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-12">
        Menu Yang Tersedia
      </h2>

      {/* Kategori Menu */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-48 object-contain rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
            <a
              href={cat.link}
              className="text-pink-600 hover:text-pink-700 font-medium mt-auto"
            >
              Lihat Menu
            </a>
          </div>
        ))}
      </div>

      {/* Menu Haus Klasik */}
      <section id="menu1">
        <h2 className="text-2xl font-bold mb-6">Menu Haus Klasik</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuHausKlasik.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Haus Choco */}
      <section id="menu2" className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Menu Haus Choco</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuHausChoco.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Haus Boba */}
      <section id="menu3" className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Menu Haus Boba</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuHausBoba.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Haus Panas */}
      <section id="menu3" className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Menu Haus Panas</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuHausPanas.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Roti Bakar */}
      <section id="menu4" className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Menu Roti Bakar</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuRotiBakar.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Roti Maryam */}
      <section id="menu4" className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Menu Roti Maryam</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuMaryam.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Roti Kukus */}
      <section id="menu4" className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Menu Roti Kukus</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {menuKukus.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-contain mb-3"
              />
              <h3 className="text-lg font-semibold mb-1 text-center">
                {item.name}
              </h3>
              <span className="text-sm text-gray-500 whitespace-pre-line text-center">
                {item.sizes}
              </span>
              <span className="font-bold text-primary my-2">{item.price}</span>
              <a
                href="#"
                className="absolute bottom-4 right-4 text-primary text-2xl"
              >
                <MdShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
