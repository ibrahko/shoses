"use client";

import { useState } from "react";
import { Wand2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { recommendShoes, type ShoeRecommendationOutput } from "@/ai/ai-shoe-recommendation";
import Image from "next/image";

export default function AIRecommender() {
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState<ShoeRecommendationOutput['recommendations']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getRecommendations = async () => {
    if (!preferences.trim()) return;

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const result = await recommendShoes({ userPreferences: preferences });
      if (result.recommendations) {
        setRecommendations(result.recommendations);
      }
    } catch (e) {
      setError("Sorry, I couldn't get recommendations at this time. Please try again.");
      console.error(e);
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
          <Button onClick={getRecommendations} disabled={isLoading || !preferences.trim()} className="bg-accent hover:bg-accent/90">
            {isLoading ? "Finding shoes..." : "Get Recommendations"}
          </Button>
        </div>

        {error && <p className="text-destructive mt-4">{error}</p>}
        
        <div className="mt-6">
          {(isLoading || recommendations.length > 0) && <h3 className="text-lg font-semibold mb-4">Our top picks for you:</h3>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[192px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
            {recommendations.map((rec, index) => (
              <Card key={index} className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                    <div className="relative w-full h-48">
                        <Image
                            src={rec.imageUrl}
                            alt={rec.shoeName}
                            fill
                            className="object-cover"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg leading-tight mb-2">
                        {rec.shoeName}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm line-clamp-3">{rec.description}</p>
                </CardContent>
                <CardFooter className="p-4 bg-muted/50 mt-auto">
                    <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">AI says:</span> {rec.reason}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
