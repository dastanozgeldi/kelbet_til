import { ChevronLeftIcon, ChevronRightIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePageControls } from "../_hooks/use-page-controls";

export default function PageControls({
  numPages,
  currentPage,
  setCurrentPage,
}: {
  numPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const {
    noPrevPage,
    noNextPage,
    handlePrevPage,
    handleNextPage,
    isEditing,
    setIsEditing,
  } = usePageControls(numPages, currentPage, setCurrentPage);

  return (
    <>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex items-center justify-center gap-2">
            <Input
              type="number"
              min={1}
              max={numPages}
              value={currentPage}
              onChange={(event) =>
                setCurrentPage(Number(event.currentTarget.value))
              }
            />
            <Button onClick={() => setIsEditing(false)}>OK</Button>
          </div>
        ) : (
          <Button
            onClick={() => setIsEditing(true)}
            size="icon"
            variant="outline"
          >
            <PencilIcon />
          </Button>
        )}
        <span
          onClick={() => setIsEditing(true)}
          className="flex items-center justify-center font-medium"
        >
          {currentPage}-бет (жалпы {numPages})
        </span>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className="fixed top-1/2 left-3 z-10"
        disabled={noPrevPage}
        onClick={handlePrevPage}
      >
        <ChevronLeftIcon className="size-8" />
      </Button>

      <Button
        size="icon"
        variant="ghost"
        className="fixed top-1/2 right-3 z-10"
        disabled={noNextPage}
        onClick={handleNextPage}
      >
        <ChevronRightIcon className="size-8" />
      </Button>
    </>
  );
}
