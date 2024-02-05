"use client";
import { type Book } from "@prisma/client";

import { Icons } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { NewBook } from "./new-book";
import { BookItem } from "./book-item";
import { useAdminBooks } from "./use-admin-books";

export function Books({ data }: { data: Book[] }) {
  const {
    grade,
    language,
    term,
    searchValue,
    grades,
    filteredBooks,
    setGrade,
    setLanguage,
    setTerm,
    setSearchValue,
  } = useAdminBooks(data);

  return (
    <div id="books">
      <div className="flex items-end justify-between">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* grade tabs */}
          <div>
            <h2>Сынып</h2>
            <Tabs
              value={grade}
              onValueChange={(value) => {
                setGrade(value);
                localStorage.setItem("admin-grade", value);
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
                localStorage.setItem("admin-language", value);
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
                localStorage.setItem("admin-term", value);
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
        <NewBook />
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
      <div className="space-y-6 my-3">
        {filteredBooks.map(
          (book) => book.term === term && <BookItem key={book.id} book={book} />
        )}
      </div>
    </div>
  );
}
