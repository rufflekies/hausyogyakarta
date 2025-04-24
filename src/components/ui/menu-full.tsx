"use client";
import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { useTheme } from "next-themes";

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
    name: "Boba Fresh Milk",
    image: "/boba/fresh.png",
    sizes: "Medium - Rp 14.000\nLarge - Rp 17.000",
    price: "Rp 14.000",
  },
  {
    name: "Boba Milk Tea",
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
    name: "Hot Lava MILO®",
    image: "/panas/milo.png",
    sizes: "Hot - Rp 14.000",
    price: "Rp 14.000",
  },
];

const menuRotiBakar = [
  {
    name: "Roti Bakar Coklat",
    image: "/roti/bakarcoklat.png",
    sizes: "Rp 24.000",
    price: "Rp 24.000",
  },
  {
    name: "Roti Bakar Keju",
    image: "/roti/bakarkeju.png",
    sizes: "Rp 25.000",
    price: "Rp 25.000",
  },
  {
    name: "Roti Bakar Coklat Keju",
    image: "/roti/bakarcoklatkeju.png",
    sizes: "Rp 27.000",
    price: "Rp 27.000",
  },
];

const menuMaryam = [
  {
    name: "Roti Maryam Coklat",
    image: "/roti/maryamcoklat.png",
    sizes: "Rp 13.000",
    price: "Rp 13.000",
  },
  {
    name: "Roti Maryam Keju",
    image: "/roti/maryamkeju.png",
    sizes: "Rp 14.000",
    price: "Rp 14.000",
  },
  {
    name: "Roti Maryam Coklat Keju",
    image: "/roti/maryamcoklatkeju.png",
    sizes: "Rp 16.000",
    price: "Rp 16.000",
  },
];

const menuKukus = [
  {
    name: "Kukus Coklat",
    image: "/roti/kukuscoklat.png",
    sizes: "Rp 10.000",
    price: "Rp 10.000",
  },
  {
    name: "Kukus Keju",
    image: "/roti/kukuskeju.png",
    sizes: "Rp 11.000",
    price: "Rp 11.000",
  },
  {
    name: "Kukus Coklat Keju",
    image: "/roti/kukuscoklatkeju.png",
    sizes: "Rp 14.000",
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
                  {item.sizes}
                </span>
                <span
                  className={`font-bold text-primary ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  {item.price}
                </span>

                <div className="absolute bottom-0 flex justify-end w-full">
                  <a
                    href="#"
                    className="bg-primary p-3 rounded-tl-2xl text-white text-2xl flex"
                  >
                    <MdShoppingCart />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
};

export default MenuFull;
