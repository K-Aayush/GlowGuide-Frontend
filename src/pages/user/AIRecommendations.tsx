import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Card, CardContent } from "../../components/ui/card";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AIRecommendation } from "../../lib/types";
import aiService from "../../api/services/aiService";

export default function AIRecommendations() {
  const { setIsLoading } = useContext(AppContext);
  const [recommendations, setRecommendations] =
    useState<AIRecommendation | null>(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      const data = await aiService.getRecommendations();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      toast.error("Failed to load recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold md:text-3xl">AI Recommendations</h1>
        <p className="text-foreground/70">
          Personalized skincare suggestions based on your profile
        </p>
      </div>

      {recommendations ? (
        <div className="space-y-8">
          {/* AI Analysis Text */}
          <Card>
            <CardContent className="p-6">
              <h2 className="flex items-center mb-4 text-xl font-semibold">
                <Sparkles className="w-5 h-5 mr-2 text-primary" />
                AI Analysis
              </h2>
              {recommendations.aiRecommendations ? (
                <p className="whitespace-pre-line">
                  {recommendations.aiRecommendations}
                </p>
              ) : (
                <p className="text-foreground/70">
                  No analysis available at the moment.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Product Suggestions */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Recommended Products</h2>
            {recommendations.matchingProducts &&
            recommendations.matchingProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendations.matchingProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    {product.imageUrl && (
                      <div className="aspect-square bg-muted">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="mb-2 text-sm text-foreground/70">
                        {product.brand}
                      </p>
                      <p className="text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-foreground/70">
                No matching products found yet.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-muted/30">
          <Sparkles className="w-12 h-12 mb-4 text-primary" />
          <h3 className="mb-2 text-xl font-semibold">No Recommendations Yet</h3>
          <p className="text-foreground/70">
            Complete your skin assessment to receive personalized
            recommendations
          </p>
        </div>
      )}
    </div>
  );
}
