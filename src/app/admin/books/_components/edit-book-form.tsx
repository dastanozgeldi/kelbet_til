"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { filters } from "@/data/config";
import { useActionState } from "react";
import { editBook } from "../actions";
import type { Book } from "@prisma/client";

const initialState = {
  message: "",
};

export function EditBookForm({ book }: { book: Book }) {
  const [state, formAction, pending] = useActionState(editBook, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={book.id} />

      <div className="space-y-1.5">
        <Label htmlFor="title">Кітап атауы</Label>
        <Input
          id="title"
          name="title"
          defaultValue={book.title}
          placeholder="Абай жолы"
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="grade">Сынып</Label>
        <select
          id="grade"
          name="grade"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={book.grade}
        >
          {filters.grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="language">Тіл</Label>
        <select
          id="language"
          name="language"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={book.language}
        >
          {filters.languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="term">Тоқсан</Label>
        <select
          id="term"
          name="term"
          className="w-full rounded-md border bg-transparent px-3 py-2"
          defaultValue={book.term}
        >
          {filters.terms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite">{state?.message}</p>
      <Button disabled={pending}>Сақтау</Button>
    </form>
  );
}
