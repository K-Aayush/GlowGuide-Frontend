import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormValues, productSchema } from "../../lib/validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { ProductData } from "../../lib/types";
import { DialogFooter } from "../ui/dialog";

interface ProductFormProps {
  onSubmit: (values: ProductFormValues & { image?: File }) => Promise<void>;
  editingProduct: ProductData | null;
}

export function ProductForm({ onSubmit, editingProduct }: ProductFormProps) {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: editingProduct
      ? {
          name: editingProduct.name,
          brand: editingProduct.brand,
          description: editingProduct.description,
          ingredients: editingProduct.ingredients,
          sustainabilityScore: editingProduct.sustainabilityScore,
          allergens: editingProduct.allergens,
          skinTypes: editingProduct.suitableSkinTypes.map((st) => st.type),
          concerns: editingProduct.targetConcerns.map((tc) => tc.concern),
          price: editingProduct.price,
        }
      : {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const formData = form.getValues();
      onSubmit({ ...formData, image: e.target.files[0] });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Keep the same form fields structure but move them here */}
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
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <SelectItem key={score} value={score.toString()}>
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
                  {["DRY", "OILY", "COMBINATION", "NORMAL", "SENSITIVE"].map(
                    (type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          checked={form.getValues("skinTypes")?.includes(type)}
                          onCheckedChange={(checked) => {
                            const current = form.getValues("skinTypes") || [];
                            const updated = checked
                              ? [...current, type]
                              : current.filter((t) => t !== type);
                            form.setValue("skinTypes", updated);
                          }}
                        />
                        <label className="text-sm">
                          {type.charAt(0) + type.slice(1).toLowerCase()}
                        </label>
                      </div>
                    )
                  )}
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
                    <div key={concern} className="flex items-center space-x-2">
                      <Checkbox
                        checked={form.getValues("concerns")?.includes(concern)}
                        onCheckedChange={(checked) => {
                          const current = form.getValues("concerns") || [];
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
                              word.charAt(0) + word.slice(1).toLowerCase()
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
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <DialogFooter>
          <Button type="submit">
            {editingProduct ? "Update Product" : "Add Product"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
