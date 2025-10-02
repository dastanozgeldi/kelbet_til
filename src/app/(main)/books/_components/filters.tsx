"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

export default function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [tabs, setTabs] = useState({
    program: searchParams.get("program"),
    grade: searchParams.get("grade"),
    language: searchParams.get("language"),
    term: searchParams.get("term"),
  });

  useEffect(() => {
    setTabs({
      program: searchParams.get("program"),
      grade: searchParams.get("grade"),
      language: searchParams.get("language"),
      term: searchParams.get("term"),
    });
  }, [searchParams]);

  const handleSearch = useDebouncedCallback(
    ({
      program,
      grade,
      language,
      term,
    }: {
      program?: string;
      grade?: string;
      language?: string;
      term?: string;
    }) => {
      const params = new URLSearchParams(searchParams);
      if (program) params.set("program", program);
      if (grade) params.set("grade", grade);
      if (language) params.set("language", language);
      if (term) params.set("term", term);

      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  function handleReset() {
    const params = new URLSearchParams(searchParams);
    params.delete("program");
    params.delete("grade");
    params.delete("language");
    params.delete("term");

    replace(pathname);
  }

  const hasActiveFilters =
    tabs.program || tabs.grade || tabs.language || tabs.term;

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="space-y-1">
        <Label>Бағдарлама</Label>
        <Tabs
          value={tabs.program || ""}
          onValueChange={(value) => handleSearch({ program: value })}
        >
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
        <Tabs
          value={tabs.grade || ""}
          onValueChange={(value) => handleSearch({ grade: value })}
        >
          <TabsList>
            {["5", "6", "7", "8", "9", "10", "11", "12"].map((grade) => (
              <TabsTrigger key={grade} value={grade}>
                {grade}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        <Label>Оқыту тілі</Label>
        <Tabs
          value={tabs.language || ""}
          onValueChange={(value) => handleSearch({ language: value })}
        >
          <TabsList>
            <TabsTrigger value="T1">Қазақша</TabsTrigger>
            <TabsTrigger value="T2">Орысша</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        <Label>Тоқсан</Label>
        <Tabs
          value={tabs.term || ""}
          onValueChange={(value) => handleSearch({ term: value })}
        >
          <TabsList>
            <TabsTrigger value="1">1</TabsTrigger>
            <TabsTrigger value="2">2</TabsTrigger>
            <TabsTrigger value="3">3</TabsTrigger>
            <TabsTrigger value="4">4</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-1">
        <div className="h-3.5" />
        <Button
          variant="outline"
          onClick={handleReset}
          disabled={!hasActiveFilters}
        >
          <XIcon className="size-4" />
          Фильтрлерді жою
        </Button>
      </div>
    </div>
  );
}
