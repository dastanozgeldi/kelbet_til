"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "@/components/upload";

export default function Page() {
  const router = useRouter();

  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["T1", "T2"];
  const terms = ["1", "2", "3", "4"];

  const [data, setData] = useState({
    title: "",
    fileUrl: "",
    grade: grades[0],
    language: languages[0],
    term: terms[0],
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("final data", data);

    // prisma call
    const res = await fetch("/api/add-book", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const book = await res.json();

    console.log("created book: ", book);

    router.push("/admin");
  };

  return (
    <div className="m-6 p-6 max-w-[60ch] mx-auto">
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
            <div className="flex items-center space-x-3 my-3">
              <a
                href={data.fileUrl}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline" })}
              >
                Көру
              </a>
              <span>Файл жүктелді</span>
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="grade">Сынып</Label>
          <select
            className="w-full px-3 py-2 rounded-md bg-transparent border"
            defaultValue={grades[0]}
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
          <label htmlFor="language">Тіл</label>
          <select
            className="w-full px-3 py-2 rounded-md bg-transparent border"
            defaultValue="T1"
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
            className="w-full px-3 py-2 rounded-md bg-transparent border"
            defaultValue="1"
            onChange={(e) => setData({ ...data, term: e.target.value })}
          >
            {terms.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
        <Button disabled={!data.fileUrl}>Сақтау</Button>
      </form>
    </div>
  );
}