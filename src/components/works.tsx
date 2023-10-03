"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkItem } from "./work-item";
import data from "../../public/works.json";

export const Works = () => {
  const grades = ["7", "8", "9", "10", "11", "12"];
  const languages = ["T1", "T2"];
  const [grade, setGrade] = useState(grades[0]);
  const [language, setLanguage] = useState(languages[0]);

  // explanation: russian-speaking 12th graders don't have a T2.
  let works = null;
  if (grade === "12" && language === "T2") {
    works = data[`12T1`];
  } else {
    works = data[`${grade}${language}` as keyof typeof data];
  }

  return (
    <div id="works">
      <div className="">
        <div className="mb-6">
          <h1 className="text-3xl my-2 md:text-4xl font-bold">Шығармалар</h1>
          <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div>
            <h2>Сынып</h2>
            <Tabs value={grade} onValueChange={setGrade}>
              <TabsList>
                {grades.map((grade) => (
                  <TabsTrigger key={grade} value={grade}>
                    {grade}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div>
            <h2>Оқыту тілі</h2>
            <Tabs value={language} onValueChange={setLanguage}>
              <TabsList>
                <TabsTrigger value="T1">Қазақша</TabsTrigger>
                <TabsTrigger value="T2">Орысша</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          {works.map((work) => (
            <WorkItem
              key={work.name}
              grade={grade}
              language={language}
              name={work.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
