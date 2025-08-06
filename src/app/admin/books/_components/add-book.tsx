"use client";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "@/components/upload";
import { useAddBook } from "../hooks/use-add-book";
import { filters } from "@/config";
import { ExternalLinkIcon } from "lucide-react";

export const AddBook = () => {
  const { data, setData, handleSubmit } = useAddBook();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 gap-2 text-sm"
        >
          <Icons.plus className="h-5 w-5" />
          Жаңа
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Жаңа шығарма</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Кітап атауы</Label>
            <Input
              id="title"
              type="text"
              placeholder="Абай жолы"
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div>
            <Upload data={data} setData={setData} />
            {data.fileUrl && (
              <div className="my-3 flex items-center space-x-3">
                <Button variant="outline" asChild>
                  <a href={data.fileUrl} target="_blank" rel="noreferrer">
                    Көру
                    <ExternalLinkIcon className="size-4" />
                  </a>
                </Button>
                <span className="text-muted-foreground text-sm">
                  Файл жүктелді
                </span>
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="grade">Сынып</Label>
            <select
              id="grade"
              className="w-full rounded-md border bg-transparent px-3 py-2"
              defaultValue={filters.grades[0]}
              onChange={(e) => setData({ ...data, grade: e.target.value })}
            >
              {filters.grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="language">Тіл</label>
            <select
              id="language"
              className="w-full rounded-md border bg-transparent px-3 py-2"
              defaultValue="T1"
              onChange={(e) => setData({ ...data, language: e.target.value })}
            >
              {filters.languages.map((language) => (
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
              className="w-full rounded-md border bg-transparent px-3 py-2"
              defaultValue="1"
              onChange={(e) => setData({ ...data, term: e.target.value })}
            >
              {filters.terms.map((term) => (
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
