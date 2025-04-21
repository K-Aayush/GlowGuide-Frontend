import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card, CardContent } from "../../components/ui/card";
import { Search, Sparkles, Filter, ArrowUpDown } from "lucide-react";
import { ProductData } from "../../lib/types";
import productService from "../../api/services/productService";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Slider } from "../../components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";
import { Badge } from "../../components/ui/badge";
import { Checkbox } from "../../components/ui/checkbox";

// Mock data for demonstration
const MOCK_PRODUCTS: ProductData[] = [
  {
    id: "1",
    name: "Hydrating Serum",
    brand: "GlowDerm",
    description:
      "A lightweight serum with hyaluronic acid to deeply hydrate skin.",
    ingredients:
      "Water, Glycerin, Sodium Hyaluronate, Panthenol, Allantoin, Propylene Glycol, Phenoxyethanol, Ethylhexylglycerin",
    sustainabilityScore: 4,
    imageUrl:
      "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg",
  },
  {
    id: "2",
    name: "Gentle Cleanser",
    brand: "PureSkin",
    description: "Mild, pH-balanced cleanser for all skin types.",
    ingredients:
      "Water, Cocamidopropyl Betaine, Sodium Cocoyl Isethionate, Glycerin, Panthenol, Aloe Barbadensis Leaf Juice, Camellia Sinensis Leaf Extract",
    sustainabilityScore: 5,
    imageUrl:
      "https://images.pexels.com/photos/3736397/pexels-photo-3736397.jpeg",
  },
  {
    id: "3",
    name: "Vitamin C Brightening Cream",
    brand: "RadiantLabs",
    description:
      "Powerful antioxidant cream that brightens and evens skin tone.",
    ingredients:
      "Water, Ascorbic Acid, Tocopherol, Ferulic Acid, Glycerin, Shea Butter, Dimethicone, Phenoxyethanol",
    sustainabilityScore: 3,
    imageUrl:
      "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg",
  },
  {
    id: "4",
    name: "Niacinamide Treatment",
    brand: "ClearBalance",
    description: "Reduces appearance of pores and improves uneven skin tone.",
    ingredients:
      "Water, Niacinamide, Zinc PCA, Glycerin, Panthenol, Allantoin, Xanthan Gum, Phenoxyethanol",
    sustainabilityScore: 4,
    imageUrl:
      "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg",
  },
  {
    id: "5",
    name: "Exfoliating Toner",
    brand: "RenewYou",
    description: "Gentle exfoliation with BHA and fruit enzymes.",
    ingredients:
      "Water, Salicylic Acid, Glycolic Acid, Papaya Enzyme, Aloe Vera, Witch Hazel, Glycerin, Phenoxyethanol",
    sustainabilityScore: 3,
    imageUrl:
      "https://images.pexels.com/photos/3786694/pexels-photo-3786694.jpeg",
  },
  {
    id: "6",
    name: "SPF 50 Sunscreen",
    brand: "SunShield",
    description: "Broad-spectrum protection with antioxidants.",
    ingredients:
      "Water, Homosalate, Octocrylene, Ethylhexyl Salicylate, Butyl Methoxydibenzoylmethane, Benzophenone-3, Glycerin",
    sustainabilityScore: 2,
    imageUrl:
      "https://images.pexels.com/photos/3737697/pexels-photo-3737697.jpeg",
  },
];

// Skin types
const skinTypes = [
  { value: "DRY", label: "Dry" },
  { value: "OILY", label: "Oily" },
  { value: "COMBINATION", label: "Combination" },
  { value: "NORMAL", label: "Normal" },
  { value: "SENSITIVE", label: "Sensitive" },
];

// Skin concerns
const skinConcerns = [
  { id: "ACNE", label: "Acne" },
  { id: "AGING", label: "Aging/Fine Lines" },
  { id: "PIGMENTATION", label: "Pigmentation" },
  { id: "SENSITIVITY", label: "Sensitivity" },
  { id: "DRYNESS", label: "Dryness" },
  { id: "OILINESS", label: "Oiliness" },
  { id: "REDNESS", label: "Redness" },
  { id: "UNEVEN_TEXTURE", label: "Uneven Texture" },
];

export default function ProductExplorer() {
  const { setIsLoading } = useContext(AppContext);
  const [products, setProducts] = useState<ProductData[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState<string>("");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [minSustainability, setMinSustainability] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [filteredProducts, setFilteredProducts] =
    useState<ProductData[]>(MOCK_PRODUCTS);
  const [isLocalLoading, setIsLocalLoading] = useState(false);

  // Fetch products (mock implementation)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setIsLocalLoading(true);

        // In a real implementation, this would call the API
        // const data = await productService.getProducts({
        //   skinType: selectedSkinType,
        //   concerns: selectedConcerns,
        // });
        // setProducts(data);

        // Using mock data for now
        setIsLocalLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setIsLoading]);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply skin type filter
    if (selectedSkinType) {
      // In a real implementation, this would filter based on product suitability for skin type
      // This is just a placeholder logic
      result = result.filter((_) => true);
    }

    // Apply concerns filter
    if (selectedConcerns.length > 0) {
      // In a real implementation, this would filter based on product addressing concerns
      // This is just a placeholder logic
      result = result.filter((_) => true);
    }

    // Apply sustainability filter
    if (minSustainability > 0) {
      result = result.filter(
        (product) => product.sustainabilityScore >= minSustainability
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      // In a real implementation, this would sort by price
      result = [...result]; // Just a placeholder
    } else if (sortBy === "price-high") {
      // In a real implementation, this would sort by price in descending order
      result = [...result]; // Just a placeholder
    } else if (sortBy === "sustainability") {
      result = result.sort(
        (a, b) => b.sustainabilityScore - a.sustainabilityScore
      );
    }

    setFilteredProducts(result);
  }, [
    products,
    searchTerm,
    selectedSkinType,
    selectedConcerns,
    minSustainability,
    sortBy,
  ]);

  // Toggle concern selection
  const toggleConcern = (concernId: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concernId)
        ? prev.filter((id) => id !== concernId)
        : [...prev, concernId]
    );
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Product Explorer</h1>
          <p className="text-foreground/70">
            Discover products tailored to your skin needs
          </p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-foreground/50" />
          <Input
            type="search"
            placeholder="Search products, brands, or ingredients..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
                {(selectedSkinType ||
                  selectedConcerns.length > 0 ||
                  minSustainability > 0) && (
                  <Badge variant="secondary" className="ml-1">
                    {(selectedSkinType ? 1 : 0) +
                      (selectedConcerns.length > 0 ? 1 : 0) +
                      (minSustainability > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>
                  Refine your search with these filters
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Skin Type</h3>
                  <Select
                    value={selectedSkinType}
                    onValueChange={setSelectedSkinType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select skin type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Skin Types</SelectItem>
                      {skinTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Skin Concerns</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {skinConcerns.map((concern) => (
                      <div
                        key={concern.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={concern.id}
                          checked={selectedConcerns.includes(concern.id)}
                          onCheckedChange={() => toggleConcern(concern.id)}
                        />
                        <label
                          htmlFor={concern.id}
                          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {concern.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      Sustainability Score
                    </h3>
                    <span className="text-sm text-foreground/70">
                      Min: {minSustainability}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={[minSustainability]}
                    onValueChange={(value) => setMinSustainability(value[0])}
                  />
                  <div className="flex justify-between text-xs text-foreground/70">
                    <span>Any</span>
                    <span>Excellent</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedSkinType("");
                      setSelectedConcerns([]);
                      setMinSustainability(0);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort By</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="sustainability">Sustainability</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters */}
      {(selectedSkinType ||
        selectedConcerns.length > 0 ||
        minSustainability > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedSkinType && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {skinTypes.find((t) => t.value === selectedSkinType)?.label}
              <button onClick={() => setSelectedSkinType("")}>×</button>
            </Badge>
          )}

          {selectedConcerns.map((concernId) => (
            <Badge
              key={concernId}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {skinConcerns.find((c) => c.id === concernId)?.label}
              <button onClick={() => toggleConcern(concernId)}>×</button>
            </Badge>
          ))}

          {minSustainability > 0 && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sustainability: {minSustainability}+
              <button onClick={() => setMinSustainability(0)}>×</button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="px-2 text-xs h-7"
            onClick={() => {
              setSelectedSkinType("");
              setSelectedConcerns([]);
              setMinSustainability(0);
            }}
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Products Grid */}
      {isLocalLoading ? (
        <div className="flex items-center justify-center py-12">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="w-12 h-12 mb-4 text-foreground/30" />
          <h3 className="mb-2 text-xl font-semibold">No Products Found</h3>
          <p className="max-w-md text-foreground/70">
            We couldn't find any products matching your criteria. Try adjusting
            your filters or search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <div className="aspect-square bg-muted">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted">
                    <Sparkles className="w-12 h-12 text-foreground/20" />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-foreground/70">
                      {product.brand}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: product.sustainabilityScore }).map(
                      (_, i) => (
                        <Sparkles key={i} className="w-4 h-4 text-green-500" />
                      )
                    )}
                  </div>
                </div>
                <p className="mb-3 text-sm line-clamp-2">
                  {product.description}
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
