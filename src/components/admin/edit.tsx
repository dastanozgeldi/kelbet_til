"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book, Language } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface EditBookFormValues {
  title: string;
  grade: string;
  language: Language;
  term: string;
}

export const EditBook = ({ book }: { book: Book }) => {
  const router = useRouter();

  const { toast } = useToast();

  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["T1", "T2"];
  const terms = ["1", "2", "3", "4"];

  const [data, setData] = useState<EditBookFormValues>({
    title: book.title,
    grade: book.grade,
    language: book.language,
    term: book.term,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prisma call
    const res = await fetch("/api/edit-book", {
      method: "POST",
      body: JSON.stringify({ id: book.id, data }),
    });

    if (res.ok) {
      const data = await res.json();

      toast({
        title: "Шығарма сәтті өзгертілді",
        description: `Өзгертілген шығарма: ${data.book.title}`,
      });
      return router.push("/admin/books");
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Өзгерту</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Шығарманы өзгерту</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Кітап атауы</Label>
            <Input
              id="title"
              type="text"
              value={data.title || ""}
              placeholder="Абай жолы"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="grade">Сынып</Label>
            <select
              id="grade"
              className="w-full px-3 py-2 rounded-md bg-transparent border"
              defaultValue={data.grade || grades[0]}
              onChange={(e) => setData({ ...data, grade: e.target.value })}
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="language">Тіл</Label>
            <select
              id="language"
              className="w-full px-3 py-2 rounded-md bg-transparent border"
              defaultValue={data.language || languages[0]}
              onChange={(e) =>
                setData({ ...data, language: e.target.value as Language })
              }
            >
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="term">Тоқсан</Label>
            <select
              id="term"
              className="w-full px-3 py-2 rounded-md bg-transparent border"
              defaultValue={data.term || terms[0]}
              onChange={(e) => setData({ ...data, term: e.target.value })}
            >
              {terms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </select>
          </div>
          <Button>Сақтау</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
