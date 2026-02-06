"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/lib/placeholder-data";
import ProductCard from "./product-card";
import { Skeleton } from "../ui/skeleton";

export default function AIRecommender() {
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    // Mock AI call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you would call your GenAI flow here.
    // For now, we'll return some random products as a mock response.
    if(preferences.toLowerCase().includes('leather')) {
        setRecommendations(products.filter(p => p.tags.includes('leather')).slice(0, 3));
    } else {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        setRecommendations(shuffled.slice(0, 3));
    }

    setIsLoading(false);
  };

  return (
    <Card className="mb-12 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="h-6 w-6 text-primary" />
            <CardTitle>AI Shoe Recommender</CardTitle>
        </div>
        <CardDescription>
          Tell us what you're looking for, and our AI will find the perfect match. Try "running shoes with good cushion" or "stylish boots made of leather".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <Textarea
            placeholder="e.g. comfortable sneakers for walking, must be white..."
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            className="flex-1 text-base"
            rows={3}
          />
          <Button onClick={getRecommendations} disabled={isLoading} className="bg-accent hover:bg-accent/90">
            {isLoading ? "Finding shoes..." : "Get Recommendations"}
          </Button>
        </div>

        {error && <p className="text-destructive mt-4">{error}</p>}
        
        <div className="mt-6">
          {(isLoading || recommendations.length > 0) && <h3 className="text-lg font-semibold mb-4">Our top picks for you:</h3>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
            {recommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
