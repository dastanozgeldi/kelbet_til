import { useState } from "react";
import { toast } from "sonner";

export const useExplanation = () => {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isExplanationLoading, setIsExplanationLoading] = useState(false);

  const handleExplanation = async (bookTitle: string, image: string) => {
    try {
      setIsExplanationLoading(true);

      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookTitle,
          image,
        }),
      });
      const { explanation } = await response.json();
      setExplanation(explanation);
    } catch {
      toast.error("Суретті оқуда қателік туындады.");
    } finally {
      setIsExplanationLoading(false);
    }
  };

  return {
    isExplanationLoading,
    explanation,
    handleExplanation,
  };
};
