import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import adminService from "../../api/services/adminService";
import productService from "../../api/services/productService";
import {
  AdminStats as AdminStatsType,
  ProductData,
  UserData,
} from "../../lib/types";
import { ProductFormValues } from "../../lib/validator";
import { AdminStats } from "../../components/admin/AdminStats";
import { ProductForm } from "../../components/admin/ProductForm";
import { ProductsTable } from "../../components/admin/ProductsTable";
import { UsersTable } from "../../components/admin/UsersTable";
import { PendingDermatologists } from "../../components/admin/pendingDermotologist";

export default function AdminDashboard() {
  const { setIsLoading } = useContext(AppContext);
  const [stats, setStats] = useState<AdminStatsType | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );
  const [pendingDermatologists, setPendingDermatologists] = useState<
    UserData[]
  >([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsData, usersData, productsData, pendingData] =
        await Promise.all([
          adminService.getStats(),
          adminService.getAllUsers(),
          productService.getProducts(),
          adminService.getPendingDermatologists(),
        ]);

      setStats(statsData);
      setUsers(usersData);
      setProducts(productsData);
      setPendingDermatologists(pendingData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
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
      fetchDashboardData();
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
      fetchDashboardData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      await adminService.deleteUser(id);
      toast.success("User deleted successfully");
      fetchDashboardData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text">
          Admin Dashboard
        </h1>
        <p className="text-foreground/70">
          Manage users, products, and monitor system statistics
        </p>
      </div>

      <AdminStats stats={stats} />

      {/* Pending Dermatologists */}
      {pendingDermatologists.length > 0 && (
        <PendingDermatologists
          dermatologists={pendingDermatologists}
          onApprove={fetchDashboardData}
        />
      )}

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-transparent bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text">
                Products
              </CardTitle>
              <CardDescription>Manage skincare products</CardDescription>
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
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-transparent bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text">
            Users
          </CardTitle>
          <CardDescription>Manage system users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-foreground/50" />
            <Input
              className="pl-10"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <UsersTable
            users={users}
            searchTerm={searchTerm}
            onDelete={handleDeleteUser}
          />
        </CardContent>
      </Card>
    </div>
  );
}
