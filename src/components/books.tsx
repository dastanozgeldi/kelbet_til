"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { type Book } from "@prisma/client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Icons } from "./icons";

export const Books = ({ data }: { data: Book[] }) => {
  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["T1", "T2"];
  const terms = ["1", "2", "3", "4"];

  const [grade, setGrade] = useState(grades[0]);
  const [language, setLanguage] = useState(languages[0]);
  const [term, setTerm] = useState(terms[0]);

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const getStorageItems = () => {
      const grade = localStorage.getItem("grade");
      if (grade) setGrade(grade);

      const language = localStorage.getItem("language");
      if (language) setLanguage(language);

      const term = localStorage.getItem("term");
      if (term) setTerm(term);
    };

    getStorageItems();
  }, []);

  // explanation: russian-speaking 12th graders don't have a T2.
  let books = null;
  if (grade === "12" && language === "T2") {
    books = data.filter(
      (book) => book.grade === "12" && book.language === "T1"
    );
  } else {
    books = data.filter(
      (book) => book.grade === grade && book.language === language
    );
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div id="books" className="py-6">
      <div className="min-h-screen">
        <div className="mb-6">
          <h1 className="text-3xl my-2 md:text-4xl font-bold">Шығармалар</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* grade tabs */}
          <div>
            <h2>Сынып</h2>
            <Tabs
              value={grade}
              onValueChange={(value) => {
                setGrade(value);
                localStorage.setItem("grade", value);
              }}
            >
              <TabsList>
                {grades.map((grade) => (
                  <TabsTrigger key={grade} value={grade}>
                    {grade}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* language tabs */}
          <div>
            <h2>Оқыту тілі</h2>
            <Tabs
              value={language}
              onValueChange={(value) => {
                setLanguage(value);
                localStorage.setItem("language", value);
              }}
            >
              <TabsList>
                <TabsTrigger value="T1">Қазақша</TabsTrigger>
                <TabsTrigger value="T2">Орысша</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* term tabs */}
          <div>
            <h2>Тоқсан</h2>
            <Tabs
              value={term}
              onValueChange={(value) => {
                setTerm(value);
                localStorage.setItem("term", value);
              }}
            >
              <TabsList>
                <TabsTrigger value="1">1</TabsTrigger>
                <TabsTrigger value="2">2</TabsTrigger>
                <TabsTrigger value="3">3</TabsTrigger>
                <TabsTrigger value="4">4</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* search bar */}
        <div className="relative">
          <input
            id="search"
            className="pl-12 w-full p-3 my-6 rounded-lg border-[3px] border-[#6C63FF]"
            type="text"
            placeholder="Кітап немесе автордың атын енгізіңіз..."
            aria-label="Кітап немесе автордың атын енгізіңіз..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <label htmlFor="search">
            <Icons.search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={20}
            />
          </label>
        </div>

        <div className="pb-3">
          <h2 className="text-2xl my-2 font-bold">{term}-тоқсан</h2>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {filteredBooks.map(
            (book) =>
              book.term === term && (
                <Link
                  key={book.id}
                  href={`/${book.id}`}
                  className="rounded bg-[#F8F8F8] p-8 min-w-[300px]"
                >
                  <h2 className="text-2xl font-bold">{book.title}</h2>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};
