
import { useState } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Category = {
  id: string;
  name: string;
  brands: Brand[];
};

type Brand = {
  id: string;
  name: string;
  selected: boolean;
};

const initialCategories: Category[] = [
  {
    id: "sneakers",
    name: "Sneakers",
    brands: [
      { id: "nike", name: "Nike", selected: false },
      { id: "adidas", name: "Adidas", selected: false },
      { id: "jordan", name: "Jordan", selected: false },
      { id: "newbalance", name: "New Balance", selected: false },
    ],
  },
  {
    id: "clothing",
    name: "Clothing",
    brands: [
      { id: "supreme", name: "Supreme", selected: false },
      { id: "offwhite", name: "Off-White", selected: false },
      { id: "palace", name: "Palace", selected: false },
      { id: "bape", name: "BAPE", selected: false },
    ],
  },
  {
    id: "tech",
    name: "Tech",
    brands: [
      { id: "apple", name: "Apple", selected: false },
      { id: "sony", name: "Sony", selected: false },
      { id: "microsoft", name: "Microsoft", selected: false },
      { id: "nvidia", name: "NVIDIA", selected: false },
    ],
  },
];

export const ProductPreferences = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const { toast } = useToast();

  const toggleBrand = (categoryId: string, brandId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            brands: category.brands.map((brand) => {
              if (brand.id === brandId) {
                return { ...brand, selected: !brand.selected };
              }
              return brand;
            }),
          };
        }
        return category;
      })
    );
  };

  const handleSave = () => {
    const selectedBrands = categories
      .flatMap((category) => 
        category.brands
          .filter((brand) => brand.selected)
          .map((brand) => `${brand.name} (${category.name})`)
      );

    if (selectedBrands.length === 0) {
      toast({
        title: "No preferences selected",
        description: "Please select at least one brand to track.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Preferences saved!",
      description: `Now tracking: ${selectedBrands.join(", ")}`,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-5 border border-brand-lightGray">
      <h2 className="text-xl font-bold mb-4 border-b pb-2 text-brand-black">Product Preferences</h2>
      
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-2">
            <h3 className="font-semibold text-brand-gray">{category.name}</h3>
            <div className="grid grid-cols-2 gap-2">
              {category.brands.map((brand) => (
                <Button
                  key={brand.id}
                  variant="outline"
                  className={`flex justify-between items-center w-full ${
                    brand.selected
                      ? "border-brand-blue bg-brand-blue/5"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleBrand(category.id, brand.id)}
                >
                  <span>{brand.name}</span>
                  {brand.selected ? (
                    <CheckCircle className="h-4 w-4 text-brand-blue" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Button 
          onClick={handleSave}
          className="w-full bg-brand-red hover:bg-red-600 text-white"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
