import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { ProductData } from "../../lib/types";
import { ProductFormValues } from "../../lib/validator";
import { ProductForm } from "../../components/admin/ProductForm";
import { ProductsTable } from "../../components/admin/ProductsTable";
import productService from "../../api/services/productService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

export default function ManageProducts() {
  const { setIsLoading } = useContext(AppContext);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSubmit = async (
    values: ProductFormValues & { image?: File }
  ) => {
    try {
      setIsLoading(true);
      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, values);
        toast.success("Product updated successfully");
      } else {
        await productService.createProduct(values);
        toast.success("Product created successfully");
      }
      setIsProductDialogOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      await productService.deleteProduct(id);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-2 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Manage Products</h1>
          <p className="text-foreground/70">
            Add, edit, or remove skincare products
          </p>
        </div>
        <Dialog
          open={isProductDialogOpen}
          onOpenChange={setIsProductDialogOpen}
        >
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Update product details"
                  : "Add a new product to the catalog"}
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              onSubmit={handleProductSubmit}
              editingProduct={editingProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative mb-4">
        <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-foreground/50" />
        <Input
          className="pl-10"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ProductsTable
        products={products}
        searchTerm={searchTerm}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsProductDialogOpen(true);
        }}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}
