"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import MenuFull from "@/components/ui/menu-full";
import { categoriesApi } from "@/lib/api";

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
  parent?: {
    id: number;
    name: string;
    slug: string;
    parentId: number | null;
  };
  children: Category[];
  productCount: number;
  products?: {
    id: number;
    name: string;
    price: number;
    image: string | null;
    imageUrl?: string;
    isAvailable: boolean;
  }[];
};

type CategoryDisplay = {
  id: number;
  title: string;
  image: string;
  link: string;
};

export default function Menu() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<CategoryDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    // Fetch categories with their products
    const fetchCategories = async () => {
      try {
        setLoading(true);
        // Get all categories
        const categoriesResponse = await categoriesApi.getAllCategories(1, 100);
        const fetchedCategories: Category[] = categoriesResponse.data.data;
        
        // Process categories that have products
        const categoryDisplayData: CategoryDisplay[] = fetchedCategories
          .filter(category => category.productCount > 0)
          .map(category => {
            // Find a product to use its image
            let image = "/placeholder.png"; // Default placeholder
            
            // If category has products directly attached
            if (category.products && category.products.length > 0) {
              const product = category.products[0];
              // Check if product.image is not null before using it
              if (product.image) {
                // Use imageUrl if available, or construct from image path
                image = product.imageUrl || 
                  (product.image.startsWith('http') ? 
                    product.image : 
                    `${process.env.NEXT_PUBLIC_API_URL}${product.image}`);
              } else if (product.imageUrl) {
                // If image is null but imageUrl exists, use that
                image = product.imageUrl;
              }
            }
            
            return {
              id: category.id,
              title: category.name,
              image: image,
              link: `#menu${category.id}`
            };
          });
        
        setCategories(categoryDisplayData);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  if (!mounted) return null;
  const isDarkMode = theme === "dark";

  return (
    <section
      id="menu"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <span className="text-primary uppercase tracking-wide font-medium">
        Berbagai
      </span>
      <h2
        className={`text-3xl md:text-4xl font-bold mt-2 mb-12 ${
          isDarkMode ? "text-white" : "text-black"
        }`}>
        Menu Yang Tersedia
      </h2>
      
      {/* Kategori Menu */}
      {loading ? (
        <div className="text-center py-8">Loading categories...</div>
      ) : categories.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`rounded-xl shadow-md overflow-hidden flex flex-col items-center p-6 w-fit ${
                isDarkMode ? "bg-black" : "bg-white"
              }`}
            >
              <img
                src={category.image}
                alt={`Gambar ${category.title}`}
                className="w-48 h-48 object-contain rounded-md mb-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "/placeholder.png";
                }}
              />
              <h3
                className={`text-xl font-semibold mb-2 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                {category.title}
              </h3>
              <a
                href={category.link}
                className="text-primary hover:underline font-medium mt-auto"
              >
                Lihat Menu
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">No categories found</div>
      )}
      
      {/* Detail Menu */}
      <section>
        <MenuFull />
      </section>
    </section>
  );
}