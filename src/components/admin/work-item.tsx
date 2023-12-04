"use client";
import { type Book } from "@prisma/client";

import { cn } from "@/lib/utils";

import { Button, buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";

export const WorkItem = ({ book }: { book: Book }) => {
  const { toast } = useToast();

  const handleClick = async () => {
    const res = await fetch("/api/delete-book", {
      method: "POST",
      body: JSON.stringify({ id: book.id }),
    });

    if (res.ok) {
      return toast({
        title: "Шығарма сәтті жойылды",
        description: "Осы бетті қайта ашқанда шығарма жоқ болады.",
      });
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  return (
    <div className="border rounded-lg w-full p-3">
      {/* info */}
      <div className="mb-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">{book.title}</h1>
          <span>{book.createdAt.toLocaleDateString()}</span>
        </div>
        <a
          href={book.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "link" }), "p-0")}
        >
          Сілтеме
        </a>
      </div>

      {/* actions */}
      <Button variant="destructive" size="sm" onClick={handleClick}>
        Жою
      </Button>
    </div>
  );
};
