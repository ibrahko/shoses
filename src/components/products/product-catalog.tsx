"use client";

import type { Product, Brand } from "@/lib/types";
import { useState, useMemo } from "react";
import ProductCard from "./product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

type ProductCatalogProps = {
  products: Product[];
  brands: Brand[];
};

export default function ProductCatalog({ products, brands }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState("relevance");

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((b) => b !== brandId)
        : [...prev, brandId]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setPriceRange([0, 300]);
    setSortBy("relevance");
  };

  const filteredProducts = useMemo(() => {
    let tempProducts = [...products];

    if (searchTerm) {
      tempProducts = tempProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBrands.length > 0) {
      tempProducts = tempProducts.filter((p) =>
        selectedBrands.includes(p.brand.toLowerCase())
      );
    }

    tempProducts = tempProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
        case 'price-asc':
            tempProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            tempProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            tempProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }

    return tempProducts;
  }, [products, searchTerm, selectedBrands, priceRange, sortBy]);
  
  const hasActiveFilters = selectedBrands.length > 0 || priceRange[0] !== 0 || priceRange[1] !== 300;

  return (
    <div id="products" className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <aside className="lg:col-span-1">
        <div className="sticky top-20 p-6 bg-card rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Filters</h3>
          
          <div className="space-y-6">
            <div>
              <Label className="font-semibold">Brand</Label>
              <div className="space-y-2 mt-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={() => handleBrandChange(brand.id)}
                    />
                    <Label htmlFor={brand.id} className="font-normal">{brand.name}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="font-semibold">Price Range</Label>
              <div className="mt-4">
                <Slider
                  min={0}
                  max={300}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
          
          {hasActiveFilters && (
            <Button variant="ghost" className="w-full mt-6" onClick={clearFilters}>
              <X className="mr-2 h-4 w-4"/> Clear Filters
            </Button>
          )}
        </div>
      </aside>

      <main className="lg:col-span-3">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full md:max-w-md">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for your favorite shoes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
                <Label htmlFor="sort-by" className="whitespace-nowrap">Sort by:</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort-by" className="w-full md:w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-asc">Price: Low to High</SelectItem>
                        <SelectItem value="price-desc">Price: High to Low</SelectItem>
                        <SelectItem value="name-asc">Name A-Z</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
            <div className="text-center col-span-full py-16">
                <p className="text-lg font-medium">No products found</p>
                <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
            </div>
        )}
      </main>
    </div>
  );
}
