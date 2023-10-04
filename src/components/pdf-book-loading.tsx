import { Loader2 } from "lucide-react";

export const PDFBookLoading = () => {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <Loader2 className="animate-spin" />
      Кітап ашылуда...
    </div>
  );
};
