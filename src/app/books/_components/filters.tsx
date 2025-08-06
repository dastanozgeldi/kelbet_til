"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filters } from "@/config";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch({
    program,
    grade,
    language,
    term,
  }: {
    program?: string;
    grade?: string;
    language?: string;
    term?: string;
  }) {
    const params = new URLSearchParams(searchParams);
    if (program) params.set("program", program);
    if (grade) params.set("grade", grade);
    if (language) params.set("language", language);
    if (term) params.set("term", term);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="space-y-1">
        <Label>Бағдарлама</Label>
        <Tabs onValueChange={(value) => handleSearch({ program: value })}>
          <TabsList>
            <TabsTrigger key="JBBM" value="JBBM">
              ЖББМ
            </TabsTrigger>
            <TabsTrigger key="NIS" value="NIS">
              НЗМ
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        <Label>Сынып</Label>
        <Tabs onValueChange={(value) => handleSearch({ grade: value })}>
          <TabsList>
            {filters.grades.map((grade) => (
              <TabsTrigger key={grade} value={grade}>
                {grade}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        <Label>Оқыту тілі</Label>
        <Tabs onValueChange={(value) => handleSearch({ language: value })}>
          <TabsList>
            <TabsTrigger value="T1">Қазақша</TabsTrigger>
            <TabsTrigger value="T2">Орысша</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        <Label>Тоқсан</Label>
        <Tabs onValueChange={(value) => handleSearch({ term: value })}>
          <TabsList>
            <TabsTrigger value="1">1</TabsTrigger>
            <TabsTrigger value="2">2</TabsTrigger>
            <TabsTrigger value="3">3</TabsTrigger>
            <TabsTrigger value="4">4</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
