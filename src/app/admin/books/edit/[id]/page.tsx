"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const router = useRouter();
  const searchParams = useSearchParams();

  const { toast } = useToast();

  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["T1", "T2"];
  const terms = ["1", "2", "3", "4"];

  const [data, setData] = useState({
    title: searchParams.get("title"),
    grade: searchParams.get("grade"),
    language: searchParams.get("language"),
    term: searchParams.get("term"),
  });

  console.log(data);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prisma call
    const res = await fetch("/api/edit-book", {
      method: "POST",
      body: JSON.stringify({ id, data }),
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
    <div className="m-6 p-6 max-w-[60ch] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Шығарманы өзгерту</h1>
        <hr className="border-0 max-w-[36px] h-[4px] bg-[#6C63FF]" />
      </div>
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
            onChange={(e) => setData({ ...data, language: e.target.value })}
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
    </div>
  );
}
