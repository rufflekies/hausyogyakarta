"use client"

const categories = [
  { title: "Haus Klasik", items: ["Teh Manis", "Jeruk Segar"] },
  { title: "Haus Cheese", items: ["Choco Cheese", "Strawberry Cheese"] },
  { title: "Makanan", items: ["Nasi Box Ayam", "Jajanan Pasar"] },
];

export default function Menu() {
  return (
    <section
      id="menu"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
    >
      <h2 className="text-3xl font-bold text-center mb-10">Menu</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">
              {cat.title}
            </h3>
            <ul className="list-disc list-inside">
              {cat.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
