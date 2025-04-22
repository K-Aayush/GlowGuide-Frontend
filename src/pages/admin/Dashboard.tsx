import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Users,
  Package,
  Activity,
  Plus,
  Search,
  Trash2,
  Edit,
} from "lucide-react";
import { toast } from "sonner";
import adminService from "../../api/services/adminService";
import productService from "../../api/services/productService";
import { AdminStats, ProductData, UserData } from "../../lib/types";
import { ProductFormValues, productSchema } from "../../lib/validator";

export default function AdminDashboard() {
  const { setIsLoading } = useContext(AppContext);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      ingredients: "",
      sustainabilityScore: 3,
      allergens: "",
      skinTypes: [],
      concerns: [],
    },
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [statsData, usersData, productsData] = await Promise.all([
        adminService.getStats(),
        adminService.getAllUsers(),
        productService.getProducts(),
      ]);

      setStats(statsData);
      setUsers(usersData);
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleProductSubmit = async (values: ProductFormValues) => {
    try {
      setIsLoading(true);
      const payload = {
        ...values,
        ...(selectedImage ? { image: selectedImage } : {}),
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, payload);
        toast.success("Product updated successfully");
      } else {
        await productService.createProduct(payload);
        toast.success("Product created successfully");
      }

      setIsProductDialogOpen(false);
      form.reset();
      setSelectedImage(null);
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

  const handleEditProduct = (product: ProductData) => {
    setEditingProduct(product);
    form.reset({
      name: product.name,
      brand: product.brand,
      description: product.description,
      ingredients: product.ingredients,
      sustainabilityScore: product.sustainabilityScore,
      allergens: product.allergens,
      skinTypes: product.suitableSkinTypes.map((st) => st.type),
      concerns: product.targetConcerns.map((tc) => tc.concern),
    });
    setIsProductDialogOpen(true);
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
        <h1 className="text-2xl font-bold md:text-3xl">Admin Dashboard</h1>
        <p className="text-foreground/70">
          Manage users, products, and monitor system statistics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Users className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-foreground/70">Total Users</p>
              <h3 className="text-2xl font-bold">{stats?.totalUsers || 0}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Package className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-foreground/70">Total Products</p>
              <h3 className="text-2xl font-bold">
                {stats?.totalProducts || 0}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <Activity className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-foreground/70">
                Active Dermatologists
              </p>
              <h3 className="text-2xl font-bold">
                {stats?.totalDermatologists || 0}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Products</CardTitle>
              <CardDescription>Manage skincare products</CardDescription>
            </div>
            <Dialog
              open={isProductDialogOpen}
              onOpenChange={setIsProductDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setEditingProduct(null);
                    form.reset();
                    setSelectedImage(null);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleProductSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Brand</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ingredients"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ingredients</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="sustainabilityScore"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sustainability Score (1-5)</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(parseInt(value))
                              }
                              defaultValue={field.value.toString()}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select score" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((score) => (
                                  <SelectItem
                                    key={score}
                                    value={score.toString()}
                                  >
                                    {score}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="allergens"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Allergens (Optional)</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="skinTypes"
                        render={() => (
                          <FormItem>
                            <FormLabel>Suitable Skin Types</FormLabel>
                            <div className="space-y-2">
                              {[
                                "DRY",
                                "OILY",
                                "COMBINATION",
                                "NORMAL",
                                "SENSITIVE",
                              ].map((type) => (
                                <div
                                  key={type}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    checked={form
                                      .getValues("skinTypes")
                                      ?.includes(type)}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        form.getValues("skinTypes") || [];
                                      const updated = checked
                                        ? [...current, type]
                                        : current.filter((t) => t !== type);
                                      form.setValue("skinTypes", updated);
                                    }}
                                  />
                                  <label className="text-sm">
                                    {type.charAt(0) +
                                      type.slice(1).toLowerCase()}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="concerns"
                        render={() => (
                          <FormItem>
                            <FormLabel>Target Concerns</FormLabel>
                            <div className="space-y-2">
                              {[
                                "ACNE",
                                "AGING",
                                "PIGMENTATION",
                                "SENSITIVITY",
                                "DRYNESS",
                                "OILINESS",
                                "REDNESS",
                                "UNEVEN_TEXTURE",
                              ].map((concern) => (
                                <div
                                  key={concern}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    checked={form
                                      .getValues("concerns")
                                      ?.includes(concern)}
                                    onCheckedChange={(checked) => {
                                      const current =
                                        form.getValues("concerns") || [];
                                      const updated = checked
                                        ? [...current, concern]
                                        : current.filter((c) => c !== concern);
                                      form.setValue("concerns", updated);
                                    }}
                                  />
                                  <label className="text-sm">
                                    {concern
                                      .split("_")
                                      .map(
                                        (word) =>
                                          word.charAt(0) +
                                          word.slice(1).toLowerCase()
                                      )
                                      .join(" ")}
                                  </label>
                                </div>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormLabel>Product Image</FormLabel>
                      <div className="flex items-center gap-4 mt-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        {selectedImage && (
                          <p className="text-sm text-foreground/70">
                            Selected: {selectedImage.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <DialogFooter>
                      <Button type="submit">
                        {editingProduct ? "Update Product" : "Add Product"}
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
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

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Sustainability</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products
                  .filter(
                    (product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      product.brand
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.brand}</TableCell>
                      <TableCell>{product.sustainabilityScore}/5</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
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

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users
                  .filter(
                    (user) =>
                      user.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      user.email
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
