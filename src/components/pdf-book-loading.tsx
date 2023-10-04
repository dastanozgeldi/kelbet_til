import { Icons } from "./icons";

export const PDFBookLoading = () => {
  return (
    <div className="flex items-center justify-center gap-3 my-6">
      <Icons.spinner className="animate-spin" />
      Кітап ашылуда...
    </div>
  );
};
